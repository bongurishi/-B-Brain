import React, { useEffect, useState } from 'react';
import { Clock, ShieldAlert, Zap, Server, ShieldCheck, Database } from 'lucide-react';
import { format } from 'date-fns';

export function AuditTimeline() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Generate some mock initial events
    const initialEvents = [
      {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'audit',
        timestamp: Date.now() - 5000,
        traceId: 'trace-k8s-001',
        payload: { event: 'Kube Operator Deployed', description: 'B-Brain Agent injected into US-EAST-1 cluster', resource: 'DaemonSet/bbrain-agent' }
      },
      {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        topic: 'incident:resolved',
        timestamp: Date.now() - 15000,
        traceId: 'trace-res-002',
        payload: { title: 'DB Under Load', description: 'Primary DB CPU crossed 80%', resolution: 'Scaled Read Replicas' }
      }
    ];

    setEvents(initialEvents);
    
    let timeAcc = 0;
    const interval = setInterval(() => {
        timeAcc++;
        if (timeAcc % 10 === 0) {
           // Simulate a random new event
           const newEvent = {
             id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
             type: Math.random() > 0.5 ? 'audit' : 'telemetry',
             timestamp: Date.now(),
             traceId: `trace-${Math.random().toString(36).substring(2, 7)}`,
             payload: { 
               event: Math.random() > 0.5 ? 'Policy Evaluation Passed' : 'Health Check OK',
               description: 'Zero-Trust OPA policy allows operation.',
               resource: 'Namespace/production'
             }
           };
           setEvents(prev => [newEvent, ...prev].slice(0, 50));
        }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (event: any) => {
     if (event.type === 'audit') return <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />;
     if (event.payload?.action) return <Zap className="w-4 h-4 text-[#8A2BE2]" />;
     if (event.topic?.includes("incident")) return <ShieldAlert className="w-4 h-4 text-[#FF4E00]" />;
     return <Database className="w-4 h-4 text-white/50" />;
  };

  return (
    <div className="p-6 md:p-12 space-y-8 animate-fade-in pb-24">
      <div className="flex flex-col gap-2">
         <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Orchestration Timeline</h2>
         <p className="text-[#00F0FF] text-sm uppercase tracking-widest font-bold">Distributed Event WAL & Replay Buffer</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col gap-6 relative overflow-hidden">
        {events.length === 0 ? (
          <p className="text-white/50 font-mono text-sm py-4">Awaiting telemetry commits to WAL...</p>
        ) : (
          <div className="space-y-4">
            {events.map((evt, idx) => {
              const ts = evt.timestamp || (evt.payload && evt.payload.timestamp) || Date.now();
              const dateObj = new Date(ts);
              const isAudit = evt.type === 'audit';
              const title = isAudit ? evt.payload?.event : (evt.payload?.title || evt.topic || "Event");
              
              return (
                <div key={`${evt.id}-${idx}`} className="flex gap-4 p-4 border border-white/5 bg-white-[0.02] hover:bg-white/5 transition-colors relative group">
                  <div className="w-16 flex-shrink-0 text-[#00F0FF] font-mono text-[10px] uppercase font-bold tracking-widest pt-1">
                      {format(dateObj, 'HH:mm:ss')}
                  </div>
                  <div className="flex-shrink-0 pt-0.5">
                      {getEventIcon(evt)}
                  </div>
                  <div className="flex-col gap-1 w-full">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold uppercase tracking-widest ${isAudit ? 'text-[#00F0FF]' : 'text-white'}`}>
                               {title}
                            </span>
                            {evt.traceId && (
                                <span className="bg-[#8A2BE2]/10 text-[#8A2BE2] px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider border border-[#8A2BE2]/30" title="OpenTelemetry Trace ID">
                                   Trace: {evt.traceId}
                                </span>
                            )}
                         </div>
                         {evt.id && <span className="text-[9px] text-white/20 font-mono">{evt.id}</span>}
                      </div>

                      <div className="text-xs text-white/50 font-mono mt-2">
                         {evt.payload?.description && <div>{evt.payload.description}</div>}
                         {evt.payload?.resolution && <div className="mt-1 text-[#8A2BE2]">{evt.payload.resolution}</div>}
                         {evt.payload?.action && <div>Action Executed: {evt.payload.action} on {evt.payload.target}</div>}
                         {isAudit && evt.payload?.resource && <div>Resource: {evt.payload.resource}</div>}
                         {evt.payload?.pagerDutyId && <div className="mt-2 text-[9px] text-[#00FF00] border border-[#00FF00]/20 bg-[#00FF00]/5 inline-block px-1.5 py-0.5 rounded">PD Sync: {evt.payload.pagerDutyId}</div>}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
