import React from "react";
import {
  Terminal,
  Copy,
  Key,
  Server,
  Activity,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export function ConnectionGuide() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#0a0a0a]">
      <header className="p-4 md:p-8 border-b border-white/10 shrink-0 bg-[#050505] sticky top-0 z-10">
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-[#00F0FF]" /> Connection Guide
        </h2>
        <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
          Deploying B-Brain to true production infrastructure
        </p>
      </header>

      <div className="p-4 md:p-8 space-y-12 max-w-5xl mx-auto w-full">
        <section className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Server className="w-5 h-5 text-[#00F0FF]" /> 1. Kubernetes &
              Infrastructure
            </h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-widest">
              B-Brain is designed to run in-cluster as a powerful operator. By
              default, out-of-cluster execution falls back to the MOCK API.
            </p>
            <div className="bg-black/50 border border-white/5 p-4 mt-4 text-xs font-mono text-white/50 space-y-2">
              <p className="text-[#00F0FF] uppercase font-bold tracking-widest">
                Requirements:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>B-Brain Service Account attached to the deployment.</li>
                <li>
                  RBAC ClusterRole enabling{" "}
                  <code className="text-green-400 bg-white/10 px-1 py-0.5">
                    pods, deployments, replicasets, services (GET, LIST, PATCH,
                    UPDATE)
                  </code>
                  .
                </li>
                <li>
                  If running locally (out-of-cluster), bind{" "}
                  <code className="text-white bg-white/10 px-1 py-0.5">
                    KUBECONFIG=~/.kube/config
                  </code>{" "}
                  before starting the server.
                </li>
              </ul>
            </div>
            <div className="bg-black border border-white/20 p-4 relative font-mono text-[10px] text-green-400">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00F0FF]"></div>
              <p className="text-white/40 mb-2">// Apply RBAC permissions</p>
              <p>kubectl apply -f k8s/b-brain-rbac.yaml</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#FF4E00]" /> 2. Observability &
              Telemetry (Prometheus)
            </h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-widest">
              The AI requires high-fidelity, high-frequency metrics to make
              decisions. Provide the Prometheus HTTP endpoint via environment
              variables.
            </p>
            <div className="bg-black border border-white/20 p-4 relative font-mono text-[10px] text-[#FF4E00]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF4E00]"></div>
              <p className="text-white/40 mb-2">
                # Add this to your root .env file
              </p>
              <p>
                PROMETHEUS_URL=http://prometheus-server.monitoring.svc.cluster.local:9090
              </p>
            </div>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4">
              B-Brain will query metrics such as{" "}
              <code className="text-white">
                container_cpu_usage_seconds_total
              </code>{" "}
              and{" "}
              <code className="text-white">
                kafka_server_brokertopicmetrics_messagesin_total
              </code>
              .
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Key className="w-5 h-5 text-[#8A2BE2]" /> 3. Inference Engine
              (OpenAI / Anthropic)
            </h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-widest">
              The `B-Predictor` and `B-Decide` agents require an advanced LLM
              backend to process incident context and apply reasoning. Provide
              an API key on the "Providers" page or via environment variables.
            </p>
            <div className="bg-black border border-white/20 p-4 relative font-mono text-[10px] text-[#8A2BE2]">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#8A2BE2]"></div>
              <p className="text-white/40 mb-2">
                # B-Brain uses the Gemini 1.5 Pro inference engine by default if
                in AI Studio, but supports any provider.
              </p>
              <p>OPENAI_API_KEY=sk-proj-xyz...</p>
              <p>ANTHROPIC_API_KEY=sk-ant-api03-xyz...</p>
            </div>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4 border-l-2 border-[#8A2BE2]/50 pl-3">
              Note: When API keys are missing, the system falls back to the
              deterministic local engine which returns mock inference data for
              UI demo purposes.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <Terminal className="w-5 h-5 text-white" /> 4. Temporal & Event
              Workflows
            </h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-widest">
              To guarantee exactly-once execution of complex failure recovery
              paths, configure Temporal orchestration.
            </p>
            <div className="bg-black border border-white/20 p-4 relative font-mono text-[10px] text-white">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white"></div>
              <p>
                TEMPORAL_HOST=temporal-frontend.temporal.svc.cluster.local:7233
              </p>
              <p>TEMPORAL_NAMESPACE=bbrain_ops</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
