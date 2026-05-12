import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Database, AlertCircle, CheckCircle2 } from 'lucide-react';

const data = [
  { time: 'T-6h', risk: 10 }, { time: 'T-5h', risk: 12 }, { time: 'T-4h', risk: 15 },
  { time: 'T-3h', risk: 25 }, { time: 'T-2h', risk: 45 }, { time: 'T-1h', risk: 78 },
  { time: 'Now', risk: 85 },
];

export function Predictor() {
  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 overflow-y-auto">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] italic uppercase">
            B-Predictor
          </h2>
          <p className="text-white/40 mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Predictive Self-Healing 2.0 (AIOps)
          </p>
        </div>
      </header>

      {/* AI Trust Layer - Enterprise Polish */}
      <section className="bg-black/40 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
             <Brain className="w-5 h-5 text-[#8A2BE2]" />
             <h3 className="text-sm font-black uppercase tracking-widest text-[#8A2BE2]">AI Trust Layer</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Active Model</span>
            <span className="px-2 py-1 bg-[#8A2BE2]/10 text-[#8A2BE2] font-mono text-[9px] uppercase border border-[#8A2BE2]/30">GPT-4o / Gemini 1.5 Pro</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-[10px] uppercase text-white/50 tracking-widest font-bold">
               <Database className="w-3 h-3" /> Data Source
             </div>
             <p className="text-xs font-mono text-white/80">
               Engine: <span className="text-[#FF4E00]">Prometheus TSDB</span><br/>
               Cluster: <span className="text-[#00F0FF]">minikube-prod-01</span><br/>
               Namespace: <span className="text-white">production</span>
             </p>
          </div>
          
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-[10px] uppercase text-white/50 tracking-widest font-bold">
               <AlertCircle className="w-3 h-3 text-[#FFB300]" /> Live Assessment
             </div>
             <div className="flex items-center gap-4">
               <div>
                  <span className="text-xs font-mono text-white/60 block">Risk Level</span>
                  <span className="text-2xl font-black italic text-[#FFB300]">87%</span>
               </div>
               <div>
                  <span className="text-xs font-mono text-white/60 block">Confidence</span>
                  <span className="text-2xl font-black italic text-[#00F0FF]">High</span>
               </div>
             </div>
          </div>

          <div className="space-y-2 bg-white/5 p-3 border border-white/10">
             <div className="flex items-center gap-2 text-[10px] uppercase text-white/50 tracking-widest font-bold mb-2">
               <CheckCircle2 className="w-3 h-3 text-[#00F0FF]" /> AI Reasoning
             </div>
             <ul className="text-[10px] font-mono text-white/80 space-y-1">
               <li><span className="text-[#00F0FF]">&gt;</span> CPU over 85% for 45s across 3 pods.</li>
               <li><span className="text-[#00F0FF]">&gt;</span> Memory growth trend detected fitting OOM profile.</li>
               <li><span className="text-[#00F0FF]">&gt;</span> Action recommended: SCALE_WORKERS (+2 replicas).</li>
             </ul>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 border border-[#00F0FF]/30 bg-[#00F0FF]/5 rounded-sm relative overflow-hidden group flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-3xl transition-colors duration-1000"></div>
           <div>
             <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00F0FF]">ML-Driven Anomaly Detection</span>
              <span className="text-[10px] font-mono border border-[#00F0FF]/30 text-[#00F0FF] px-2 py-1 font-bold animate-pulse">
                ACTIVE INFERENCE
              </span>
            </div>
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[10px] md:text-xs uppercase tracking-widest leading-relaxed text-white/70 mb-6 font-bold">
                  B-Predictor ignores static bounds. It builds real-time baselines across time-of-day, historical limits, and ingest velocity to suppress false alarms.
                </p>
                
                <div className="h-48 w-full border border-white/10 p-2 bg-[#050505]/50">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#E0E0E0" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#E0E0E0" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #00F0FF', borderRadius: '0' }}
                        itemStyle={{ color: '#00F0FF', fontFamily: 'monospace', fontWeight: 'bold' }}
                        labelStyle={{ color: '#ffffff', fontSize: '10px', textTransform: 'uppercase' }}
                      />
                      <Area type="monotone" dataKey="risk" stroke="#00F0FF" strokeWidth={2} fill="url(#colorRisk)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
           </div>
        </div>

        <div className="p-6 border border-white/10 bg-white/5 rounded-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#FF4E00]">Safe Re-deployments (Auto-Rollback)</span>
            <p className="text-[10px] font-mono tracking-widest uppercase text-white/50 mb-6 leading-relaxed">
              Monitors the first 60 seconds of a new K8s Deployment. If performance degrades by &gt;2% compared to ML baseline, B-Decide automatically rolls back the ReplicaSet without human interaction.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#FF4E00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Time To Detect Degradation</span>
                  <span className="text-sm font-mono text-[#FF4E00] font-bold">~3.2s</span>
                </div>
                <div className="w-full bg-white/10 h-1 relative z-10">
                   <div className="bg-[#FF4E00] h-1 w-[15%]" />
                </div>
              </div>
              <div className="p-4 bg-black/40 border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Time To Auto-Rollback</span>
                  <span className="text-sm font-mono text-[#00F0FF] font-bold">~14.5s</span>
                </div>
                <div className="w-full bg-white/10 h-1 relative z-10">
                   <div className="bg-[#00F0FF] h-1 w-[45%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 border border-[#00F0FF]/20 bg-[#00F0FF]/5 flex items-center justify-between group cursor-default">
            <span className="text-[9px] uppercase tracking-widest font-mono text-[#00F0FF] group-hover:text-white transition-colors">Last Rollback Avoided Cost</span>
            <span className="text-lg font-black italic text-white group-hover:text-[#00F0FF] transition-colors">$14,200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
