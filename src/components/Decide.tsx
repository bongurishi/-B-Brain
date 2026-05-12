import React, { useState } from 'react';
import { Play, Settings2, ShieldCheck, Power } from 'lucide-react';

export function Decide() {
  const [autoMode, setAutoMode] = useState(false);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
       <header className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase">
            B-Decide
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            AI Thinking & Action Layer
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Self-Healing Mode</span>
          <button 
            onClick={() => setAutoMode(!autoMode)}
            className={`flex items-center gap-3 px-6 py-3 font-black uppercase text-xs tracking-[0.2em] transition-colors border ${
            autoMode 
              ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]' 
              : 'bg-white/5 border-white/20 text-white/50 hover:bg-white/10'
          }`}>
            <Power className="w-4 h-4" />
            {autoMode ? 'AUTO MODE ON' : 'AUTO MODE OFF'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] block mb-4">Pending AI Decisions</span>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${autoMode ? 'bg-[#00F0FF]' : 'bg-[#FF4E00]'}`}></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-1 text-[10px] font-bold border border-[#00F0FF]/30 uppercase tracking-widest">High Priority</span>
                <h4 className="text-2xl font-black text-white uppercase italic mt-4">Prevent OOM on db-primary-node</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Confidence</span>
                <span className="text-xl font-mono font-bold">94%</span>
              </div>
            </div>
            
            <p className="text-xs uppercase tracking-widest leading-relaxed text-white/60 mb-8 font-bold border-l border-white/10 pl-4">
              B-Predictor forecasts an OOM crash in 45m. B-Decide suggests dynamically scaling the instance memory state or killing idle long-running queries.
            </p>

            <div className="flex flex-col gap-4">
              <div className="p-5 border border-[#00F0FF]/20 bg-[#00F0FF]/5 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-black text-white uppercase tracking-wider">Action / Scale Instance</h5>
                  <p className="text-[10px] text-[#00F0FF] mt-1 font-mono uppercase tracking-widest">16GB -{'>'} 32GB RAM (0s Downtime)</p>
                  {autoMode && (
                    <div className="mt-3 flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase text-[#00F0FF]/70">
                      <ShieldCheck className="w-3 h-3" /> System will automatically execute in 30s. Safety rollback enabled.
                    </div>
                  )}
                </div>
                <button className={`flex items-center gap-3 font-black uppercase text-xs py-3 px-6 tracking-[0.2em] transition-colors rounded-none ${
                    autoMode ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] cursor-not-allowed' : 'bg-white text-black hover:bg-[#00F0FF]'
                }`}>
                  {autoMode ? (
                    'EXECUTING...'
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Execute
                    </>
                  )}
                </button>
              </div>

              <div className={`p-5 border border-white/10 flex items-center justify-between transition-opacity ${autoMode ? 'opacity-30' : 'bg-transparent opacity-70 hover:opacity-100'}`}>
                <div>
                  <h5 className="text-sm font-black text-white/80 uppercase tracking-wider">Action / Terminate Queries</h5>
                  <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-widest">Kill 14 queries idle &gt; 1h</p>
                </div>
                <button className="flex items-center gap-3 border border-white/30 text-white font-bold uppercase text-xs py-3 px-6 tracking-[0.1em] hover:bg-white/10 transition-colors rounded-none" disabled={autoMode}>
                  Approve Partial
                </button>
              </div>
            </div>
           {autoMode && (
              <div className="mt-6 pt-4 border-t border-[#00F0FF]/20 flex gap-6 text-[9px] font-bold tracking-widest uppercase font-mono text-[#00F0FF]/60">
                <p>Rollback Condition: Increased Latency &gt; 200ms</p>
                <p>Execution Log: Pending</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-4">Automation Rules</span>
          <div className="bg-white/5 border border-white/10 rounded-sm flex flex-col">
            {[
              { rule: 'AUTO-RESTART NODE.JS DEPS', status: 'ACTIVE', used: 142 },
              { rule: 'SCALE WEB-TIER CPU > 80%', status: 'ACTIVE', used: 89 },
              { rule: 'KILL ZOMBIE POSTGRES PROC', status: 'PAUSED', used: 0 },
            ].map((r, i) => (
              <div key={i} className="p-5 border-b border-white/10 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-white tracking-widest uppercase">{r.rule}</p>
                  <p className="text-[10px] font-mono text-[#00F0FF] mt-1 uppercase tracking-widest">Triggers // {r.used}</p>
                </div>
                <div className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest border ${
                  r.status === 'ACTIVE' 
                    ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10' 
                    : 'border-white/20 text-white/40'
                }`}>
                  {r.status}
                </div>
              </div>
            ))}
            <button className="w-full p-5 text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-[#00F0FF] bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Settings2 className="w-4 h-4" />
              Configure Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
