import React, { useState } from 'react';
import { Globe, MapPin, Activity } from 'lucide-react';
import { useSystemStream } from '../hooks/useSystemStream';

export function TopologyMap() {
  const { metrics } = useSystemStream();
  const [activeRegion, setActiveRegion] = useState('us-east-1');
  
  const regions = [
    { id: 'us-east-1', name: 'N. Virginia', x: 25, y: 35, healthy: true },
    { id: 'us-west-2', name: 'Oregon', x: 15, y: 30, healthy: true },
    { id: 'eu-west-1', name: 'Ireland', x: 45, y: 30, healthy: true },
    { id: 'eu-central-1', name: 'Frankfurt', x: 50, y: 32, healthy: !metrics.spikeActive }, // Shows incident if spike
    { id: 'ap-southeast-1', name: 'Singapore', x: 75, y: 60, healthy: true },
    { id: 'ap-northeast-1', name: 'Tokyo', x: 80, y: 40, healthy: true }
  ];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 overflow-y-auto">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            Global Topology
            <Globe className="w-8 h-8 md:w-10 md:h-10 text-white/20 hidden sm:block" />
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[11px] md:text-[11px] tracking-[0.2em] uppercase max-w-2xl leading-relaxed">
            Operational Intelligence • Rerouting & Latency
          </p>
        </div>
        {metrics.spikeActive && !metrics.healing && (
           <div className="bg-[#FF4E00]/10 border border-[#FF4E00]/30 px-4 py-2 flex items-center gap-3">
             <Activity className="w-4 h-4 text-[#FF4E00] animate-pulse" />
             <span className="text-[10px] font-mono font-bold text-[#FF4E00] uppercase tracking-widest">
               Frankfurt degraded • Rerouting traffic to Ireland
             </span>
           </div>
        )}
      </header>
      
      <div className="bg-[#020202] border border-white/10 relative overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] rounded-sm">
         {/* Abstract Map Background */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         
         {/* Draw Connections */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {regions.map((r, i) => {
             if (i === 0) return null;
             const prev = regions[i-1];
             const isRerouting = metrics.spikeActive && !metrics.healing && r.id === 'eu-central-1' && prev.id === 'eu-west-1';

             return (
               <g key={`line-${i}`}>
                 <line 
                   x1={`${prev.x}%`} y1={`${prev.y}%`} 
                   x2={`${r.x}%`} y2={`${r.y}%`} 
                   stroke={metrics.spikeActive && (!r.healthy || !prev.healthy) ? '#FF4E00' : '#00F0FF'} 
                   strokeWidth={isRerouting ? "2" : "1"} 
                   strokeOpacity="0.2" 
                   strokeDasharray={isRerouting ? "0" : "4 4"}
                   className={!r.healthy || !prev.healthy ? 'animate-pulse' : ''}
                 />
                 {isRerouting && (
                   <line
                     x1={`${r.x}%`} y1={`${r.y}%`}
                     x2={`${prev.x}%`} y2={`${prev.y}%`}
                     stroke="#00F0FF"
                     strokeWidth="2"
                     strokeOpacity="0.8"
                     strokeDasharray="4 4"
                     className="animate-[dash_1s_linear_infinite]"
                   />
                 )}
               </g>
             )
           })}
         </svg>

         {/* Nodes */}
         {regions.map(region => (
            <div 
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 ${metrics.spikeActive && !region.healthy ? 'z-30' : ''}`}
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
            >
               <div className={`w-4 h-4 rounded-full mb-1 ${region.healthy ? 'bg-[#00F0FF]/80' : 'bg-[#FF4E00]'} group-hover:scale-150 transition-transform relative border border-white/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]`}>
                  {!region.healthy && <div className="absolute inset-0 w-full h-full rounded-full bg-[#FF4E00] animate-ping opacity-75"></div>}
               </div>

               <div className={`absolute top-full left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm border p-3 whitespace-nowrap z-20 transition-all ${activeRegion === region.id || (!region.healthy && metrics.spikeActive) ? 'opacity-100 border-[#00F0FF]/50 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 border-white/10 group-hover:scale-100 group-hover:pointer-events-auto'} ${!region.healthy ? 'border-[#FF4E00]/50 shadow-[0_0_20px_rgba(255,78,0,0.2)]' : ''}`}>
                  <p className="text-xs font-black uppercase text-white tracking-widest leading-none mb-2">{region.name}</p>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Status</span>
                       <span className={`text-[10px] font-mono font-bold uppercase ${region.healthy ? 'text-[#00F0FF]' : 'text-[#FF4E00]'}`}>
                         {region.healthy ? 'Nominal' : 'DEGRADED'}
                       </span>
                     </div>
                     <div>
                       <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Nodes</span>
                       <span className="text-[10px] font-mono text-white">426</span>
                     </div>
                     <div>
                       <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Latency</span>
                       <span className={`text-[10px] font-mono ${region.healthy ? 'text-white/80' : 'text-[#FF4E00]'}`}>
                         {region.healthy ? (Math.random() * 20 + 10).toFixed(0) : '480'}ms
                       </span>
                     </div>
                     <div>
                       <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Traffic Flow</span>
                       <span className={`text-[10px] font-mono ${region.healthy ? 'text-[#00F0FF]' : 'text-[#FF4E00]'}`}>
                         {region.healthy ? '100% (LOCAL)' : 'REROUTED'}
                       </span>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
