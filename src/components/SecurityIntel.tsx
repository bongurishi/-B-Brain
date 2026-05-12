import React from 'react';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, Activity } from 'lucide-react';

export function SecurityIntel() {
  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] italic uppercase">
            Security Intel
          </h2>
          <p className="text-white/40 mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Enterprise Threat Architecture
          </p>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0">
          <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold mb-1">Threat Level</p>
          <p className="text-4xl font-black text-[#FF4E00] italic">ELEVATED</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 border border-[#FF4E00]/30 bg-[#FF4E00]/10 rounded-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-4 text-[#FF4E00]">Active Interventions</span>
          <div className="text-5xl font-black tracking-tighter text-[#FF4E00] italic mb-2">03</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
            BLOCKED IN LAST 24H
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Fingerprint className="w-24 h-24 text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-4 text-white/50">Identity & Auth</span>
          <div className="text-5xl font-black tracking-tighter text-white italic mb-2">99.2%</div>
          <div className="text-[10px] text-[#00F0FF] uppercase tracking-wider font-bold">
            SUCCESSFUL VERIFICATIONS
          </div>
        </div>
        <div className="p-6 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10">
            <ShieldCheck className="w-24 h-24 text-[#00F0FF]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest block mb-4 text-[#00F0FF]">Perimeter Defense</span>
          <div className="text-5xl font-black tracking-tighter text-[#00F0FF] italic mb-2">ACTIVE</div>
          <div className="text-[10px] text-[#00F0FF]/70 uppercase tracking-wider font-bold">
            WAF & RATE LIMITING ONLINE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-sm flex flex-col">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF4E00] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Anomalous Activity Timeline
            </h3>
          </div>
          <div className="flex-1 p-0">
            {[
              { type: 'SUSPICIOUS TRAFFIC', desc: 'DDoS attempt detected from 14 IP segments.', target: 'us-east-1 load balancer', time: '10:42 AM', action: 'AUTOBANNED BY B-DECIDE' },
              { type: 'UNAUTHORIZED ACCESS', desc: 'Multiple failed Root logins.', target: 'DB_ANALYTICS_REPLICA', time: '08:15 AM', action: 'IP RATE LIMITED' },
              { type: 'GEOLOCATION ANOMALY', desc: 'Admin login attempt from unknown country.', target: 'Admin Service', time: '02:30 AM', action: 'MFA CHALLENGE ISSUED' },
            ].map((alert, i) => (
              <div key={i} className="p-5 border-b border-white/10 hover:bg-white/10 transition-colors flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#FF4E00]" />
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-white tracking-widest uppercase">{alert.type}</p>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{alert.time}</span>
                  </div>
                  <p className="text-xs text-white/50 mt-2">{alert.desc}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">TARGET: {alert.target}</p>
                  
                  <div className="mt-4 p-2 bg-[#FF4E00]/10 border border-[#FF4E00]/30 text-[9px] font-bold tracking-widest text-[#FF4E00] uppercase inline-block">
                    {alert.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
           <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-white">Live Traffic Analysis</span>
            <Activity className="w-4 h-4 text-[#00F0FF]" />
          </div>
          
          <div className="space-y-6 font-mono text-xs text-white/60">
             <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">HTTP_REQUESTS_SEC</span>
              <span className="text-[#00F0FF] font-bold">14,204</span>
            </div>
             <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">MALFORMED_PACKETS</span>
              <span className="text-white">12</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">WAF_BLOCKS_SEC</span>
              <span className="text-white">4</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">CURRENT_VULN_SCAN</span>
              <span className="text-[#00F0FF]">RUNNING (42%)</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 border border-white/10 border-l-[#00F0FF] border-l-4 bg-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Causal Intelligence Insight</p>
            <p className="text-xs italic leading-relaxed text-white">"Repeated failed logins on DB_ANALYTICS combined with a minor load spike usually indicates a credential stuffing attack. Auto-defense perimeter engaged."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
