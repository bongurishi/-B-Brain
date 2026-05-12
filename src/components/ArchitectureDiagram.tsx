import { Network } from "lucide-react";

export function ArchitectureDiagram() {
  return (
    <div className="p-4 md:p-8 h-full flex flex-col">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
          <Network className="w-6 h-6 text-[#00F0FF]" />
          Platform Architecture
        </h2>
        <p className="text-white/50 font-mono text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
          <span>Production Infrastructure Topology</span>
          <span className="text-[#00F0FF]">/// B-Brain Control Plane</span>
        </p>
      </div>

      <div className="flex-1 border border-white/10 bg-black/50 p-8 flex items-center justify-center overflow-x-auto">
        <div className="min-w-[800px] flex flex-col items-center gap-8 font-mono text-xs">
          {/* Top Layer */}
          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="border border-[#00F0FF]/30 bg-[#00F0FF]/5 p-4 text-center text-[#00F0FF] uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              Agent Layer
              <div className="text-[9px] text-white/50 mt-2">
                B-Tasks, Copilot
              </div>
            </div>
            <div className="border border-[#FF4E00]/30 bg-[#FF4E00]/5 p-4 text-center text-[#FF4E00] uppercase tracking-widest shadow-[0_0_15px_rgba(255,78,0,0.1)]">
              ML Predictor
              <div className="text-[9px] text-white/50 mt-2">
                Anomaly Detection
              </div>
            </div>
            <div className="border border-[#8A2BE2]/30 bg-[#8A2BE2]/5 p-4 text-center text-[#8A2BE2] uppercase tracking-widest shadow-[0_0_15px_rgba(138,43,226,0.1)]">
              Decision Engine
              <div className="text-[9px] text-white/50 mt-2">
                Remediation Planner
              </div>
            </div>
          </div>

          {/* Down Arrows */}
          <div className="grid grid-cols-3 gap-8 w-full text-center text-white/20">
            <div>↓ Processed Actions</div>
            <div>↓ Forecasts</div>
            <div>↓ Escalations</div>
          </div>

          {/* Core Middleware */}
          <div className="w-3/4 border border-white/20 bg-black p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] via-[#FF4E00] to-[#8A2BE2]"></div>
            <h3 className="text-center text-white font-bold uppercase tracking-widest mb-4">
              Central Nervous System
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-3 text-center text-white/80">
                <span className="text-[#FF4E00] font-bold block mb-1">
                  Temporal Workflow
                </span>
                <span className="text-[9px] text-white/40">
                  Orchestration & State
                </span>
              </div>
              <div className="border border-white/10 p-3 text-center text-white/80">
                <span className="text-[#00F0FF] font-bold block mb-1">
                  Kafka Event Bus
                </span>
                <span className="text-[9px] text-white/40">
                  Telemetry & Sync WAL
                </span>
              </div>
            </div>
            <div className="mt-4 border border-white/10 p-3 text-center text-white/80">
              <span className="text-green-500 font-bold block mb-1">
                OPA Governance
              </span>
              <span className="text-[9px] text-white/40">
                Policy Gatekeeper (Zero-Trust)
              </span>
            </div>
          </div>

          {/* Down Arrows */}
          <div className="grid grid-cols-3 gap-8 w-full text-center text-white/20">
            <div>↓ Metrics</div>
            <div>↓ Actuation</div>
            <div>↓ State Sync</div>
          </div>

          {/* Infrastructure Exec */}
          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="border border-white/20 bg-white/5 p-4 text-center text-white uppercase tracking-widest">
              Observability
              <div className="text-[9px] text-white/50 mt-2">
                Prometheus/Grafana
              </div>
            </div>
            <div className="border border-green-500/30 bg-green-500/5 p-4 text-center text-green-500 uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              Kubernetes Executor
              <div className="text-[9px] text-white/50 mt-2">
                K8s Operator CRDs
              </div>
            </div>
            <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 text-center text-yellow-500 uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              Persistent Storage
              <div className="text-[9px] text-white/50 mt-2">
                PostgreSQL + TSDB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
