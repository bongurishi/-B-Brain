import React from "react";
import {
  Eye,
  Server,
  Activity,
  Database,
  Flame,
  CheckCircle2,
} from "lucide-react";

export function ObservabilityPanel() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
          <Eye className="w-6 h-6 text-[#8A2BE2]" />
          Tracing & Metrics
        </h2>
        <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
          OpenTelemetry / Prometheus Verification
        </p>
      </div>

      <div className="bg-[#8A2BE2]/5 border border-[#8A2BE2]/20 p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4 font-mono">
          <h3 className="text-[#8A2BE2] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" /> Prometheus Target Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/10 p-3">
              <div className="text-white/50 text-[10px] uppercase mb-1">
                b-engine /metrics
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs">
                <CheckCircle2 className="w-3 h-3" /> UP (10s scrape)
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 p-3">
              <div className="text-white/50 text-[10px] uppercase mb-1">
                kafka-exporter
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs">
                <CheckCircle2 className="w-3 h-3" /> UP (15s scrape)
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 p-3">
              <div className="text-white/50 text-[10px] uppercase mb-1">
                postgres-exporter
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs">
                <CheckCircle2 className="w-3 h-3" /> UP (15s scrape)
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 p-3">
              <div className="text-white/50 text-[10px] uppercase mb-1">
                kube-state-metrics
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs">
                <CheckCircle2 className="w-3 h-3" /> UP (30s scrape)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-white/10 bg-black p-6">
        <h3 className="text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
          <Flame className="w-4 h-4 text-[#FF4E00]" /> OpenTelemetry Trace
          Propagation
        </h3>

        <div className="space-y-2 font-mono text-[10px]">
          {/* Trace Root */}
          <div className="flex items-center gap-4 bg-white/5 p-2 border-l-2 border-[#00F0FF]">
            <span className="text-white/40 min-w-[80px]">tx-89b2c</span>
            <span className="text-[#00F0FF]">HTTP POST /api/v1/telemetry</span>
            <span className="ml-auto text-white/40">24ms</span>
          </div>
          {/* Subspan 1 */}
          <div className="flex items-center gap-4 bg-white/5 p-2 ml-4 border-l-2 border-[#FF4E00]">
            <span className="text-white/40 min-w-[80px]">sp-11xa</span>
            <span className="text-[#FF4E00]">
              Kafka.Publish (topic: b-brain-events)
            </span>
            <span className="ml-auto text-white/40">4ms</span>
          </div>
          {/* Subspan 2 */}
          <div className="flex items-center gap-4 bg-white/5 p-2 ml-4 border-l-2 border-[#8A2BE2]">
            <span className="text-white/40 min-w-[80px]">sp-12fq</span>
            <span className="text-[#8A2BE2]">
              Temporal.Workflow.Start (PredictAnomaly)
            </span>
            <span className="ml-auto text-white/40">8ms</span>
          </div>
          {/* Sub-Subspan */}
          <div className="flex items-center gap-4 bg-white/10 p-2 ml-8 border-l-2 border-white/40">
            <span className="text-white/40 min-w-[80px]">sp-99bx</span>
            <span className="text-white/80">MLModel.Evaluate (XGBoost)</span>
            <span className="ml-auto text-white/40">11ms</span>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-2 ml-8 border-l-2 border-green-500">
            <span className="text-white/40 min-w-[80px]">sp-88za</span>
            <span className="text-green-500">
              OPA.Evaluate (Policy: scale-guard)
            </span>
            <span className="ml-auto text-white/40">1ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
