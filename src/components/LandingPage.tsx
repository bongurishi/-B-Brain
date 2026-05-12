import React from 'react';
import { LogIn, Brain, Target, Shield, Zap, TrendingUp, Network, Terminal, Activity, Server, Clock, GitBranch, Play, Database, Lock, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { login } = useAuth();
  
  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] overflow-y-auto selection:bg-[#00F0FF] selection:text-black font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-md z-50">
         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tighter text-white italic uppercase flex items-center gap-2">
              <Brain className="w-6 h-6 text-[#00F0FF]" />
              B-Brain
            </h1>
            <div className="flex items-center gap-6">
               <button onClick={login} className="px-6 py-2 bg-[#00F0FF] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Enter Platform
               </button>
            </div>
         </div>
      </nav>

      {/* SECTION 1 - HERO SECTION */}
      <section className="pt-32 pb-20 px-6 relative min-h-screen flex flex-col justify-center bg-[#000] overflow-hidden">
         {/* Deep Space / Sci-Fi Background Elements */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#00F0FF] opacity-[0.15] blur-[100px]"></div>
         
         {/* Live Streams Background Animation */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
            <div className="absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent left-[20%] top-0 animate-[ping_3s_ease-in-out_infinite]"></div>
            <div className="absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent via-[#FF4E00] to-transparent left-[60%] top-[40%] animate-[ping_4s_ease-in-out_infinite] opacity-50"></div>
            <div className="absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent via-green-500 to-transparent left-[85%] top-[10%] animate-[ping_2.5s_ease-in-out_infinite]"></div>
         </div>

         {/* SYSTEM STATUS - TOP RIGHT */}
         <div className="hidden lg:flex absolute top-24 right-6 border border-white/10 bg-black/80 backdrop-blur-md p-4 z-20 flex-col gap-3 min-w-[200px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1 border-b border-white/5 pb-2">System Status</span>
            <div className="flex justify-between items-center gap-4">
               <span className="text-[10px] font-bold uppercase text-white/70">Clusters Healthy</span>
               <span className="text-xs font-mono text-green-400">24</span>
            </div>
            <div className="flex justify-between items-center gap-4">
               <span className="text-[10px] font-bold uppercase text-white/70">Incidents Prevented</span>
               <span className="text-xs font-mono text-[#00F0FF]">182</span>
            </div>
            <div className="flex justify-between items-center gap-4">
               <span className="text-[10px] font-bold uppercase text-white/70">AI Confidence</span>
               <span className="text-xs font-mono text-purple-400">96%</span>
            </div>
            <div className="flex justify-between items-center gap-4">
               <span className="text-[10px] font-bold uppercase text-white/70">Active Workflows</span>
               <span className="text-xs font-mono text-[#FF4E00] animate-pulse">41</span>
            </div>
         </div>

         <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full mb-12">
            {/* Left Side */}
            <div className="lg:col-span-7 text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">AI-Native Autonomous Infrastructure Platform</span>
               </div>
               
               <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-black italic tracking-tighter text-white mb-6 uppercase leading-[0.85] drop-shadow-2xl">
                 B-Brain
               </h2>
               
               <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#00F0FF] mb-10 leading-snug">
                 The autonomous operating system for cloud infrastructure.
               </h3>

               <p className="text-base md:text-lg text-white/50 mb-10 font-mono tracking-wide leading-relaxed max-w-2xl">
                 B-Brain continuously observes, predicts, decides, executes, and learns from infrastructure incidents in real time — enabling self-healing cloud operations across Kubernetes and distributed systems.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button onClick={login} className="px-8 py-5 bg-[#00F0FF] text-black font-black uppercase text-sm tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 relative group overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                     <div className="absolute inset-0 bg-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                     <span className="relative z-10 flex items-center gap-2">Launch Mission Control <Target className="w-4 h-4" /></span>
                  </button>
                  <button className="px-8 py-5 bg-black/50 border border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-white/10 hover:border-white/50 transition-colors flex items-center justify-center gap-3 backdrop-blur-md">
                     View Architecture
                  </button>
               </div>
               
               {/* Live Status Strip */}
               <div className="flex flex-wrap gap-3">
                 {[
                   { label: 'Prometheus Connected', color: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-400/10' },
                   { label: 'Kubernetes Active', color: 'text-[#326CE5]', border: 'border-[#326CE5]/30', bg: 'bg-[#326CE5]/10' },
                   { label: 'AI Governance Enabled', color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-400/10' },
                   { label: 'Real-Time Telemetry Streaming', color: 'text-green-400', border: 'border-green-400/30', bg: 'bg-green-400/10' }
                 ].map((status, i) => (
                   <div key={i} className={`flex items-center gap-2 px-3 py-1.5 border ${status.border} ${status.bg} rounded-sm backdrop-blur-sm`}>
                      <Activity className={`w-3 h-3 ${status.color} animate-pulse`} />
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${status.color}`}>{status.label}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Right Side - Visual / Vercel meets Datadog Map */}
            <div className="lg:col-span-5 relative h-[500px] border border-white/10 bg-black/60 backdrop-blur-xl rounded-sm overflow-hidden hidden lg:block shadow-2xl">
               <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
               
               {/* Glowing Topology Nodes */}
               <div className="absolute top-[20%] left-[20%] w-24 h-24 rounded-full border border-[#00F0FF]/50 bg-[#00F0FF]/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-[bounce_4s_infinite]">
                 <Terminal className="w-6 h-6 text-[#00F0FF]" />
               </div>
               
               <div className="absolute top-[40%] right-[15%] w-20 h-20 rounded-full border border-[#FF4E00]/50 bg-[#FF4E00]/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,78,0,0.3)] animate-[bounce_5s_infinite_ease-in-out]">
                  <Database className="w-5 h-5 text-[#FF4E00]" />
                  {/* Incident Pulse */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#FF4E00] animate-ping opacity-20"></div>
               </div>
               
               <div className="absolute bottom-[20%] left-[30%] w-32 h-32 rounded-full border border-green-500/50 bg-green-500/10 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-[bounce_6s_infinite_ease-in-out]">
                  <Server className="w-8 h-8 text-green-500" />
               </div>
               
               <div className="absolute bottom-[30%] right-[30%] w-16 h-16 rounded-full border border-[#8A2BE2]/50 bg-[#8A2BE2]/10 flex items-center justify-center shadow-[0_0_30px_rgba(138,43,226,0.3)] animate-[bounce_3s_infinite]">
                  <Brain className="w-5 h-5 text-[#8A2BE2]" />
               </div>

               {/* Connection Lines */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <line x1="25%" y1="25%" x2="75%" y2="45%" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                 <line x1="25%" y1="25%" x2="35%" y2="70%" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
                 <line x1="75%" y1="45%" x2="65%" y2="65%" stroke="rgba(255, 78, 0, 0.5)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                 <line x1="35%" y1="70%" x2="65%" y2="65%" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" />
               </svg>

               {/* Floating Data Labels */}
               <div className="absolute top-[18%] left-[8%] border border-[#00F0FF]/30 bg-black/80 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-[#00F0FF] backdrop-blur-md">
                 us-east-1 // INGRESS
               </div>
               <div className="absolute top-[35%] right-[2%] border border-[#FF4E00]/30 bg-black/80 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-[#FF4E00] backdrop-blur-md flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00] animate-pulse"></span> DB_LATENCY_SPIKE
               </div>
               <div className="absolute bottom-[18%] left-[25%] border border-green-500/30 bg-black/80 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-green-400 backdrop-blur-md">
                 NODE_POOL // HEALTHY
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 2 - THE PROBLEM & WHY B-BRAIN EXISTS */}
      <section className="py-32 px-6 bg-[#050505] border-y border-white/5 relative">
         <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[#FF4E00]/5 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 text-white leading-tight">Modern infrastructure is too complex for human reaction time.</h3>
            
            <p className="text-lg md:text-xl font-mono text-white/50 tracking-wide mb-8 leading-relaxed">
              Cloud systems generate millions of telemetry events, cascading failures, and operational decisions every hour.
            </p>
            <p className="text-lg md:text-xl font-mono text-white/80 tracking-wide leading-relaxed border-l-4 border-[#00F0FF] pl-6 inline-block text-left">
              B-Brain was built to transform infrastructure operations from reactive monitoring into autonomous real-time orchestration.
            </p>
         </div>
         
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-black/50 border border-white/10 p-10 hover:-translate-y-2 transition-transform duration-500 backdrop-blur-sm group">
               <Activity className="w-10 h-10 text-[#FF4E00] mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
               <h4 className="text-xl font-black uppercase tracking-widest mb-4">Monitoring represents the past</h4>
               <p className="text-sm font-mono border-t border-white/10 pt-6 text-white/50 leading-relaxed">Alerts detect failures only after impact. PagerDuty wakes engineers at 3 AM to fix what should heal itself.</p>
            </div>
            <div className="bg-black/50 border border-white/10 p-10 hover:-translate-y-2 transition-transform duration-500 backdrop-blur-sm group">
               <Clock className="w-10 h-10 text-yellow-500 mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
               <h4 className="text-xl font-black uppercase tracking-widest mb-4">Human limits are the bottleneck</h4>
               <p className="text-sm font-mono border-t border-white/10 pt-6 text-white/50 leading-relaxed">Evaluating metrics, querying logs, and writing remediation scripts takes minutes. Production needs milliseconds.</p>
            </div>
            <div className="bg-black/50 border border-white/10 p-10 hover:-translate-y-2 transition-transform duration-500 backdrop-blur-sm group">
               <GitBranch className="w-10 h-10 text-red-500 mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
               <h4 className="text-xl font-black uppercase tracking-widest mb-4">Fragmented control planes</h4>
               <p className="text-sm font-mono border-t border-white/10 pt-6 text-white/50 leading-relaxed">Telemetry, CI/CD, and governance live separately. B-Brain unifies them into a single autonomous neural network.</p>
            </div>
         </div>
      </section>

      {/* SECTION 3 - THE B-BRAIN LOOP */}
      <section className="py-24 px-6 bg-[#050505]">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-[#00F0FF]">The Autonomous Infrastructure Loop</h3>
            </div>
            <div className="relative">
               {/* Connecting Line */}
               <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent z-0 line-glow"></div>
               
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                 {[
                   { step: 1, title: 'Observe', desc: 'Collect telemetry from infrastructure, Kubernetes, cloud providers, and edge agents.', icon: <Network className="w-8 h-8 text-white" /> },
                   { step: 2, title: 'Predict', desc: 'Analyze patterns and forecast anomalies before outages occur.', icon: <Brain className="w-8 h-8 text-white" /> },
                   { step: 3, title: 'Decide', desc: 'Evaluate remediation strategies using AI reasoning and governance policies.', icon: <Target className="w-8 h-8 text-white" /> },
                   { step: 4, title: 'Execute', desc: 'Perform autonomous scaling, healing, and orchestration actions.', icon: <Zap className="w-8 h-8 text-[#00F0FF]" /> },
                   { step: 5, title: 'Learn', desc: 'Persist incidents and optimize future recovery workflows.', icon: <TrendingUp className="w-8 h-8 text-green-400" /> }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-black border border-white/10 relative group hover:border-[#00F0FF]/50 transition-colors">
                       <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-[#0a0a0a] flex items-center justify-center mb-6 z-10 group-hover:border-[#00F0FF]">
                         {item.icon}
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Step 0{item.step}</span>
                       <h4 className="text-lg font-black uppercase mb-4">{item.title}</h4>
                       <p className="text-xs font-mono text-white/50">{item.desc}</p>
                    </div>
                 ))}
               </div>
            </div>
            <div className="mt-16 text-center">
              <p className="inline-block px-4 py-2 border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest">
                 "Every recovery makes the system smarter."
              </p>
            </div>
         </div>
      </section>

      {/* SECTION 4 - LIVE ARCHITECTURE */}
      <section className="py-32 px-6 bg-[#000] border-y border-white/5 overflow-hidden relative">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
               <span className="text-[#00F0FF] font-mono text-[10px] uppercase tracking-widest block mb-4 animate-pulse">Internal Systems</span>
               <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Distributed Control Plane</h3>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-20 items-center justify-between">
               {/* Left - Flow Diagram */}
               <div className="flex-1 w-full relative">
                 {/* Connecting flow line container */}
                 <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent">
                   {/* Moving flow particle */}
                   <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent absolute top-0 animate-[fall_3s_linear_infinite]"></div>
                 </div>

                 <div className="flex flex-col gap-6 relative z-10">
                   {[
                     { name: 'Edge Agents & Exporters', type: 'INGRESS', color: 'border-white/20 text-white/70' },
                     { name: 'Telemetry Pipeline (OTel)', type: 'PROCESS', color: 'border-white/20 text-white/70' },
                     { name: 'Kafka Event Bus', type: 'STREAM', color: 'border-white/20 text-white/70' },
                     { name: 'ML Predictor & Anomaly Detection', type: 'INFERENCE', color: 'border-purple-500/50 text-purple-400 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
                     { name: 'Decision Engine (AI Agent)', type: 'REASONING', color: 'border-[#00F0FF]/50 text-[#00F0FF] bg-[#00F0FF]/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]' },
                     { name: 'OPA Governance Policies', type: 'SECURITY', color: 'border-red-500/50 text-red-400 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' },
                     { name: 'Temporal Workflows', type: 'ORCHESTRATION', color: 'border-orange-500/50 text-orange-400 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.1)]' },
                     { name: 'Kubernetes Operator', type: 'EXECUTION', color: 'border-green-500/50 text-green-400 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]' },
                   ].map((node, i) => (
                      <div key={i} className="flex justify-center w-full group relative">
                         <div className={`w-full max-w-[400px] border ${node.color} bg-[#050505] p-4 flex justify-between items-center transition-all duration-300 backdrop-blur-md`}>
                            <span className="font-mono text-xs uppercase tracking-widest">{node.name}</span>
                            <span className="font-mono text-[8px] uppercase tracking-widest opacity-50 bg-white/5 px-2 py-1">{node.type}</span>
                         </div>
                      </div>
                   ))}
                 </div>
               </div>

               {/* Right - Live Architecture Details & Metrics */}
               <div className="flex-1 w-full max-w-md">
                 <div className="bg-[#050505] border border-white/10 p-8 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
                    
                    <h4 className="text-xl font-black italic uppercase text-white mb-6 tracking-tighter">Live Telemetry State</h4>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-white/5 pb-2">
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Event Throughput</span>
                         <span className="text-2xl font-mono text-[#00F0FF]">12,408 <span className="text-[10px]">msg/s</span></span>
                      </div>
                      <div className="flex justify-between items-end border-b border-white/5 pb-2">
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Global MTTR</span>
                         <span className="text-2xl font-mono text-green-400">4.2 <span className="text-[10px]">min</span></span>
                      </div>
                      <div className="flex justify-between items-end border-b border-white/5 pb-2">
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">AI Confidence Map</span>
                         <span className="text-2xl font-mono text-purple-400">96.4 <span className="text-[10px]">%</span></span>
                      </div>
                      <div className="flex justify-between items-end border-b border-white/5 pb-2">
                         <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Active Orchs</span>
                         <span className="text-2xl font-mono text-orange-400">142</span>
                      </div>
                      
                      <div className="pt-6">
                         <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Decision Log (Last 12s)</div>
                         <div className="bg-black border border-white/5 p-3 space-y-2">
                           <div className="flex items-center justify-between text-[10px] font-mono">
                             <span className="text-white/50">12:04:11</span>
                             <span className="text-green-400">SCALE_DEPLOYMENT_OK</span>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-mono">
                             <span className="text-white/50">12:04:09</span>
                             <span className="text-red-400">OPA_POLICY_DENY (COST)</span>
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-mono">
                             <span className="text-white/50">12:04:02</span>
                             <span className="text-purple-400">INFERENCE_COMPLETE</span>
                           </div>
                         </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 5 - OPERATIONAL PROOF */}
      <section className="py-32 px-6 bg-[#000]">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#00F0FF] font-mono text-[10px] uppercase tracking-widest block mb-4">Cryptographic & Telemetry Evidence</span>
               <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">Trust is Built on Proof</h3>
               <p className="text-sm font-mono text-white/50 tracking-widest uppercase">Engineers don't trust marketing. They trust logs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Evidence 1: OPA Approval & Workflow ID */}
               <div className="border border-white/10 bg-[#050505] overflow-hidden flex flex-col">
                  <div className="bg-black border-b border-white/5 px-4 py-2 flex items-center justify-between">
                     <span className="font-mono text-[10px] text-white/40">b-brain-orchestrator.log</span>
                     <span className="font-mono text-[10px] text-green-400">STATUS: VERIFIED</span>
                  </div>
                  <div className="p-6 font-mono text-xs text-white/60 space-y-2 overflow-x-auto flex-1">
                     <div className="flex gap-4">
                       <span className="text-white/30 truncate select-none">14:02:11.001</span>
                       <span>[INFO] Analyzing anomaly in <span className="text-[#00F0FF]">payment-gateway</span></span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-white/30 truncate select-none">14:02:11.045</span>
                       <span>[WARN] Request failure rate elevated: <span className="text-red-400">14.2%</span></span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-white/30 truncate select-none">14:02:11.412</span>
                       <span>[INFO] Hypothesis generated: External API timeout. Recommended Action: Circuit Breaker Trip</span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-white/30 truncate select-none">14:02:11.602</span>
                       <span>REQUESTING OPA GOVERNANCE APPROVAL...</span>
                     </div>
                     <div className="flex gap-4 text-green-400">
                       <span className="truncate select-none">14:02:11.884</span>
                       <span>[OK] OPA_ALLOW: Policy checks passed (risk_score=12 &lt; threshold=50)</span>
                     </div>
                     <div className="flex gap-4 text-orange-400">
                       <span className="truncate select-none">14:02:11.905</span>
                       <span>[OK] TEMPORAL WORKFLOW INITIATED: <code>wf_8f29d1a3_b4</code></span>
                     </div>
                     <div className="flex gap-4">
                       <span className="text-white/30 truncate select-none">14:02:12.110</span>
                       <span>[SUCCESS] Circuit breaker tripped via operator execution.</span>
                     </div>
                  </div>
               </div>

               {/* Evidence 2: Kubernetes Execution & Traces */}
               <div className="border border-white/10 bg-[#050505] overflow-hidden flex flex-col">
                  <div className="bg-black border-b border-white/5 px-4 py-2 flex items-center justify-between">
                     <span className="font-mono text-[10px] text-white/40">k8s-operator-sync.yaml</span>
                     <span className="font-mono text-[10px] text-[#00F0FF]">KUBE-API: PATCH</span>
                  </div>
                  <div className="p-6 font-mono text-xs text-[#00F0FF] space-y-1 overflow-x-auto opacity-90 flex-1">
                     <div>apiVersion: <span className="text-white">apps/v1</span></div>
                     <div>kind: <span className="text-white">Deployment</span></div>
                     <div>metadata:</div>
                     <div className="pl-4">name: <span className="text-white">payment-gateway</span></div>
                     <div className="pl-4">namespace: <span className="text-white">production</span></div>
                     <div className="pl-4">annotations:</div>
                     <div className="pl-8 text-white/50">bbrain.io/last-orchestrated: "2026-05-12T14:02Z"</div>
                     <div className="pl-8 text-white/50">bbrain.io/trace-id: "tr_99x8f0a"</div>
                     <div>spec:</div>
                     <div className="pl-4">replicas: <span className="text-green-400">8</span> <span className="text-white/30"># Scaled up from 3</span></div>
                     <div className="pl-4">template:</div>
                     <div className="pl-8">spec:</div>
                     <div className="pl-12">containers:</div>
                     <div className="pl-12">- name: <span className="text-white">payment-gateway</span></div>
                     <div className="pl-14">env:</div>
                     <div className="pl-14">- name: <span className="text-white">CIRCUIT_BREAKER_MODE</span></div>
                     <div className="pl-16">value: <span className="text-orange-400">"TRIPPED"</span></div>
                  </div>
               </div>
            </div>
            
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
               <div className="border border-white/10 bg-[#050505] px-4 py-2 flex items-center gap-3 w-max">
                  <Shield className="w-4 h-4 text-white/40" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Audit Complete</span>
               </div>
               <div className="border border-white/10 bg-[#050505] px-4 py-2 flex items-center gap-3 w-max">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-green-400">Avg Resolution: 2.4s</span>
               </div>
               <div className="border border-white/10 bg-[#050505] px-4 py-2 flex items-center gap-3 w-max">
                  <Activity className="w-4 h-4 text-[#8A2BE2]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A2BE2]">PromQL Validation Active</span>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 6 - LIVE INCIDENT DEMO */}
      <section className="py-24 px-6 bg-black border-y border-white/10 relative">
         <div className="absolute inset-0 bg-[#FF4E00]/5 z-0"></div>
         <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-16 text-white">Autonomous Incident Recovery</h3>
            
            <div className="bg-[#0a0a0a] border border-white/20 p-8 text-left mb-12 shadow-2xl relative">
               {/* Decorative border */}
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FF4E00] via-[#00F0FF] to-transparent"></div>
               
               <div className="space-y-6 font-mono text-xs text-white/70">
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-[#FF4E00] font-bold">12:01:00</span>
                   <span className="text-white">CPU anomaly detected on node pool <code className="text-xs bg-white/10 px-1">auth-service-k9x1</code></span>
                 </div>
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-yellow-400 font-bold">12:02:14</span>
                   <span className="text-white">Predictor flags imminent cascading failure risk (Probability: 89%)</span>
                 </div>
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-purple-400 font-bold">12:02:45</span>
                   <span className="text-white">Multi-agent debate initiated (FinOps vs Reliability vs Security)</span>
                 </div>
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-green-500 font-bold">12:03:02</span>
                   <span className="text-white">OPA validates remediation strategy (Scale auth-deployment +3 replicas)</span>
                 </div>
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-[#00F0FF] font-bold">12:03:10</span>
                   <span className="text-white">Kubernetes scaling triggered via Operator Runtime</span>
                 </div>
                 <div className="flex gap-4 border-b border-white/5 pb-4">
                   <span className="text-white/40 font-bold">12:04:22</span>
                   <span className="text-green-400">Traffic stabilized. Latency returned to P99 (12ms)</span>
                 </div>
                 <div className="flex gap-4">
                   <span className="text-white/40 font-bold">12:04:24</span>
                   <span className="text-white">Incident learned & persisted to WAL</span>
                 </div>
               </div>
            </div>

            <button onClick={login} className="px-8 py-4 bg-transparent border border-[#FF4E00] text-[#FF4E00] font-black uppercase text-sm tracking-widest hover:bg-[#FF4E00] hover:text-black transition-colors flex items-center justify-center gap-3 mx-auto">
               <Play className="w-5 h-5" /> Watch Recovery Replay in App
            </button>
         </div>
      </section>

      {/* SECTION 7 - INTEGRATIONS */}
      <section className="py-24 px-6 bg-[#050505]">
         <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Connected Infrastructure Ecosystem</h3>
            <p className="text-sm font-mono text-white/50 tracking-widest uppercase mb-16">Built to integrate into modern cloud environments.</p>

            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto font-black uppercase italic tracking-widest text-2xl md:text-3xl text-white/20">
               <div className="hover:text-white transition-colors cursor-default">Kubernetes</div>
               <div className="hover:text-white transition-colors cursor-default">Prometheus</div>
               <div className="hover:text-white transition-colors cursor-default">Grafana</div>
               <div className="hover:text-white transition-colors cursor-default">Datadog</div>
               <div className="hover:text-white transition-colors cursor-default">AWS</div>
               <div className="hover:text-white transition-colors cursor-default">GCP</div>
               <div className="hover:text-white transition-colors cursor-default">Azure</div>
               <div className="hover:text-white transition-colors cursor-default">Kafka</div>
               <div className="hover:text-white transition-colors cursor-default">Temporal</div>
               <div className="hover:text-white transition-colors cursor-default">PagerDuty</div>
               <div className="hover:text-white transition-colors cursor-default">Slack</div>
               <div className="hover:text-white transition-colors cursor-default">OpenTelemetry</div>
            </div>
         </div>
      </section>

      {/* SECTION 8 - FINAL CTA */}
      <section className="py-32 px-6 bg-[#00F0FF] text-black text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="max-w-4xl mx-auto relative z-10">
            <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">The Future of Cloud Operations Is Autonomous</h3>
            <p className="text-xl font-mono tracking-wide mb-12 max-w-2xl mx-auto opacity-80">
               B-Brain transforms infrastructure from reactive monitoring into intelligent self-healing orchestration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={login} className="px-8 py-4 bg-black text-[#00F0FF] font-black uppercase text-sm tracking-widest hover:bg-black/80 transition-colors flex items-center justify-center gap-3">
                  Enter Mission Control
               </button>
               <button className="px-8 py-4 bg-transparent border-2 border-black text-black font-black uppercase text-sm tracking-widest hover:bg-black/10 transition-colors flex items-center justify-center gap-3">
                  View GitHub
               </button>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-[#050505] text-center border-t border-white/10">
         <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
               <Brain className="w-6 h-6 text-white/50" />
               <span className="font-black italic uppercase text-white/50 text-xl tracking-tighter">B-Brain</span>
            </div>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-12">Autonomous Cloud Operating System</p>
            
            <div className="border border-white/5 p-6 bg-black inline-block text-left relative">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#00F0FF]"></div>
               <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Built under B</p>
               <p className="font-serif italic text-lg text-white/80">"My Blood. My Dream. My Legacy."</p>
               <p className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF] mt-2">— B</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

