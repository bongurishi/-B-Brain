import React from 'react';
import { Server, Cpu, Database, RefreshCw, XCircle, Share2 } from 'lucide-react';
import { useSystemStream, SystemService } from '../hooks/useSystemStream';

export function Monitor() {
  const { metrics, restartService, killService } = useSystemStream();

  const getIcon = (name: string) => {
    if (name.includes('db')) return Database;
    if (name.includes('queue') || name.includes('worker')) return Cpu;
    return Server;
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            B-Monitor
            <div className="w-3 h-3 rounded-full bg-[#00F0FF] animate-pulse"></div>
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Real-time Sense Layer / OpenTelemetry Tracing
          </p>
        </div>
        <div className="text-left md:text-right mt-4 md:mt-0">
          <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold mb-1">K8s Pods Active</p>
          <p className="text-4xl font-black text-white italic">{metrics.services?.filter(s => s.status === 'RUNNING').length || 0}</p>
        </div>
      </header>

      {/* Dependency Map Mini-View */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-sm mb-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px] overflow-x-auto">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center relative z-10 min-w-max md:w-full justify-center p-4">
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-black flex items-center justify-center"><Share2 className="w-5 h-5 text-white/50" /></div>
             <span className="text-[9px] uppercase tracking-widest font-mono text-white/50">Ingress Gateway</span>
           </div>
           <div className="h-8 w-[1px] md:w-32 md:h-[1px] bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-pulse"></div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-full border-2 border-[#00F0FF] bg-black shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center"><Cpu className="w-5 h-5 text-[#00F0FF]" /></div>
             <span className="text-[9px] uppercase tracking-widest font-mono text-[#00F0FF]">Workers ({metrics.services?.filter(s => s.name.includes('worker')).length})</span>
           </div>
           <div className={`h-8 w-[1px] md:w-32 md:h-[1px] ${metrics.spikeActive && !metrics.healing ? 'bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#FF4E00] to-transparent animate-pulse' : 'bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent'}`}></div>
           <div className="flex flex-col items-center gap-2">
             <div className={`w-12 h-12 rounded-full border-2 ${metrics.spikeActive && !metrics.healing ? 'border-[#FF4E00] shadow-[0_0_15px_rgba(255,78,0,0.5)]' : 'border-white/20'} bg-black flex items-center justify-center`}>
                <Database className={`w-5 h-5 ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-white/50'}`} />
             </div>
             <span className={`text-[9px] uppercase tracking-widest font-mono ${metrics.spikeActive && !metrics.healing ? 'text-[#FF4E00]' : 'text-white/50'}`}>DB Primary</span>
           </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF]">Multi-Cloud Fleet (K8s)</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metrics.services?.map((svc: SystemService, i: number) => {
          const Icon = getIcon(svc.name);
          const isCritical = svc.name === 'db-primary-node' && metrics.spikeActive && !metrics.healing;
          const isRecovering = svc.name === 'db-primary-node' && metrics.healing;
          const isDead = svc.status === 'DEAD';

          return (
            <div key={svc.name} className={`p-5 border bg-white/5 rounded-sm flex items-center gap-6 transition-colors duration-1000 ${isCritical || isDead ? 'border-[#FF4E00]/50 bg-[#FF4E00]/5' : 'border-white/10'}`}>
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${isCritical || isDead ? 'text-[#FF4E00] animate-pulse' : 'text-[#00F0FF]'}`} />
              </div>
              <div className="flex-1 grid grid-cols-6 gap-6 items-center">
                <div className="col-span-2">
                  <p className={`text-sm font-black uppercase tracking-wider ${isCritical || isDead ? 'text-[#FF4E00]' : 'text-white'}`}>{svc.name}</p>
                  <div className="flex gap-2 items-center mt-1">
                    <p className={`text-[9px] font-mono tracking-widest uppercase border px-1 py-0.5 rounded-sm ${svc.provider === 'AWS' ? 'border-[#FF9900]/30 text-[#FF9900]' : svc.provider === 'GCP' ? 'border-[#4285F4]/30 text-[#4285F4]' : 'border-[#00A4EF]/30 text-[#00A4EF]'}`}>
                       {svc.provider}
                    </p>
                    <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase border border-white/10 px-1 py-0.5 rounded-sm">
                       {svc.region}
                    </p>
                    {svc.pid && <p className="text-[9px] text-white/40 font-mono tracking-widest uppercase hidden lg:block">PID:{svc.pid}</p>}
                  </div>
                </div>
                <div className="col-span-1">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border ${
                    isDead ? 'border-[#FF4E00] text-[#FF4E00] bg-[#FF4E00]/10' :
                    isCritical ? 'border-[#FF4E00] text-[#FF4E00] bg-[#FF4E00]/10' : 
                    isRecovering ? 'border-[#F38020] text-[#F38020] bg-[#F38020]/10' :
                    'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10'
                  }`}>
                    {isDead ? 'DEAD' : (isCritical ? 'CRITICAL' : (isRecovering ? 'RECOVERING' : 'HEALTHY'))}
                  </span>
                  <p className="text-[9px] text-white/30 uppercase mt-2 font-mono">Restarts: {svc.restarts}</p>
                </div>
                <div className="col-span-1">
                  <div className="flex justify-between text-[10px] font-mono tracking-widest mb-1 uppercase">
                    <span className="text-white/40">CPU_LOAD</span>
                    <span className={`${isDead ? 'text-white/20' : (isCritical ? 'text-[#FF4E00]' : 'text-white')}`}>
                       {isDead ? '0' : svc.cpu}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1 overflow-hidden relative">
                    <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${(isCritical || isDead) ? 'bg-[#FF4E00]' : 'bg-[#00F0FF]'}`} 
                         style={{ width: `${isDead ? 0 : svc.cpu}%` }}>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex justify-between text-[10px] font-mono tracking-widest mb-1 uppercase">
                    <span className="text-white/40">MEMORY</span>
                    <span className={`${isDead ? 'text-white/20' : (svc.memory > (svc.type === 'agent' ? 90 : 200) ? 'text-[#FF4E00]' : 'text-white')}`}>
                       {isDead ? 0 : svc.memory}{svc.type === 'agent' ? '%' : 'MB'}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1 overflow-hidden relative">
                    <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${svc.memory > (svc.type === 'agent' ? 90 : 200) ? 'bg-[#FF4E00]' : 'bg-[#00F0FF]'}`} style={{ width: `${isDead ? 0 : (svc.type === 'agent' ? svc.memory : Math.min(100, (svc.memory / 300) * 100))}%` }}></div>
                  </div>
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                  <button 
                    onClick={() => restartService(svc.name)}
                    className="p-2 border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                    title="Restart Pod"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => killService(svc.name)}
                    disabled={isDead}
                    className="p-2 border border-[#FF4E00]/30 text-[#FF4E00]/50 hover:bg-[#FF4E00]/20 hover:text-[#FF4E00] transition-colors disabled:opacity-20"
                    title="Kill Pod"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
