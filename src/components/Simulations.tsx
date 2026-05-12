import React, { useState } from 'react';
import { FlaskConical, Play, Cpu, ServerCrash, Users } from 'lucide-react';

export function Simulations() {
  const [running, setRunning] = useState<string | null>(null);

  const handleSimulate = async (id: string) => {
    setRunning(id);
    setTimeout(() => {
      setRunning(null);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] italic uppercase flex items-center gap-4">
            Simulations
            <FlaskConical className="w-8 h-8 md:w-10 md:h-10 text-white/20 hidden sm:block" />
          </h2>
          <p className="text-white/40 mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Chaos Engineering & Impact Modeling
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'traffic-2x', title: 'Traffic x2 Surge', desc: 'Simulates a 100% immediate increase in global ingest traffic to test auto-scaling.', impact: 'Auth Service failure predicted in 14m.', risk: 'HIGH', icon: Users },
          { id: 'db-fail', title: 'Primary DB Failure', desc: 'Chaos Monkey: Kills db-primary-node to prove B-Engine can heal under pressure and trigger failover.', impact: 'Failover to secondary successful (2ms downtime).', risk: 'LOW', icon: ServerCrash },
          { id: 'cpu-spike', title: 'Node Exhaustion', desc: 'Maxes out CPU on 3 random worker nodes to test predictive redistribution.', impact: 'Auto-scaling recovers state in 90s.', risk: 'MEDIUM', icon: Cpu },
        ].map((sim, i) => (
          <div key={i} className={`p-6 border rounded-sm flex flex-col justify-between transition-colors ${running === sim.id ? 'border-[#00F0FF] bg-[#00F0FF]/5' : 'border-white/10 bg-white/5'}`}>
            <div>
              <div className="flex justify-between items-start mb-6">
                <sim.icon className={`w-8 h-8 ${running === sim.id ? 'text-[#00F0FF]' : 'text-white/40'}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border ${
                  sim.risk === 'HIGH' ? 'border-[#FF4E00] text-[#FF4E00]' : 
                  sim.risk === 'MEDIUM' ? 'border-[#F38020] text-[#F38020]' : 'border-[#00F0FF] text-[#00F0FF]'
                }`}>
                  RISK: {sim.risk}
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">{sim.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50 leading-relaxed font-mono">
                {sim.desc}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="mb-4">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold block mb-1">PREDICTED SYSTEM RAMIFICATION</span>
                <p className="text-xs font-mono text-white italic">{sim.impact}</p>
              </div>
              <button 
                onClick={() => handleSimulate(sim.id)}
                disabled={running !== null}
                className={`w-full flex items-center justify-center gap-2 font-black uppercase text-xs py-3 tracking-[0.2em] transition-colors rounded-none ${
                   running === sim.id ? 'bg-[#00F0FF] text-black cursor-wait' : 'bg-white text-black hover:bg-[#00F0FF]'
                }`}
              >
                {running === sim.id ? (
                  <>
                    <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    RUNNING...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    RUN SIMULATION
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 border border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white/5 border-dashed">
         <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Build Custom Scenario</h3>
            <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase mb-6 max-w-lg">Define trigger parameters, node clusters to isolate, and duration to predict systemic butterfly effects.</p>
            <button className="border border-white/20 text-white font-black uppercase text-xs py-4 px-8 tracking-[0.2em] hover:bg-white/10 transition-colors rounded-none">
              + DEFINE SCENARIO
            </button>
         </div>
      </div>
    </div>
  );
}
