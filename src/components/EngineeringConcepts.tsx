import React from "react";
import {
  BookOpen,
  Database,
  ShieldCheck,
  PlayCircle,
  GitCommit,
  Settings2,
  GitPullRequest,
} from "lucide-react";

export function EngineeringConcepts() {
  return (
    <div className="p-4 md:p-8 space-y-6 overflow-y-auto h-full">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#00F0FF]" />
          Engineering Fundamentals
        </h2>
        <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
          Distributed Systems Rationale & Core Principles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard
          title="Why Raft Consensus?"
          icon={<GitCommit />}
          color="text-[#00F0FF]"
          border="border-[#00F0FF]/30"
          bg="bg-[#00F0FF]/5"
        >
          Raft ensures fault-tolerant state machine replication. In B-Brain,
          when the Temporal cluster scales, leadership election and
          configuration changes must be deterministic. Without Raft, split-brain
          scenarios during network partitions would cause catastrophic
          dual-remediations.
        </ConceptCard>

        <ConceptCard
          title="Why OPA & Zero-Trust?"
          icon={<ShieldCheck />}
          color="text-green-500"
          border="border-green-500/30"
          bg="bg-green-500/5"
        >
          Agents cannot be inherently trusted. They hallucinate and make
          aggressive decisions. OPA (Open Policy Agent) decouples policy from
          code, acting as an immutable gatekeeper. If an agent tries to scale
          beyond budget or terminate a protected namespace, OPA denies it
          asynchronously.
        </ConceptCard>

        <ConceptCard
          title="Why Event Replayability?"
          icon={<PlayCircle />}
          color="text-[#FF4E00]"
          border="border-[#FF4E00]/30"
          bg="bg-[#FF4E00]/5"
        >
          When an outage occurs, post-mortems map what happened. Kafka stores an
          immutable Write-Ahead Log (WAL) of every metric, AI prediction, and
          remediation command. We can rewind the system state to T-00:00 and
          analyze exactly what data the agent saw and why it decided to act.
        </ConceptCard>

        <ConceptCard
          title="Why Orchestration Durability?"
          icon={<Database />}
          color="text-[#8A2BE2]"
          border="border-[#8A2BE2]/30"
          bg="bg-[#8A2BE2]/5"
        >
          A remediation workflow involves multiple steps: cordon node, drain
          pods, verify state, spin up new node. If the orchestrator pod crashes
          mid-execution, memory-based queues lose state. Temporal ensures that
          upon restart, the workflow resumes exactly at the failed step,
          ensuring state integrity.
        </ConceptCard>

        <ConceptCard
          title="Exactly-Once Processing"
          icon={<Settings2 />}
          color="text-yellow-500"
          border="border-yellow-500/30"
          bg="bg-yellow-500/5"
        >
          Idempotent remediation is critical. An agent must not execute scale
          operations twice due to a network retry. Temporal and Kafka consumer
          semantics guarantee exactly-once execution of side-effects. Retries
          only happen if the operation explicitly failed, protecting K8s from
          race conditions.
        </ConceptCard>

        <ConceptCard
          title="Backpressure Control"
          icon={<GitPullRequest />}
          color="text-pink-500"
          border="border-pink-500/30"
          bg="bg-pink-500/5"
        >
          During massive outages, millions of telemetry events flood the ML
          predictors. Kafka buffers these bursts. Instead of the ML engine
          crashing under OOM constraints, it pulls data at its max throughput.
          The system degrades latency gracefully rather than suffering total
          availability loss.
        </ConceptCard>
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <h3 className="text-xl font-black italic uppercase text-white mb-4">
          Open Source & Documentation
        </h3>
        <div className="flex flex-wrap gap-4 font-mono text-xs">
          <a
            href="#"
            className="border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            GitHub Repository
          </a>
          <a
            href="#"
            className="border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            Architecture Docs
          </a>
          <a
            href="#"
            className="border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            Deployment Runbooks
          </a>
          <a
            href="#"
            className="border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            Demo Videos
          </a>
        </div>
        <p className="mt-4 text-white/40 font-mono text-xs">
          B-Brain is designed to be public standard for autonomous operations.
          Documentation is hosted via Docusaurus and all k8s manifests are
          available under /deployments.
        </p>
      </div>
    </div>
  );
}

function ConceptCard({ title, children, icon, color, border, bg }: any) {
  return (
    <div
      className={`p-6 border ${border} ${bg} relative group hover:-translate-y-1 transition-transform`}
    >
      <div className={`mb-4 ${color}`}>
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-8 h-8",
        })}
      </div>
      <h3
        className={`font-mono text-xs uppercase tracking-widest font-bold mb-3 ${color}`}
      >
        {title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed font-mono">
        {children}
      </p>
    </div>
  );
}
