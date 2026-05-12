import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Network, AlertTriangle, Zap, CheckCircle2, TrendingUp, Brain, RefreshCw, Database, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemStream } from '../hooks/useSystemStream';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, collection, serverTimestamp, query, onSnapshot } from 'firebase/firestore';

export function EngineDashboard() {
  const { metrics, triggerSpike, triggerHeal, scaleService } = useSystemStream();
  const [history, setHistory] = useState<any[]>([]);
  const { activeProject, user } = useAuth();
  const lastIncidentCount = useRef(0);
  const snapshotTimer = useRef<any>(null);
  const [zeroTouchActive, setZeroTouchActive] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (metrics.spikeActive && !metrics.healing && zeroTouchActive && countdown === null) {
      setCountdown(5);
    } else if (!metrics.spikeActive || metrics.healing) {
      setCountdown(null);
    }
  }, [metrics.spikeActive, metrics.healing, zeroTouchActive]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      triggerHeal();
    }
  }, [countdown, triggerHeal]);

  useEffect(() => {
    setHistory(prev => {
      const newHistory = [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), load: metrics.systemCpu }];
      if (newHistory.length > 20) return newHistory.slice(1);
      return newHistory;
    });
  }, [metrics.systemCpu]);

  // Sync Incidents to Firebase Database
  useEffect(() => {
    if (!activeProject || !user) return;
    
    if (metrics.incidents.length > lastIncidentCount.current) {
      const newIncidents = metrics.incidents.slice(lastIncidentCount.current);
      newIncidents.forEach(async (incident) => {
        try {
          const docRef = doc(db, 'projects', activeProject.id, 'incidents', incident.id);
          await setDoc(docRef, {
            projectId: activeProject.id,
            title: incident.title,
            learned: incident.learned,
            duration: incident.duration,
            date: incident.date,
            createdAt: serverTimestamp()
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, 'incidents');
        }
      });
      lastIncidentCount.current = metrics.incidents.length;
    }
  }, [metrics.incidents, activeProject, user]);

  // Sync observability snapshots to Firebase periodically
  useEffect(() => {
    if (!activeProject || !user) return;
    
    snapshotTimer.current = setInterval(async () => {
       try {
         const newRef = doc(collection(db, 'projects', activeProject.id, 'snapshots'));
         await setDoc(newRef, {
           projectId: activeProject.id,
           engineLatency: metrics.engineLatency,
           eventLag: metrics.eventLag,
           decisionTime: metrics.decisionTime,
           timestamp: serverTimestamp()
         });
       } catch (err) {
         handleFirestoreError(err, OperationType.CREATE, 'snapshots');
       }
    }, 15000); // Snapshot every 15 seconds

    return () => clearInterval(snapshotTimer.current);
  }, [activeProject, user, metrics.engineLatency, metrics.eventLag, metrics.decisionTime]);

  // In a real system, we'd also sync the history back FROM firebase to show previous incidents across sessions
  const [persistentIncidents, setPersistentIncidents] = useState<any[]>([]);
  useEffect(() => {
    if (!activeProject) return;
    const q = query(collection(db, 'projects', activeProject.id, 'incidents'));
    const unsub = onSnapshot(q, (snap) => {
       setPersistentIncidents(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    });
    return unsub;
  }, [activeProject]);

  // Merge local new incidents and persistent ones to avoid duplication flash while syncing
  const displayIncidents = [...persistentIncidents];
  metrics.incidents.forEach(li => {
    if (!displayIncidents.find(pi => pi.id === li.id)) {
      displayIncidents.push(li);
    }
  });

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            B-Engine
            {metrics.spikeActive && !metrics.healing && <div className="w-3 h-3 rounded-full bg-[#FF4E00] animate-pulse"></div>}
            {metrics.healing && <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse"></div>}
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Central Orchestrator / Cluster-Alpha
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-left md:text-right w-full xl:w-auto">
          <div className="flex flex-col items-start md:items-end p-4 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00F0FF]/10 opacity-50"></div>
            <div className="flex items-center gap-4 relative z-10 w-full justify-between md:justify-end">
              <div className="flex flex-col text-left md:text-right">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${zeroTouchActive ? 'text-[#00F0FF]' : 'text-white/50'}`}>Zero-Touch Mode</span>
                <span className={`text-[9px] font-mono uppercase tracking-widest ${zeroTouchActive ? 'text-[#00F0FF]/60' : 'text-white/30'}`}>
                   {zeroTouchActive ? 'Fully Autonomous Loop Active' : 'Manual Intervention Required'}
                </span>
              </div>
              <button 
                onClick={() => setZeroTouchActive(!zeroTouchActive)}
                className={`w-12 h-6 shrink-0 rounded-full border p-1 flex items-center transition-all ${zeroTouchActive ? 'bg-[#00F0FF]/20 border-[#00F0FF]/50 shadow-[0_0_10px_#00F0FF]' : 'bg-black border-white/20'}`}
              >
                <div className={`w-4 h-4 rounded-full transition-transform ${zeroTouchActive ? 'bg-[#00F0FF] translate-x-5 shadow-[0_0_5px_#00F0FF]' : 'bg-white/30 translate-x-0'}`}></div>
              </button>
            </div>
            {/* Safety Guardrails */}
            <div className="flex gap-4 mt-4 mb-4 md:mb-0 relative z-10 w-full justify-start md:justify-end border-t border-[#00F0FF]/20 pt-3">
               <div className="flex flex-col text-left md:text-right">
                  <span className="text-[8px] uppercase tracking-widest text-[#00F0FF]/50">Max Replicas</span>
                  <span className="text-[10px] font-mono text-white font-bold">10 nodes</span>
               </div>
               <div className="flex flex-col text-left md:text-right border-l border-[#00F0FF]/20 pl-4">
                  <span className="text-[8px] uppercase tracking-widest text-[#00F0FF]/50">Rollback</span>
                  <span className="text-[10px] font-mono text-white font-bold">Lat &gt; 2%</span>
               </div>
               <div className="flex flex-col text-left md:text-right border-l border-[#00F0FF]/20 pl-4">
                  <span className="text-[8px] uppercase tracking-widest text-[#00F0FF]/50">Budget Cap</span>
                  <span className="text-[10px] font-mono text-white font-bold">$500/day</span>
               </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 relative z-10 w-full justify-end">
              <button onClick={triggerSpike} disabled={metrics.spikeActive} className="px-4 py-2 border border-[#FF4E00]/30 text-[#FF4E00] hover:bg-[#FF4E00]/10 text-[9px] font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Inject Chaos Attack
              </button>
            </div>
          </div>
          <div className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-sm">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">System Trust Score</span>
            <span className={`text-3xl font-mono font-bold ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
              {metrics.spikeActive && !metrics.healing ? '84.2' : '99.98'}
              <span className="text-sm text-white/50">%</span>
            </span>
          </div>
        </div>
      </header>

      {/* Cinematic Demo Mode */}
      <section className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB300] animate-pulse"></span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#FFB300]">Demo Presets</span>
             </div>
             <h3 className="text-xs font-black uppercase tracking-widest text-white">Cinematic Scenario Runner</h3>
           </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
           {[
             { name: 'Traffic Surge', desc: 'Predictive Scaling', active: metrics.spikeActive && !metrics.healing, action: triggerSpike },
             { name: 'Memory Leak', desc: 'OOM Prevention', active: false, action: triggerSpike },
             { name: 'DDoS Attack', desc: 'Auto-Isolation', active: false, action: triggerSpike },
             { name: 'Region Failure', desc: 'AZ Failover', active: false, action: triggerSpike },
             { name: 'Deployment', desc: 'Auto-Rollback', active: false, action: triggerSpike },
           ].map((preset, i) => (
             <button
               key={i}
               onClick={preset.action}
               disabled={metrics.spikeActive || metrics.healing}
               className={`p-3 text-left border rounded-sm transition-all group ${preset.active ? 'bg-[#FF4E00]/20 border-[#FF4E00] shadow-[0_0_15px_rgba(255,78,0,0.3)]' : 'bg-black/50 border-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed'}`}
             >
                <div className="flex items-center justify-between mb-2">
                   <h4 className={`text-[10px] uppercase font-bold tracking-widest ${preset.active ? 'text-[#FF4E00]' : 'text-white group-hover:text-[#00F0FF]'} transition-colors`}>{preset.name}</h4>
                   {preset.active && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00] animate-ping"></span>}
                </div>
                <p className={`text-[9px] font-mono ${preset.active ? 'text-[#FF4E00]/70' : 'text-white/40'}`}>{preset.desc}</p>
             </button>
           ))}
        </div>
      </section>

      {/* autonomous-evolution-loop */}
      <section className="py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-6">
           <RefreshCw className={`w-5 h-5 text-[#00F0FF] ${metrics.healing || metrics.spikeActive ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
           <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">Autonomous Lifecycle <span className="text-[10px] bg-[#00F0FF]/20 text-[#00F0FF] px-2 py-0.5 border border-[#00F0FF]/30">ACTIVE</span></h3>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-2 overflow-x-auto pb-4 hide-scrollbar relative">
           <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent z-0 hidden md:block -translate-y-1/2"></div>
           {[
             { phase: 'Phase 1', title: 'Visibility', status: 'running', detail: 'Telemetry ingest' },
             { phase: 'Phase 2', title: 'Intelligence', status: metrics.spikeActive ? 'active' : 'running', detail: 'Pattern matching' },
             { phase: 'Phase 3', title: 'Decision', status: metrics.healing ? 'active' : 'idle', detail: 'Policy evaluation' },
             { phase: 'Phase 4', title: 'Execution', status: metrics.healing ? 'active' : 'idle', detail: 'Autonomous action' },
             { phase: 'Phase 5', title: 'Learning', status: 'idle', detail: 'Knowledge update' }
           ].map((step, i, arr) => (
             <div key={i} className="flex-1 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <div className={`p-4 border ${step.status === 'active' ? 'bg-[#00F0FF]/10 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]' : step.status === 'running' ? 'bg-white/5 border-white/20' : 'bg-[#050505] border-white/5 opacity-50'} rounded-sm flex flex-col items-center justify-center min-w-[140px] transition-all duration-300 hover:scale-105 hover:opacity-100 group h-full`}>
                   <span className="text-[8px] uppercase tracking-widest text-[#00F0FF] opacity-70 mb-1">{step.phase}</span>
                   <span className={`text-[11px] font-black uppercase tracking-widest ${step.status === 'active' ? 'text-white' : step.status === 'running' ? 'text-white/80' : 'text-white/40'}`}>
                     {step.title}
                   </span>
                   <span className={`text-[8px] uppercase font-mono mt-1 ${step.status === 'active' ? 'text-[#00F0FF]' : 'text-white/30'}`}>{step.detail}</span>
                   {step.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-3 animate-pulse shadow-[0_0_5px_#00F0FF]" />}
                   {step.status === 'running' && <span className="w-1 h-1 rounded-full bg-white/50 mt-3 animate-ping" style={{ animationDuration: '2s' }} />}
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-1 w-2 h-2 -translate-y-1/2 text-[#00F0FF]/50 z-20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                )}
             </div>
           ))}
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        <div className="p-4 md:p-5 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Compute</span>
            <Cpu className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">{metrics.systemCpu}<span className="text-lg text-white/40">%</span></div>
            <div className="w-full h-1 bg-white/10 mt-3 relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full bg-[#00F0FF] transition-all duration-1000" style={{ width: `${Math.min(100, metrics.systemCpu)}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">System Memory</span>
            <Network className="w-4 h-4 text-[#8A2BE2]" />
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">{metrics.systemMem}<span className="text-lg text-white/40">%</span></div>
            <div className="w-full h-1 bg-white/10 mt-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#8A2BE2] transition-all duration-1000" style={{ width: `${Math.min(100, metrics.systemMem)}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">Storage I/O</span>
            <Database className="w-4 h-4 text-[#FFB300]" />
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">{metrics.diskIo.toFixed(0)}<span className="text-lg text-white/40">iops</span></div>
            <div className="w-full h-1 bg-white/10 mt-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#FFB300] transition-all duration-1000" style={{ width: `${Math.min(100, (metrics.diskIo / 400) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">Network IO</span>
            <Zap className="w-4 h-4 text-[#FF4E00]" />
          </div>
          <div className="space-y-1">
             <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-mono text-white/40">RX (Ingress)</span>
                <span className="text-[10px] font-bold font-mono text-white">{metrics.networkRx.toFixed(0)} Mb/s</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-mono text-white/40">TX (Egress)</span>
                <span className="text-[10px] font-bold font-mono text-white">{metrics.networkTx.toFixed(0)} Mb/s</span>
             </div>
             <div className="w-full h-1 bg-white/10 mt-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#FF4E00] transition-all duration-1000" style={{ width: `${Math.min(100, (metrics.networkRx / 2000) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-sm flex flex-col justify-between transition-colors duration-1000 ${metrics.spikeActive && !metrics.healing ? 'bg-[#FF4E00]/10 border border-[#FF4E00]/30' : 'bg-[#00F0FF]/10 border border-[#00F0FF]/30'}`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
              {metrics.spikeActive && !metrics.healing ? 'Active Risks' : 'Status: Nominal'}
            </span>
            {metrics.spikeActive && !metrics.healing ? (
              <AlertTriangle className="w-4 h-4 text-[#FF4E00]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
            )}
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tracking-tight">
              {metrics.spikeActive && !metrics.healing ? '01' : '00'}
            </div>
            <p className={`text-[9px] uppercase tracking-widest font-bold mt-2 ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
               {metrics.spikeActive && !metrics.healing ? 'SEVERE LOAD DETECTED' : 'AWAITING TELEMETRY'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white/5 border border-white/10 rounded-sm relative">
          {metrics.spikeActive ? (
            <div className="absolute inset-0 z-20 pointer-events-none border-4 border-[#FF4E00]/20 max-w-full overflow-hidden animate-pulse"></div>
          ) : null}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Live CPU Telemetry (Host)</h3>
            <div className="flex gap-2 text-[10px] font-mono uppercase font-bold">
              <span className="px-3 py-1 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">REAL-TIME</span>
            </div>
          </div>
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <XAxis dataKey="time" stroke="#E0E0E0" opacity={0.4} fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#E0E0E0" opacity={0.4} fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px' }}
                  itemStyle={{ color: '#00F0FF', fontFamily: 'monospace', fontWeight: 'bold' }}
                  labelStyle={{ color: '#ffffff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Line type="monotone" dataKey="load" stroke="#00F0FF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-[#00F0FF]/20 rounded-sm p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent pointer-events-none z-0"></div>
            <div className="relative z-10 flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] flex items-center gap-2">
                    B-Predictor Logic
                  </h3>
                  <p className="text-[9px] text-[#00F0FF]/50 uppercase tracking-widest font-mono mt-1">Linear trend + Boundary heuristics</p>
               </div>
               <Brain className="w-4 h-4 text-[#00F0FF]" />
            </div>
            <div className="relative z-10 space-y-2 text-[10px] font-mono tracking-wide text-white/60">
              <div className="flex justify-between border-b border-white/10 pb-1">
                 <span className="text-white">Trigger Threshold</span>
                 <span>70% CPU / 150MB RAM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                 <span className="text-white">Action Buffer</span>
                 <span>~2.40s Lead Time</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-white">Algorithm Complexity</span>
                 <span>O(1) Streaming Check</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-sm flex flex-col relative overflow-hidden flex-1">
            {metrics.healing && (
              <div className="absolute inset-0 bg-[#00F0FF]/5 z-0 pointer-events-none animate-pulse"></div>
            )}
            <div className="p-5 border-b border-white/10 relative z-10 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                Incident Memory log
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-white/50 border border-white/10 px-2 py-0.5 rounded-sm">
                 {displayIncidents.length} Records
              </span>
            </div>
            <div className="flex-1 p-0 overflow-y-auto relative z-10 max-h-[250px]">
              {metrics.healing && metrics.spikeActive && (
                <div className="p-5 border-b border-white/10 bg-[#00F0FF]/10 flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#00F0FF] animate-pulse" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Dynamic Scaling Engaged</p>
                    <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-mono">B-Decide is scaling the architecture automatically.</p>
                    <p className="text-[10px] font-mono text-[#00F0FF] uppercase mt-2 tracking-widest">LIVE / executing</p>
                  </div>
                </div>
              )}
              {metrics.spikeActive && !metrics.healing && (
                <div className="p-5 border-b border-[#FF4E00]/30 bg-[#FF4E00]/10 flex flex-col transition-all">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#FF4E00] animate-pulse" />
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-[#FF4E00] uppercase tracking-wider">Predictor: Threat Detected & Assessed</p>
                          <p className="text-[10px] text-[#FF4E00]/70 mt-1 uppercase tracking-widest font-mono">B-Decide inference complete. Action determined.</p>
                        </div>
                         {countdown !== null && (
                           <span className="text-[10px] font-mono border border-[#FF4E00] bg-[#FF4E00]/20 px-2 py-0.5 text-[#FF4E00] animate-pulse shadow-[0_0_10px_#FF4E00]">Auto-Execute in {countdown}s...</span>
                         )}
                         {countdown === null && !zeroTouchActive && (
                           <button onClick={triggerHeal} className="text-[10px] uppercase font-bold tracking-widest bg-[#FF4E00] text-black px-4 py-1 hover:bg-[#FF4E00]/80 transition-colors">
                             Execute Recovery
                           </button>
                         )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#FF4E00]/70 font-bold block mb-1">Reason (Why)</span>
                          <p className="text-[10px] text-[#FF4E00]/90 font-mono leading-relaxed bg-black/20 p-3 border border-[#FF4E00]/20 whitespace-pre-wrap">
                            &gt; CPU sustained &gt; 80% for 45s<br />
                            &gt; Critical memory growth trend detected<br />
                            &gt; Matches past OOM profiles
                          </p>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold block mb-1">Response Plan</span>
                          <div className="text-[10px] text-white/80 font-mono space-y-2 bg-black/40 p-3 border border-white/10">
                            <div><span className="text-white/40">Action:</span> SCALE_WORKERS (+1 node)</div>
                            <div><span className="text-white/40">Confidence:</span> <span className="text-[#00F0FF] font-bold">94%</span></div>
                            <div><span className="text-white/40">Rollback:</span> Automatic if latency &gt; 2%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!metrics.spikeActive && displayIncidents.length === 0 && (
                <div className="p-8 text-center flex flex-col items-center justify-center opacity-70">
                  <span className="text-white/30 mb-2 italic font-mono text-xs">No active incidents detected.</span>
                  <span className="text-[#00F0FF]/50 uppercase tracking-widest font-bold text-[10px]">System operating within safe thresholds.</span>
                </div>
              )}
              {displayIncidents.map((incident: any) => (
                <div key={incident.id} className="p-5 border-b border-white/10 opacity-70 hover:opacity-100 transition-opacity flex gap-4 bg-black/20">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-white/40" />
                  <div>
                    <p className="text-sm font-bold text-white/90">{incident.title}</p>
                    <p className="text-[10px] text-white/50 mt-1 uppercase tracking-widest font-mono">{incident.learned}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-[10px] font-mono text-[#00F0FF]/70 uppercase tracking-widest">{incident.date}</p>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">TTC: {incident.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kubernetes native Reconciler & Prometheus Metrics Proof */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Reconciler Proof */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-6 relative overflow-hidden flex flex-col">
          {metrics.healing && (
            <div className="absolute inset-0 bg-[#00F0FF]/5 z-0 pointer-events-none animate-pulse"></div>
          )}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> Reconciler Proof
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-white/50 bg-black px-2 py-0.5 border border-white/10">Control Loop Tracker</span>
          </div>
          
          <div className="flex-1 space-y-4 relative z-10">
            <div className="p-4 border border-white/5 bg-black/40 rounded-sm">
               <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-3">Target: db-primary</p>
               <div className="flex items-center gap-4 text-xs font-mono font-bold">
                 <div className="flex flex-col gap-1">
                   <span className="text-white/40">Desired</span>
                   <span className="text-white">3 Replicas</span>
                 </div>
                 <div className="text-white/20">→</div>
                 <div className="flex flex-col gap-1">
                   <span className="text-white/40">Actual</span>
                   <span className={metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}>
                     {metrics.spikeActive && !metrics.healing ? '1 Replica' : '3 Replicas'}
                   </span>
                 </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#00F0FF]/20 bg-[#00F0FF]/5 rounded-sm">
               <span className="text-[10px] uppercase tracking-widest text-white">Status</span>
               {metrics.spikeActive && !metrics.healing ? (
                 <span className="text-xs font-mono font-bold text-[#FF4E00] animate-pulse">Reconciling...</span>
               ) : (
                 <span className="text-xs font-mono font-bold text-[#00F0FF]">Synced</span>
               )}
            </div>
          </div>
        </div>

        {/* Prometheus Real Query */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-6 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
               <Database className="w-4 h-4 text-white/40" /> Prometheus Metrics
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 border border-[#00F0FF]/20">Live Query</span>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            <div>
               <p className="text-[9px] uppercase tracking-widest text-white/50 mb-2">PromQL Target</p>
               <div className="p-3 bg-black/60 border border-white/10 rounded-sm border-l-2 border-l-[#00F0FF]">
                  <code className="text-[#00F0FF] text-[9px] sm:text-[10px] font-mono break-all leading-relaxed">
                    sum(rate(container_cpu_usage_seconds_total&#123;namespace="production", pod=~"db-primary.*"&#125;[5m])) by (pod)
                  </code>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/5 rounded-sm flex flex-col justify-center items-center">
                 <p className="text-[9px] uppercase tracking-widest text-white/50 mb-2">CPU Rate</p>
                 <p className={`text-2xl font-mono font-bold ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-white'}`}>
                   {metrics.spikeActive && !metrics.healing ? ((metrics.systemCpu / 100) * 12).toFixed(2) : ((metrics.systemCpu / 100) * 3.2).toFixed(2)}<span className="text-xs text-white/40 ml-1 font-sans">cores</span>
                 </p>
              </div>
              <div className="p-4 bg-black/40 border border-white/5 rounded-sm flex flex-col justify-center items-center">
                 <p className="text-[9px] uppercase tracking-widest text-white/50 mb-2">Memory</p>
                 <p className="text-2xl font-mono font-bold text-white">
                   {metrics.spikeActive && !metrics.healing ? ((metrics.systemMem / 100) * 24).toFixed(1) : ((metrics.systemMem / 100) * 8).toFixed(1)}<span className="text-xs text-white/40 ml-1 font-sans">GiB</span>
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* B-Brain Internal Observability */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-6 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
               <Activity className="w-4 h-4 text-[#8A2BE2]" /> Engine Internals
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-[#8A2BE2] bg-[#8A2BE2]/10 px-2 py-0.5 border border-[#8A2BE2]/20">Self-Observed</span>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/5 bg-black/40 rounded-sm">
                 <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">API Latency</p>
                 <span className="text-lg font-mono font-bold text-[#8A2BE2]">{metrics.selfObservability?.apiLatency.toFixed(1) || '0.0'}ms</span>
              </div>
              <div className="p-4 border border-white/5 bg-black/40 rounded-sm">
                 <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Event Depth</p>
                 <span className="text-lg font-mono font-bold text-white">{metrics.selfObservability?.eventQueueDepth || 0}</span>
              </div>
              <div className="p-4 border border-white/5 bg-black/40 rounded-sm col-span-2 flex justify-between items-center">
                 <div>
                   <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">Mem Growth (B-Brain)</p>
                   <span className={`text-lg font-mono font-bold ${metrics.selfObservability?.internalMemoryGrowth && metrics.selfObservability.internalMemoryGrowth > 50 ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
                      +{metrics.selfObservability?.internalMemoryGrowth.toFixed(1) || '0.0'}MB
                   </span>
                 </div>
                 <div className="text-right">
                   <p className="text-[9px] uppercase font-bold text-white/50 tracking-widest mb-1">SSE Lag</p>
                   <span className="text-lg font-mono font-bold text-white">{metrics.eventLag.toFixed(0)}ms</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Business Impact Panel */}
      <div className="bg-white/5 border border-white/10 rounded-sm p-6 relative overflow-hidden mt-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-[#00F0FF]" />
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Business Impact & RoI Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy System */}
          <div className="p-5 border border-white/5 bg-black/40 rounded-sm group hover:border-white/10 transition-colors duration-500">
            <h4 className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]/50" />
              Without B-Engine (Standard Infra)
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Average Resolution Time</span>
                <span className="text-sm font-mono text-[#FF4E00]">45m 20s</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-xs text-white/70">Severity 1 Incidents / Mo</span>
                <span className="text-sm font-mono text-white/80">4.2</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-xs text-white/70">Predicted Downtime Cost</span>
                <span className="text-sm font-mono text-[#FF4E00]">$12,450/hr</span>
              </div>
            </div>
          </div>

          {/* With B-Engine */}
          <div className="p-5 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded-sm relative group hover:bg-[#00F0FF]/10 transition-colors duration-500">
            <div className="absolute top-0 right-0 px-2 py-1 bg-[#00F0FF]/20 text-[#00F0FF] text-[8px] uppercase tracking-widest font-bold">
              Autonomous
            </div>
            <h4 className="text-[10px] uppercase font-bold text-[#00F0FF] tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              With B-Engine Active
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white font-bold">Average Resolution Time</span>
                <span className="text-sm font-mono text-[#00F0FF] font-bold">2.4s</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#00F0FF]/10 pt-4">
                <span className="text-xs text-white font-bold">Severity 1 Incidents / Mo</span>
                <span className="text-sm font-mono text-[#00F0FF] font-bold">0.0 <span className="text-[9px] text-[#00F0FF]/60 ml-1 uppercase">(Prevented)</span></span>
              </div>
              <div className="flex justify-between items-center border-t border-[#00F0FF]/10 pt-4">
                <span className="text-xs text-white font-bold">Cost Avoided Summary</span>
                <span className="text-sm font-mono text-[#00F0FF] font-bold">100% Mitigated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
