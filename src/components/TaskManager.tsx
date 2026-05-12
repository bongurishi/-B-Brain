import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, Database, AlertCircle, RefreshCw, XCircle, ChevronDown, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemStream } from '../hooks/useSystemStream';

interface ProcessHistory {
  time: string;
  cpu: number;
  memory: number;
}

export function TaskManager() {
  const { metrics, restartService, killService, triggerHeal } = useSystemStream();
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [autoHeal, setAutoHeal] = useState(true);
  
  // Track critical statuses for auto-heal timing
  const [criticalSince, setCriticalSince] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!autoHeal) {
      setCriticalSince({});
      return;
    }

    const now = Date.now();
    const newCritical = { ...criticalSince };
    let needsHeal = false;
    let anyHandled = false;

    metrics.services.forEach(s => {
      const isCriticalCpu = s.cpu > 85;
      const isHighMem = s.memory > 120;
      
      if (isCriticalCpu || isHighMem) {
        if (!newCritical[s.name]) {
          newCritical[s.name] = now;
        } else if (now - newCritical[s.name] > 3000) {
          // It's been critical for 3 seconds -> Auto Heal!
          if (s.name === 'db-primary-node') {
            needsHeal = true;
          } else {
            restartService(s.name);
          }
          delete newCritical[s.name];
          anyHandled = true;
        }
      } else {
        delete newCritical[s.name];
      }
    });

    if (needsHeal) triggerHeal();
    if (anyHandled || Object.keys(newCritical).length !== Object.keys(criticalSince).length) {
      setCriticalSince(newCritical);
    }
  }, [metrics.services, autoHeal]);
  
  // Keep history for charts
  const [history, setHistory] = useState<{ sysCpu: number; sysMem: number; time: string }[]>([]);
  const [processHistory, setProcessHistory] = useState<Record<string, ProcessHistory[]>>({});

  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour12: false, second: '2-digit', minute: '2-digit' });
    
    setHistory(prev => {
      const newHist = [...prev, { sysCpu: metrics.systemCpu, sysMem: metrics.systemMem, time: timeStr }];
      if (newHist.length > 20) newHist.shift();
      return newHist;
    });

    setProcessHistory(prev => {
      const next = { ...prev };
      metrics.services.forEach(s => {
        if (!next[s.name]) next[s.name] = [];
        next[s.name] = [...next[s.name], { time: timeStr, cpu: s.cpu, memory: s.memory }];
        if (next[s.name].length > 20) next[s.name].shift();
      });
      return next;
    });
  }, [metrics]);

  const selectedData = selectedProcess ? processHistory[selectedProcess] || [] : history;

  const handleToggleAutoHeal = () => setAutoHeal(!autoHeal);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] italic uppercase flex items-center gap-4">
            B-Tasks
            <Activity className="w-8 h-8 md:w-10 md:h-10 text-white/20 hidden sm:block" />
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Real-Time System Performance & Autonomous Recovery
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
           <div className="border border-white/10 bg-black p-2 flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
             <span className="text-white/50">Task Manager</span>
             <div className="w-px h-4 bg-white/20"></div>
             <span className="text-[#00F0FF] font-bold">vs</span>
             <div className="w-px h-4 bg-white/20"></div>
             <span className="text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] flex z-10 animate-pulse">B Brain Mode</span>
           </div>
           <button 
             onClick={handleToggleAutoHeal}
             className={`flex items-center gap-2 px-3 py-1 text-xs font-bold font-mono tracking-widest uppercase transition-colors border \${autoHeal ? 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'}`}
           >
             {autoHeal ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
             Auto-Heal: {autoHeal ? 'ON' : 'OFF'}
           </button>
        </div>
      </header>

      {/* Live System Overview (Top Section) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex flex-col justify-between h-24">
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">System CPU</span>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-black italic \${metrics.systemCpu > 80 ? 'text-[#FF4E00]' : 'text-white'}`}>{metrics.systemCpu}%</span>
              <Cpu className="w-5 h-5 text-white/20 mb-1" />
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex flex-col justify-between h-24">
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">System Memory</span>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-black italic \${metrics.systemMem > 80 ? 'text-[#FF4E00]' : 'text-white'}`}>{metrics.systemMem}%</span>
              <Database className="w-5 h-5 text-white/20 mb-1" />
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex flex-col justify-between h-24">
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Disk Usage</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black italic text-white">{Math.round(metrics.diskIo)}</span>
              <Server className="w-5 h-5 text-white/20 mb-1" />
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex flex-col justify-between h-24">
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Network I/O</span>
            <div className="flex items-end justify-between">
              <span className="text-xl font-black italic text-[#00F0FF]">{Math.round(metrics.networkRx + metrics.networkTx)}<span className="text-xs font-normal"> MB/s</span></span>
              <Activity className="w-5 h-5 text-white/20 mb-1" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Processes & Containers</h3>
          <div className="bg-black/50 border border-white/10 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase font-bold text-white/40">
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">PID</th>
                  <th className="p-4 font-normal text-right">CPU %</th>
                  <th className="p-4 font-normal text-right">Mem MB</th>
                  <th className="p-4 font-normal text-center">Status</th>
                  <th className="p-4 font-normal">Intelligence</th>
                  <th className="p-4 font-normal text-center">Action</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                {metrics.services.map((s, idx) => {
                  const isHighCpu = s.cpu > 70 && s.cpu <= 85;
                  const isCriticalCpu = s.cpu > 85;
                  const isHighMem = s.memory > 120; // assuming 120MB is high for node test
                  
                  return (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedProcess(s.name)}
                      className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors \${selectedProcess === s.name ? 'bg-white/10' : ''}`}
                    >
                      <td className="p-4 text-white font-bold">{s.name}</td>
                      <td className="p-4 text-white/50">{s.pid || '---'}</td>
                      <td className={`p-4 text-right \${isCriticalCpu ? 'text-[#FF4E00] font-bold' : isHighCpu ? 'text-[#FFB300] font-bold' : 'text-white'}`}>
                        {s.cpu}%
                      </td>
                      <td className={`p-4 text-right \${isHighMem ? 'text-[#FF4E00] font-bold animate-pulse' : 'text-white'}`}>
                        {s.memory}
                      </td>
                      <td className="p-4 text-center">
                         {s.status === 'RUNNING' && !isCriticalCpu ? (
                           <span className="text-[#00F0FF]">Running</span>
                         ) : s.status === 'RUNNING' && isCriticalCpu ? (
                           <span className="text-[#FF4E00] animate-pulse relative">
                              Warning
                             <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#FF4E00] rounded-full"></span>
                           </span>
                         ) : (
                           <span className="text-white/30">{s.status}</span>
                         )}
                      </td>
                      <td className="p-4">
                        {isCriticalCpu ? (
                           <div className="flex flex-col gap-1 text-[9px] uppercase tracking-wider">
                             <span className="text-[#FF4E00] font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Risk: Crash in ~2 min</span>
                             {!autoHeal && <span className="text-[#00F0FF] flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Suggestion: Restart</span>}
                             {autoHeal && <span className="text-[#00F0FF] flex items-center gap-1 animate-pulse"><Check className="w-3 h-3" /> Auto-healing in 3s...</span>}
                           </div>
                        ) : isHighMem ? (
                           <div className="flex flex-col gap-1 text-[9px] uppercase tracking-wider">
                             <span className="text-[#FFB300] font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Memory Leak Detected</span>
                           </div>
                        ) : (
                           <span className="text-white/20 italic text-[9px] uppercase tracking-wider">Stable</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                         <div className="flex gap-2 justify-center">
                           <button 
                             onClick={(e) => { e.stopPropagation(); killService(s.name); }}
                             className="p-1.5 bg-black hover:bg-[#FF4E00] text-white/50 hover:text-white border border-white/10 hover:border-[#FF4E00] transition-colors"
                             title="Kill Process"
                           >
                             <XCircle className="w-3 h-3" />
                           </button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); restartService(s.name); }}
                             className="p-1.5 bg-black hover:bg-[#00F0FF] text-white/50 hover:text-black border border-white/10 hover:border-[#00F0FF] transition-colors"
                             title="Restart Process"
                           >
                             <RefreshCw className="w-3 h-3" />
                           </button>
                         </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Graph Column */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] flex justify-between items-center bg-[#00F0FF]/5 p-3 border border-[#00F0FF]/20">
            <span>{selectedProcess ? selectedProcess : 'System'} Trend</span>
            {selectedProcess && (
              <button 
                onClick={() => setSelectedProcess(null)} 
                className="text-white/50 hover:text-white bg-black/50 px-2 py-0.5 border border-white/10 transition-colors"
              >
                Clear
              </button>
            )}
          </h3>
          <div className="bg-black/40 border border-white/10 p-4 rounded-sm flex flex-col gap-6">
            
            {/* CPU Chart */}
            <div className="h-40">
              <span className="text-[9px] uppercase tracking-widest text-white/40 mb-2 block">CPU Utilization</span>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', textTransform: 'uppercase' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedProcess ? "cpu" : "sysCpu"} 
                    stroke="#00F0FF" 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* memory Chart */}
            <div className="h-40">
              <span className="text-[9px] uppercase tracking-widest text-white/40 mb-2 block">Memory Usage</span>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', textTransform: 'uppercase' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                  />
                  <Line 
                    type="stepAfter" 
                    dataKey={selectedProcess ? "memory" : "sysMem"} 
                    stroke="#FF4E00" 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {!selectedProcess && (
              <div className="text-[9px] text-white/40 uppercase tracking-widest text-center mt-2 font-mono">
                Click a process to view isolated trends
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
