import React from 'react';
import { useSystemStream } from '../hooks/useSystemStream';
import { Server, Activity, ShieldAlert, Zap, Cpu, HardDrive } from 'lucide-react';

export function FleetView() {
  const metrics = useSystemStream();

  const agents = ((metrics as any).services || []).filter((s: any) => s.type === 'agent');

  return (
    <div className="p-6 md:p-12 space-y-8 animate-fade-in pb-24">
      <div className="flex flex-col gap-2">
         <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Connected Fleet</h2>
         <p className="text-[#00F0FF] text-sm uppercase tracking-widest font-bold">Distributed Machine Agents ({agents.length} Online)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => {
           const isDead = agent.status === 'DEAD';
           return (
             <div key={agent.name} className={`bg-[#0a0a0a] border ${isDead ? 'border-[#FF4E00]' : 'border-white/10'} p-6 flex flex-col gap-6 relative overflow-hidden group`}>
               {/* Background Accent */}
               <div className={`absolute top-0 left-0 w-1 h-full ${isDead ? 'bg-[#FF4E00]' : 'bg-[#00F0FF]'}`}></div>
               <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-[80px] ${isDead ? 'bg-[#FF4E00]/20' : 'bg-[#00F0FF]/10'} mix-blend-screen pointer-events-none transition-all duration-1000 group-hover:scale-150`}></div>

               {/* Header */}
               <div className="flex items-start justify-between z-10">
                 <div>
                   <h3 className="text-white font-bold text-lg">{agent.name}</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <span className={`w-2 h-2 rounded-full ${isDead ? 'bg-[#FF4E00]' : 'bg-[#00F0FF] animate-pulse glow shadow-[0_0_5px_#00F0FF]'}`}></span>
                     <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${isDead ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
                        {isDead ? 'OFFLINE' : 'ONLINE'}
                     </span>
                     <span className="text-white/30 text-[10px] font-mono tracking-widest uppercase">• {agent.provider}</span>
                   </div>
                 </div>
                 <Server className={`w-5 h-5 ${isDead ? 'text-[#FF4E00]/50' : 'text-white/20'}`} />
               </div>

               {/* Metrics Grid */}
               <div className="grid grid-cols-2 gap-4 z-10">
                 <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1"><Cpu className="w-3 h-3" /> CPU</span>
                    <span className={`text-xl font-mono font-bold ${agent.cpu > 80 ? 'text-[#FF4E00]' : 'text-white'}`}>{agent.cpu}%</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1"><Activity className="w-3 h-3" /> Memory</span>
                    <span className={`text-xl font-mono font-bold ${agent.memory > 80 ? 'text-[#FF4E00]' : 'text-white'}`}>{agent.memory}%</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1"><HardDrive className="w-3 h-3" /> Disk IO</span>
                    <span className="text-xl font-mono font-bold text-[#00F0FF]">{Math.round((agent as any).diskIo || 0)}</span>
                 </div>
                 <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1"><Activity className="w-3 h-3" /> Net RX/TX</span>
                    <span className="text-xl font-mono font-bold text-[#00F0FF]">
                      {(agent as any).networkRx?.toFixed(1) || '0.0'}/{(agent as any).networkTx?.toFixed(1) || '0.0'}
                    </span>
                 </div>
               </div>

               {/* Agent Capabilities Framework */}
               <div className="z-10 mt-1">
                  <div className="flex flex-wrap gap-2">
                     {((agent as any).capabilities || []).map((cap: string) => (
                        <span key={cap} className="px-2 py-1 bg-white/5 border border-white/10 text-[#00F0FF] text-[8px] font-mono tracking-widest font-bold uppercase rounded-sm">
                           {cap}
                        </span>
                     ))}
                  </div>
               </div>

               {/* AI Intelligence block */}
               <div className="border border-white/10 bg-white/5 p-4 z-10 mt-2">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#8A2BE2]" />
                        <span className="text-xs uppercase font-bold text-white tracking-wider">Predictor Status</span>
                     </div>
                  </div>
                  {isDead ? (
                      <p className="text-xs text-[#FF4E00] font-mono leading-relaxed">Agent is unreachable. AI Decision Engine has cordoned the node and triggered cluster reconciliation.</p>
                  ) : (
                      <p className="text-xs text-white/70 font-mono leading-relaxed">
                        {agent.cpu > 75 
                          ? "High risk of thermal throttling or CPU starvation. Predictor recommends scaling out workloads to adjacent idle nodes." 
                          : "Agent telemetry is nominal. No immediate anomalies detected in the structural execution flow."}
                      </p>
                  )}
               </div>
             </div>
           );
        })}

        {agents.length === 0 && (
          <div className="col-span-full py-12 flex justify-center items-center flex-col gap-4 bg-[#0a0a0a] border border-dashed border-white/20">
             <Server className="w-8 h-8 text-white/20" />
             <p className="text-white/50 uppercase tracking-widest font-bold text-xs">No Agents Connected</p>
          </div>
        )}
      </div>
    </div>
  );
}
