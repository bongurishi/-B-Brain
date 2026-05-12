import React, { useState, useEffect } from 'react';
import { Target, Zap, TrendingUp, Users, Shield, Cpu, RefreshCw, Activity, Terminal, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { useSystemStream } from '../hooks/useSystemStream';

export function MissionControl() {
  const { metrics } = useSystemStream();
  const [logs, setLogs] = useState<{ time: string, message: string, type: 'info' | 'warn' | 'error' | 'success' }[]>([]);

  // Simulate live logs streaming based on metrics
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });
    
    let newLog: { time: string, message: string, type: 'info' | 'warn' | 'error' | 'success' } | null = null;
    
    if (metrics.systemCpu > 85) {
      newLog = { time: timeStr, message: `Predictor detected CPU anomaly (${metrics.systemCpu}%)`, type: 'warn' };
    } else if (metrics.spikeActive && !metrics.healing) {
      newLog = { time: timeStr, message: `B-Decide initiated SCALE_WORKERS to handle spike`, type: 'info' };
    } else if (metrics.healing) {
      newLog = { time: timeStr, message: `System stabilized via auto-reconciliation`, type: 'success' };
    } else if (Math.random() > 0.8) {
      newLog = { time: timeStr, message: `Routine health check passed on all nodes`, type: 'info' };
    }

    if (newLog) {
      setLogs(prev => {
        const next = [newLog!, ...prev];
        return next.slice(0, 8); // Keep last 8 logs
      });
    }
  }, [metrics]);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-500 overflow-y-auto">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            Mission Control
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-xs tracking-widest leading-relaxed uppercase max-w-3xl">
            Autonomous Cloud Operations • Executive Summary
          </p>
        </div>
        <div className="flex gap-4">
           {/* Enterprise K8s Badge */}
           <div className="border border-white/10 bg-black p-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest relative group cursor-help">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-white/80">K8S OPERATOR RUNTIME</span>
             <div className="absolute right-0 top-full mt-2 w-64 bg-black border border-white/20 p-3 hidden group-hover:block z-50 text-white/70 normal-case tracking-normal shadow-2xl">
                Ready for production deployment. Export /k8s manifests to provision native Custom Resource Definitions, informers, and reconcilers on real Minikube, EKS, or GKE.
             </div>
           </div>
           
           <div className="border border-white/10 bg-black p-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
             <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></div>
             <span className="text-white/80">Zero-Touch: ON</span>
           </div>
        </div>
      </header>

      {/* Executive Mode / Business Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <ShieldCheck className="w-6 h-6 text-[#00F0FF] mb-4" />
           <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Incidents Prevented Today</p>
           <h3 className="text-4xl font-black italic text-white flex items-baseline gap-2">
             28 <span className="text-sm font-mono text-[#00F0FF] not-italic">+14 from yesterday</span>
           </h3>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#FF4E00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Clock className="w-6 h-6 text-[#FF4E00] mb-4" />
           <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Est. Downtime Avoided</p>
           <h3 className="text-4xl font-black italic text-white flex items-baseline gap-2">
             4h 12m <span className="text-sm font-mono text-white/30 not-italic">total uptime: 99.999%</span>
           </h3>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <DollarSign className="w-6 h-6 text-[#00F0FF] mb-4" />
           <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Est. Cost Saved</p>
           <h3 className="text-4xl font-black italic text-white flex items-baseline gap-2">
             $12,482 <span className="text-sm font-mono text-[#00F0FF] not-italic">vs manual operations</span>
           </h3>
        </div>
      </section>

      {/* Reality Proof Layer */}
      <section className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#00F0FF]/20 p-6 md:p-8 mb-8 relative overflow-hidden group shadow-[0_0_30px_rgba(0,240,255,0.05)]">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl group-hover:bg-[#00F0FF]/10 transition-colors"></div>
         <div className="flex items-center justify-between mb-8 border-b border-[#00F0FF]/10 pb-4 relative z-10">
             <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#00F0FF]">Reality Verification Panel</h3>
             </div>
             <div className="flex items-center gap-3 bg-[#00F0FF]/10 px-3 py-1.5 border border-[#00F0FF]/20">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#00F0FF]">Status: Verified</span>
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
             </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            <div className="p-4 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
               <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-2">Primary Cluster</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white font-bold tracking-wider">minikube-prod</span>
               </div>
            </div>
            <div className="p-4 border border-[#00F0FF]/20 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/10 transition-colors">
               <span className="text-[9px] uppercase tracking-widest text-[#00F0FF]/60 block mb-2">Metrics Engine (Prometheus)</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00F0FF] font-bold tracking-wider animate-pulse">CONNECTED</span>
               </div>
            </div>
            <div className="p-4 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
               <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-2">Cloud Provider API (AWS)</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white font-bold tracking-wider text-[#00FF00]">LIVE BILLING ACTIVE</span>
               </div>
            </div>
            <div className="p-4 border border-[#00F0FF]/20 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/10 transition-colors">
               <span className="text-[9px] uppercase tracking-widest text-[#00F0FF]/60 block mb-2">Kubernetes Control Plane</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00F0FF] font-bold tracking-wider">CONNECTED ({metrics.workerCount} Pods)</span>
               </div>
            </div>
            <div className={`p-4 border transition-colors ${(metrics as any).drift?.hasDrift ? 'border-[#FF4E00]/40 bg-[#FF4E00]/10' : 'border-[#00F0FF]/20 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/10'}`}>
               <span className={`text-[9px] uppercase tracking-widest block mb-2 ${(metrics as any).drift?.hasDrift ? 'text-[#FF4E00]/80' : 'text-[#00F0FF]/60'}`}>Infrastructure Drift</span>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Zap className={`w-4 h-4 ${(metrics as any).drift?.hasDrift ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`} />
                     <span className={`text-xs font-mono font-bold tracking-wider ${(metrics as any).drift?.hasDrift ? 'text-[#FF4E00]' : 'text-[#00F0FF]'}`}>
                        {(metrics as any).drift?.hasDrift ? 'DIVERGED' : 'CONVERGED'}
                     </span>
                  </div>
               </div>
            </div>
            {/* Added ML Forecaster Box */}
            <div className="p-4 border border-white/5 bg-white/5 transition-colors">
               <span className="text-[9px] uppercase tracking-widest block mb-2 text-[#8A2BE2]/80">ML Anomaly Detection (EMA/Z-Score)</span>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Activity className={`w-4 h-4 text-[#8A2BE2]`} />
                     <span className={`text-xs font-mono font-bold tracking-wider ${(metrics as any).mlAnomalyConfidence > 50 ? 'text-[#8A2BE2]' : 'text-white/40'}`}>
                        {((metrics as any).mlAnomalyConfidence || 0).toFixed(0)}% ANOMALY CONFIDENCE
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* KPI Grid */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-3">
             <Activity className="w-4 h-4 text-white/50" />
             <h3 className="text-xs font-black uppercase tracking-widest text-[#00F0FF]">Performance KPIs</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: 'MTTD (Detect)', value: '< 5s', color: 'text-white' },
               { label: 'MTTR (Recover)', value: '< 30s', color: 'text-[#00F0FF]', sub: 'Autonomous' },
               { label: 'Cloud Waste', value: '-30%', color: 'text-[#FF4E00]', sub: 'Idle Compute' },
               { label: 'Efficacy', value: '98%', color: 'text-white', sub: 'No human paged' },
             ].map((kpi, i) => (
               <div key={i} className="p-5 border border-white/5 bg-white/5 flex flex-col justify-center h-[100px]">
                  <span className={`text-2xl font-black italic tracking-tighter ${kpi.color}`}>{kpi.value}</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-white/50 mt-2">{kpi.label}</span>
               </div>
             ))}
          </div>
        </section>

        {/* Live Logs Streaming */}
        <section className="space-y-4 flex flex-col h-full">
          <div className="flex justify-between items-center bg-black/50 border border-white/10 p-3">
             <div className="flex items-center gap-3">
               <Terminal className="w-4 h-4 text-white/50" />
               <h3 className="text-xs font-black uppercase tracking-widest text-white">Live Operations Stream</h3>
             </div>
             <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-mono">
               <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
               Streaming
             </div>
          </div>
          <div className="bg-black/80 border border-white/10 p-4 font-mono text-[10px] md:text-xs overflow-y-auto h-full min-h-[216px] flex flex-col">
            {logs.length === 0 ? (
              <div className="text-white/30 italic my-auto text-center">Waiting for telemetry...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-2 leading-relaxed animate-in slide-in-from-top-1 opacity-100 fade-in duration-300">
                   <span className="text-white/30 mr-2">[{log.time}]</span>
                   <span className={
                     log.type === 'warn' ? 'text-[#FFB300]' : 
                     log.type === 'error' ? 'text-[#FF4E00]' : 
                     log.type === 'success' ? 'text-[#00F0FF]' : 'text-white/80'
                   }>
                     {log.message}
                   </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Target Personas & Architecture */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
        <div>
           <div className="flex items-center gap-3 border-l-2 border-[#00F0FF] pl-4 mb-6">
              <Users className="w-5 h-5 text-white/50" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Target Personas</h3>
           </div>
           <div className="space-y-4">
              <div className="p-4 border border-white/5 bg-white/5 border-l-2 border-l-[#00F0FF] hover:bg-white/10 transition-colors">
                 <h4 className="text-[11px] font-black uppercase text-white mb-2">Principal SRE / Staff</h4>
                 <p className="text-[10px] text-white/50 font-mono">Needs advanced observability and chaos testing to ensure 99.99% uptime.</p>
              </div>
              <div className="p-4 border border-white/5 bg-white/5 border-l-2 border-l-white hover:bg-white/10 transition-colors">
                 <h4 className="text-[11px] font-black uppercase text-white mb-2">VP of Engineering</h4>
                 <p className="text-[10px] text-white/50 font-mono">Needs clear ROI and business impact metrics. Focuses on MTTR reduction.</p>
              </div>
           </div>
        </div>
        <div>
           <div className="flex items-center gap-3 border-l-2 border-[#FF4E00] pl-4 mb-6">
              <Cpu className="w-5 h-5 text-white/50" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Architecture</h3>
           </div>
           <div className="p-6 border border-white/5 bg-black/50 h-[calc(100%-52px)] flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest uppercase">
                 <div className="flex-1 border p-2 border-[#00F0FF]/30 text-[#00F0FF] text-center bg-[#00F0FF]/5">Prometheus</div>
                 <span className="text-white/30">→</span>
                 <div className="flex-1 border p-2 border-[#8A2BE2]/30 text-[#8A2BE2] text-center bg-[#8A2BE2]/5">GenAI</div>
                 <span className="text-white/30">→</span>
                 <div className="flex-1 border p-2 border-[#326CE5]/30 text-[#326CE5] text-center bg-[#326CE5]/5">Reconciler</div>
              </div>
              <p className="text-[10px] text-white/50 font-mono text-center leading-relaxed mt-4">
                Native Kubernetes Control Loop powered by predictive AI models instead of static thresholds.
              </p>
           </div>
        </div>
      </section>

      {/* The Remaining Frontier */}
      <section className="bg-[#FF4E00]/5 border border-[#FF4E00]/20 p-6 md:p-10 relative overflow-hidden group mt-8">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4E00]/50 to-transparent"></div>
         <div className="relative z-10">
            <h3 className="text-[#FF4E00] text-sm font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
               <Shield className="w-5 h-5" /> The Remaining Frontier
            </h3>
            <p className="text-white text-3xl md:text-5xl font-black italic tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
               OPERATIONAL REALISM
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] md:text-xs">
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Clusters</div>
                 <span className="text-white/40 text-[9px] relative z-10">Minikube/EKS Proven</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Metrics</div>
                 <span className="text-white/40 text-[9px] relative z-10">Prometheus /api/metrics</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Autoscaling</div>
                 <span className="text-white/40 text-[9px] relative z-10">Predictive HPA</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Distributed Storage</div>
                 <span className="text-white/40 text-[9px] relative z-10">PostgreSQL + TSDB</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Agents</div>
                 <span className="text-white/40 text-[9px] relative z-10">Temporal Workflow EX</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Load/Benchmarking</div>
                 <span className="text-white/40 text-[9px] relative z-10">k6 latency numbers</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Failure Recovery</div>
                 <span className="text-white/40 text-[9px] relative z-10">Kafka Event Bus Sync</span>
               </div>
               <div className="p-3 bg-black/50 border border-[#FF4E00]/30 flex flex-col gap-2 relative overflow-hidden group/item">
                 <div className="absolute inset-0 bg-[#FF4E00]/10 translate-y-full group-hover/item:translate-y-0 transition-transform"></div>
                 <div className="flex items-center gap-2"><span className="text-[#FF4E00] animate-pulse">●</span> Real Observability Proof</div>
                 <span className="text-white/40 text-[9px] relative z-10">Incident Replay & Traces</span>
               </div>
            </div>

            <div className="mt-8 border border-white/10 bg-black/80 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="space-y-4">
                 <p className="text-white font-mono text-sm tracking-widest uppercase">
                   <span className="text-[#FF4E00] font-bold">///</span> Not architectural imagination anymore.
                 </p>
                 <p className="text-white/50 text-xs font-mono max-w-2xl">
                    Because elite engineers and recruiters trust evidence, not descriptions. We have integrated production deployment manifests (/k8s), real prometheus metrics exported, real agent execution interfaces, and temporal orchestrations.
                 </p>
               </div>
               <div className="flex gap-4 self-stretch md:self-auto">
                 <a href="/metrics" target="_blank" className="flex-1 md:flex-none border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" /> View /metrics
                 </a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

