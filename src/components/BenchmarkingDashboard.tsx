import React from "react";
import {
  Gauge,
  Zap,
  Activity,
  Clock,
  Cpu,
  Server,
  Crosshair,
  ArrowDownToLine,
} from "lucide-react";

export function BenchmarkingDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
            <Gauge className="w-6 h-6 text-[#FF4E00]" />
            Performance & Latency
          </h2>
          <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
            Stress Test Results & Throughput Validation
          </p>
        </div>
        <div className="bg-[#FF4E00]/10 border border-[#FF4E00]/30 px-3 py-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4E00] animate-pulse"></span>
          <span className="font-mono text-[10px] text-[#FF4E00] uppercase font-bold tracking-widest">
            Live k6 Load Injector Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard
          label="Global MTTR"
          value="4.2"
          unit="min"
          trend="-1.5m"
          good={true}
          icon={Clock}
        />
        <MetricCard
          label="Workflow Success"
          value="99.9"
          unit="%"
          trend="+0.1%"
          good={true}
          icon={Activity}
        />
        <MetricCard
          label="False Positives"
          value="0.4"
          unit="%"
          trend="-0.2%"
          good={true}
          icon={Crosshair}
        />
        <MetricCard
          label="Rollback Success"
          value="100"
          unit="%"
          icon={Server}
        />
        <MetricCard
          label="P50 Latency"
          value="12ms"
          trend="-2ms"
          good={true}
          icon={Zap}
        />
        <MetricCard
          label="P99 Latency"
          value="85ms"
          trend="+4ms"
          good={false}
          icon={Gauge}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="border border-white/10 bg-black p-6">
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <Server className="w-4 h-4 text-[#00F0FF]" /> Resource Utilization
            Scale
          </h3>
          <div className="space-y-4 font-mono text-[10px]">
            <div className="flex justify-between items-center text-white/70">
              <span>Active Agent Count</span>
              <span className="text-white font-bold">14,204</span>
            </div>
            <div className="w-full bg-white/5 h-1">
              <div className="bg-[#00F0FF] h-1 w-[80%]"></div>
            </div>

            <div className="flex justify-between items-center text-white/70 mt-4">
              <span>Queue Depth (Kafka)</span>
              <span className="text-white font-bold">142 msgs</span>
            </div>
            <div className="w-full bg-white/5 h-1">
              <div className="bg-green-500 h-1 w-[5%]"></div>
            </div>

            <div className="flex justify-between items-center text-white/70 mt-4">
              <span>Memory Pressure</span>
              <span className="text-white font-bold">4.2 GB / 64 GB</span>
            </div>
            <div className="w-full bg-white/5 h-1">
              <div className="bg-[#00F0FF] h-1 w-[15%]"></div>
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-black p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
            <Crosshair className="w-4 h-4 text-[#FF4E00]" /> HPA Latency Under
            Stress
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="flex bg-white/5 border border-white/10 p-3 items-center justify-between font-mono text-xs text-white/80">
              <span>Detect Anomaly</span>
              <span className="text-[#FF4E00]">120ms</span>
            </div>
            <div className="flex justify-center">
              <ArrowDownToLine className="w-4 h-4 text-white/20" />
            </div>
            <div className="flex bg-white/5 border border-white/10 p-3 items-center justify-between font-mono text-xs text-white/80">
              <span>Temporal Workflow Init</span>
              <span className="text-[#FF4E00]">45ms</span>
            </div>
            <div className="flex justify-center">
              <ArrowDownToLine className="w-4 h-4 text-white/20" />
            </div>
            <div className="flex bg-white/5 border border-white/10 p-3 items-center justify-between font-mono text-xs text-white/80">
              <span>K8s CRD Update (Patch)</span>
              <span className="text-[#FF4E00]">80ms</span>
            </div>
            <div className="flex justify-center">
              <ArrowDownToLine className="w-4 h-4 text-white/20" />
            </div>
            <div className="flex bg-[#FF4E00]/20 border border-[#FF4E00]/50 p-3 items-center justify-between font-mono text-xs text-white">
              <span className="font-bold">Total Recovery Time (MTTR)</span>
              <span className="text-[#00F0FF] font-bold">245ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, unit, trend, good, icon: Icon }: any) {
  return (
    <div className="border border-white/10 bg-black p-4 flex flex-col justify-between h-32 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      <div className="text-white/50 font-mono text-[10px] uppercase tracking-widest relative z-10">
        {label}
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="text-2xl md:text-4xl font-black tracking-tighter text-white">
          {value}
        </span>
        {unit && (
          <span className="text-white/40 font-mono text-xs">{unit}</span>
        )}
      </div>
      {trend && (
        <div
          className={`font-mono text-[10px] flex items-center gap-1 ${good ? "text-green-500" : "text-[#FF4E00]"} relative z-10`}
        >
          {good ? "↓" : "↑"} {trend} vs Last Hour
        </div>
      )}
    </div>
  );
}
