import React from "react";
import { ShieldCheck, Lock, AlertOctagon, FileCode2 } from "lucide-react";

export function SecurityGovernance() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-500" />
          OPA Governance
        </h2>
        <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
          Zero-Trust Agent Action Verification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Policy Metrics */}
        <div className="col-span-1 space-y-4 font-mono">
          <div className="bg-black border border-white/10 p-4 flex justify-between items-center">
            <span className="text-white/50 text-[10px] uppercase tracking-widest">
              Policies Loaded
            </span>
            <span className="text-white font-bold">14</span>
          </div>
          <div className="bg-black border border-white/10 p-4 flex justify-between items-center">
            <span className="text-white/50 text-[10px] uppercase tracking-widest">
              Evaluations / hr
            </span>
            <span className="text-white font-bold">142,504</span>
          </div>
          <div className="bg-[#FF4E00]/5 border border-[#FF4E00]/30 p-4 flex justify-between items-center">
            <span className="text-[#FF4E00] text-[10px] uppercase tracking-widest">
              Rejected Actions / hr
            </span>
            <span className="text-[#FF4E00] font-bold">12</span>
          </div>
        </div>

        {/* Example Policy View */}
        <div className="col-span-2 bg-black border border-white/10 flex flex-col">
          <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
            <FileCode2 className="w-4 h-4 text-white/50" />
            <span className="font-mono text-xs text-white/80 uppercase">
              scale-limits.rego
            </span>
          </div>
          <div className="p-4 font-mono text-[10px] text-green-400 overflow-x-auto">
            <pre>
              {`package bbrain.remediation.scale

default allow = false

# Allow scaling up to 10 replicas
allow {
    input.action == "scale_deployment"
    input.parameters.replicas <= 10
}

# Deny scale down below 2 during business hours
deny[msg] {
    input.action == "scale_deployment"
    input.parameters.replicas < 2
    time.clock([hour, minute, second])
    hour >= 9
    hour <= 17
    msg := "Cannot scale below 2 replicas during business hours."
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-white/10 bg-black">
        <div className="bg-white/5 p-3 border-b border-white/10 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-[#FF4E00]" />
          <span className="font-mono text-xs text-white/80 uppercase">
            Recent Policy Violations
          </span>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 text-white/50 uppercase tracking-widest">
                <th className="p-3">Time</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Action Intent</th>
                <th className="p-3">Policy Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-3 text-white/40">14:22:01</td>
                <td className="p-3 text-white/80">Remediation-Agent-Phi</td>
                <td className="p-3 text-white">Restart production-db</td>
                <td className="p-3 text-[#FF4E00]">
                  DENIED: Action requires human approval
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-3 text-white/40">11:05:14</td>
                <td className="p-3 text-white/80">Remediation-Agent-Alpha</td>
                <td className="p-3 text-white">Scale frontend to 50</td>
                <td className="p-3 text-[#FF4E00]">
                  DENIED: Exceeds max_replicas=10
                </td>
              </tr>
              <tr>
                <td className="p-3 text-white/40">09:12:44</td>
                <td className="p-3 text-white/80">FinOps-Agent</td>
                <td className="p-3 text-white">Delete inactive S3 bucket</td>
                <td className="p-3 text-[#FF4E00]">
                  DENIED: Bucket holds required compliance logs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
