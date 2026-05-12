import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemStream } from '../hooks/useSystemStream';

const data = [
  { name: 'Mon', compute: 400, storage: 240, network: 240 },
  { name: 'Tue', compute: 300, storage: 139, network: 221 },
  { name: 'Wed', compute: 200, storage: 980, network: 229 },
  { name: 'Thu', compute: 278, storage: 390, network: 200 },
  { name: 'Fri', compute: 189, storage: 480, network: 218 },
  { name: 'Sat', compute: 239, storage: 380, network: 250 },
  { name: 'Sun', compute: 349, storage: 430, network: 210 },
];

export function Analyser() {
  const { metrics } = useSystemStream();

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
       <header className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase">
            B-Analyser
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            FinOps & Cloud Cost Management
          </p>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0">
          <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold mb-1">Live Burn Rate</p>
          <p className="text-4xl font-black text-[#FF4E00] italic">${metrics.cloudSpendRate?.toFixed(2) || '0.00'}<span className="text-sm">/hr</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-[#00F0FF]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-4 text-[#00F0FF]">Cost-Aware Scaling</span>
          <p className="text-[10px] text-white/60 font-mono tracking-widest leading-relaxed uppercase mb-6">
             Before B-Decide launches new worker nodes, it calculates the projected cloud bill and provisions cheaper Spot Instances when possible.
          </p>
          <div className="flex justify-between items-center p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
            <span className="text-xs text-white">Savings from Spot Instances (MTD)</span>
            <span className="text-xl font-black tracking-tighter text-[#00F0FF] italic">$1,205</span>
          </div>
        </div>

        <div className="p-6 bg-[#FF4E00]/10 border border-[#FF4E00]/30 rounded-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-2 h-full bg-[#FF4E00]"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-4 text-[#FF4E00]">Idle Resource Detection</span>
          <p className="text-[10px] text-white/60 font-mono tracking-widest leading-relaxed uppercase mb-6">
             Automatically flags and pauses non-production (staging/QA) pods during off-hours, projecting a 30% decrease in idle waste.
          </p>
          <div className="flex justify-between items-center p-3 border border-[#FF4E00]/20 bg-[#FF4E00]/5">
            <span className="text-xs text-white">Idle Nodes Suspended Currently</span>
            <span className="text-xl font-black tracking-tighter text-[#FF4E00] italic">
               {metrics.services?.filter(s => s.idle).length || 0} Nodes
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-sm p-8">
          <span className="text-xs font-bold uppercase tracking-widest block mb-8 text-white">Cost Breakdown Infrastructure</span>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#E0E0E0" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#E0E0E0" opacity={0.4} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Bar dataKey="compute" stackId="a" fill="#ffffff" />
                <Bar dataKey="storage" stackId="a" fill="#00F0FF" />
                <Bar dataKey="network" stackId="a" fill="#FF4E00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-sm flex flex-col">
          <div className="p-6 border-b border-white/10">
             <span className="text-xs font-bold uppercase tracking-widest text-[#FF4E00]">Business Priority Queue</span>
             <p className="text-[10px] font-mono tracking-widest text-white/50 uppercase mt-2">Ranked by Financial Impact</p>
          </div>
          <div className="flex-1 p-0 overflow-y-auto">
            <div className="p-6 border-b border-white/10 bg-[#FF4E00]/5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase text-[#FF4E00] tracking-widest bg-[#FF4E00]/10 px-2 py-0.5">Priority 1</span>
                <span className="text-sm font-mono font-bold text-[#FF4E00]">-$4,500/hr</span>
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Prevent DB_PRIMARY OOM</h4>
              <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest leading-relaxed">Will cause complete checkout failure in major region.</p>
            </div>
            
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase text-white/60 tracking-widest border border-white/10 px-2 py-0.5">Priority 2</span>
                <span className="text-sm font-mono font-bold text-white/70">-$850/hr</span>
              </div>
              <h4 className="text-sm font-black text-white/80 uppercase tracking-wider mb-2">Auth Token Latency</h4>
              <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest leading-relaxed">Causing 4% drop in successful login conversions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
