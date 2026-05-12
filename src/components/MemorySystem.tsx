import React, { useState } from 'react';
import { Search, Brain } from 'lucide-react';
import { useSystemStream } from '../hooks/useSystemStream';

export function MemorySystem() {
  const { metrics } = useSystemStream();
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback data if no real incidents yet
  const defaultIncidents = [
    { id: 'INC-9942', title: 'Redis connection pool exhaustion', date: 'Oct 24, 2023', learned: 'Added predictive scaling on conn_count > 80% limit', duration: '14m', optimization: 'Reduced healing time by 34%', recommendation: 'Scale workers + isolate cache' },
    { id: 'INC-9811', title: 'Kubernetes Pod CrashLoopBackOff', date: 'Oct 12, 2023', learned: 'Mapped env var misconfiguration signature to prevent deploy', duration: '45m', optimization: 'Zero downtime on next occurrence', recommendation: 'Auto-rollback deployment' },
    { id: 'INC-9705', title: 'Spike in API 5xx errors (payment gateway)', date: 'Sep 28, 2023', learned: 'Implemented automated circuit breaker at 5% error threshold', duration: '22m', optimization: 'Prevented cascading failure, saved $4k', recommendation: 'Trip circuit breaker immediately' },
  ];

  const allIncidents = metrics.incidents.length > 0 ? metrics.incidents : defaultIncidents;
  
  const filteredIncidents = allIncidents.filter(inc => 
    inc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (inc.learned && inc.learned.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            Memory <Brain className="w-8 h-8 text-[#00F0FF] animate-pulse" />
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Learning Layer / Pattern Recognition
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="SEARCH INCIDENTS..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-xs text-white uppercase tracking-widest font-bold focus:outline-none focus:border-[#00F0FF] transition-colors rounded-none placeholder:text-white/20"
          />
        </div>
      </header>

      <div className="space-y-4">
        {filteredIncidents.map((incident: any, i) => (
          <div key={incident.id || i} className="p-6 bg-white/5 border border-white/10 rounded-sm flex gap-6 hover:border-[#00F0FF]/50 transition-colors group animate-in slide-in-from-right-4 duration-500 fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
            <div className="flex-1 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest mb-2 block">{incident.id}</span>
                  <h3 className="text-xl font-black italic uppercase text-white">{incident.title}</h3>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{incident.date}</span>
                  <p className="text-xs font-bold text-white/60 mt-1 uppercase tracking-widest bg-white/5 px-2 py-1">TTR / {incident.duration}</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="border-l-2 border-[#FF4E00]/50 pl-4 py-1">
                   <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Previous Resolution</span>
                   <p className="text-[11px] text-[#FF4E00]/80 uppercase tracking-wider font-bold leading-relaxed">{incident.recommendation || 'B-Engine scaled workers'}</p>
                 </div>
                 <div className="border-l-2 border-[#00F0FF] pl-4 py-1">
                   <span className="text-[9px] font-bold text-[#00F0FF]/50 uppercase tracking-widest mb-2 block">Learning Output</span>
                   <p className="text-[11px] text-white uppercase tracking-wider font-bold leading-relaxed">{incident.learned}</p>
                 </div>
                 <div className="border-l-2 border-[#8A2BE2] pl-4 py-1">
                   <span className="text-[9px] font-bold text-[#8A2BE2]/50 uppercase tracking-widest mb-2 block">Optimization Applied</span>
                   <p className="text-[11px] text-[#8A2BE2] uppercase tracking-wider font-bold leading-relaxed">{incident.optimization || 'Auto-Rollback Policy Updated'}</p>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
