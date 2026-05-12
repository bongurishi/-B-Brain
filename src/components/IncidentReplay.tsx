import React, { useState } from "react";
import {
  PlayCircle,
  FastForward,
  Rewind,
  AlertTriangle,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export function IncidentReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div className="p-4 md:p-8 flex flex-col h-full space-y-6">
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
            <PlayCircle className="w-6 h-6 text-[#00F0FF]" />
            Incident Replay
          </h2>
          <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
            Post-Mortem & System Execution Verification
          </p>
        </div>
        <div className="bg-black border border-white/20 p-2 flex gap-4">
          <button className="text-white/50 hover:text-white">
            <Rewind className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`${isPlaying ? "text-[#00F0FF]" : "text-white"}`}
          >
            <PlayCircle className="w-5 h-5" />
          </button>
          <button className="text-white/50 hover:text-white">
            <FastForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black border border-white/10 h-8 relative flex items-center px-2 cursor-pointer">
        <div
          className="absolute top-0 left-0 h-full bg-[#00F0FF]/20"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"
          style={{ left: `${progress}%` }}
        ></div>

        <div className="w-full flex justify-between relative z-10 text-[9px] font-mono text-white/50 px-2 pointer-events-none">
          <span>T-00:00 (Load Spike)</span>
          <span>T-00:15 (Anomaly Detected)</span>
          <span>T-00:22 (Policy Enforced)</span>
          <span>T-00:35 (Recovered)</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
        <div className="border border-white/10 bg-black flex flex-col overflow-hidden">
          <div className="bg-white/5 p-3 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-[#FF4E00] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> CPU Metric Replay
          </div>
          <div className="flex-1 p-4 flex flex-col justify-end gap-2 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            {/* Mock Graph Lines */}
            <div className="flex items-end gap-1 h-32 relative z-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i > 15 && i < 25 ? "bg-[#FF4E00]" : "bg-[#00F0FF]/50"}`}
                  style={{
                    height: `${i > 15 && i < 25 ? 80 + Math.random() * 20 : 30 + Math.random() * 10}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-black flex flex-col overflow-hidden">
          <div className="bg-white/5 p-3 border-b border-white/10 font-mono text-xs uppercase tracking-widest text-green-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Orchestrator WAL Log
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] space-y-3">
            <div className="text-white/40">
              14:02:11.000 - [KAFKA] Ingesting load spike...
            </div>
            <div className="text-white/40">
              14:02:15.120 - [PREDICTOR] Confidence 98% anomaly.
            </div>
            <div className="text-white">
              14:02:15.200 - [ORCHESTRATOR] Initializing Remediation...
            </div>
            <div className="text-yellow-500">
              14:02:15.250 - [OPA] Validating Scale Policy. Approved (Max 10).
            </div>
            <div className="text-[#00F0FF] font-bold">
              14:02:15.800 - [K8S_OPERATOR] Patching Deployment
              `frontend-service` replicas 3 {"->"} 6
            </div>
            <div className="text-green-500 mt-4">
              14:02:35.100 - [SYSTEM] CPU Stabilized at 42%. Incident closed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
