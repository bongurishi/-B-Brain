import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  MoveRight,
  Mic,
  ShieldCheck,
  Activity,
  Brain,
  Server,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  Terminal,
} from "lucide-react";

export function Copilot() {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<any[]>([
    {
      role: "system",
      content:
        "Ready. Ingesting Real-Time Context: 14 Active Services, 4.2k RPS, 1 Active Anomaly.",
      type: "status",
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, executionLogs]);

  const handleSubmit = (text: string) => {
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, type: "message" },
    ]);
    setInput("");

    setTimeout(() => {
      if (text.toLowerCase().includes("opa")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bbrain",
            type: "message",
            content:
              "OPA Policy ID `scale-limits.rego` strict-blocked Action ID `action-1992`. Reason: Scaling instances from 3 -> 12 exceeds the maximum allowed peak scale delta (+5) for environment `production` during unapproved maintenance windows.",
          },
        ]);
      } else if (text.toLowerCase().includes("latency") || text.toLowerCase().includes("why")) {
          setMessages((prev) => [
            ...prev,
            {
               role: "bbrain",
               content: "Multi-Agent Synthesis in Progress...",
               type: "debate",
               agents: [
                  { name: "FinOps Agent", opinion: "Scaling auth-service now will increase hourly burn rate by $1.15.", color: "text-green-400" },
                  { name: "Reliability Agent", opinion: "Downtime risk is critical. Primary DB load is at 94%. Immediate caching required.", color: "text-[#00F0FF]" },
                  { name: "Security Agent", opinion: "Traffic origin includes 3 suspicious IPs. Recommend applying network isolation before scaling.", color: "text-purple-400" }
               ]
            },
            {
              role: "bbrain",
              content: "Executing Observability Correlation...",
              type: "insight",
              insights: [
                {
                  time: "T-05:12",
                  msg: "CPU spiked to 94% on auth-service-pod-x89",
                  icon: <Cpu className="w-3 h-3 text-[#FF4E00]" />,
                },
                {
                  time: "T-05:14",
                  msg: "Kafka lag increased by 340% (topic: auth-events)",
                  icon: <Activity className="w-3 h-3 text-[#FF4E00]" />,
                },
                {
                  time: "T-05:18",
                  msg: "API Gateway reported P99 latency > 2000ms",
                  icon: <Server className="w-3 h-3 text-[#FF4E00]" />,
                },
              ],
            },
            {
              role: "bbrain",
              content:
                "Reason: Memory slope matched historical OOM signature from 14 days ago. Caching mechanism failed, sending 900+ queries/sec directly to the database.\n\nConfidence: 96%\n\nRecommended Action: Scale `auth-service` replicas from 3 -> 6.",
              type: "action",
              confidence: 96,
              action: "SCALE_REPLICAS",
              target: "deployment/auth-service",
              rollback: "Scale down to 3 if CPU < 40% for 5m",
              id: "action-1",
            },
          ]);
      } else if (text.toLowerCase().includes("memory")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bbrain",
            type: "insight",
            content: "Memory profiling complete across 142 nodes.",
            insights: [
              {
                time: "T-00:00",
                msg: "Node alpha-9 has 6GB leak (+100MB/min) in payment-processor.",
                icon: <Activity className="w-3 h-3 text-[#FF4E00]" />,
              },
              {
                time: "T-00:00",
                msg: "Node beta-1 has 2GB leak (+30MB/min) in event-bus.",
                icon: <Activity className="w-3 h-3 text-[#FF4E00]" />,
              },
            ],
          },
        ]);
      } else if (text.toLowerCase().includes("replay")) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bbrain",
            type: "action",
            content: "Initiating interactive incident replay for 14:00 outage.",
            confidence: 100,
            action: "MOUNT_REPLAY_ENV",
            target: "namespace: incident-122",
            rollback: "Discard ephemeral cluster when session closes.",
            id: "action-replay",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bbrain",
            type: "debate",
            content: "Multi-Agent Synthesis triggered for unknown issue.",
            agents: [
              {
                name: "Predictor Agent",
                opinion:
                  "No anomalous conditions detected matching the prompt.",
                color: "text-[#00F0FF]",
              },
              {
                name: "Reliability Agent",
                opinion: "All active services are running within SLA bounds.",
                color: "text-green-400",
              },
            ],
          },
        ]);
      }
    }, 1500);
  };

  const handleExecute = async (actionId: string, target?: string, actionStr?: string) => {
    setExecuting(true);
    setExecutionLogs([
      `[SYSTEM] Initiating Temporal Workflow: RECOVER_INCIDENT`,
    ]);

    const isScaleNode = actionStr?.includes("SCALE");
    const deploymentName = target?.replace("deployment/", "") || "auth-service";

    const logs = [
      "[KUBERNETES] Connecting to API Server...",
      "[OPA] Validating execution payload... APPROVED",
      `[KUBERNETES] Executing: kubectl scale deployment ${deploymentName} --replicas=6`,
      "[KUBERNETES] Scaling operation requested...",
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += 600 + Math.random() * 800;
      setTimeout(() => {
        setExecutionLogs((prev) => [...prev, log]);
        
        // At the end of logging setup, we actually hit the API
        if (index === logs.length - 1) {
          setTimeout(() => {
            setExecutionLogs((prev) => [...prev, 
              `[KUBERNETES] Mode: Simulated Local (Kubernetes not bound)`,
              `[PROMETHEUS] Streaming telemetry...`,
              `[PROMETHEUS] CPU stabilized at 41%.`,
              `[KAFKA] Lag recovered.`,
              `[SYSTEM] Action completed successfully. Trace ID: TRC-99X-Z1.`
            ]);
            setTimeout(() => {
              setExecuting(false);
              setMessages((prev) => [
                ...prev.filter((m) => m.id !== actionId),
                {
                  role: "bbrain",
                  type: "audit",
                  content: "Execution Successful. Telemetry nominal.",
                  traceId: "TRC-99X-Z1",
                  action: "SCALE_REPLICAS",
                  target: `deployment/${deploymentName}`,
                  result: "Success / Replica == 6",
                },
              ]);
            }, 1000);
          }, 1500);
        }
      }, delay);
    });
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 bg-[#050505] p-0 md:p-4 max-w-7xl mx-auto w-full pb-10">
      <header className="p-4 md:p-8 border-b border-white/10 shrink-0 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-xl md:text-4xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            Infra Ops Commander{" "}
            <Mic
              className={`w-6 h-6 md:w-8 md:h-8 ${isListening ? "text-[#FF4E00] animate-pulse" : "text-white/20"}`}
            />
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Conversational Orchestration / Human-Supervised Autonomy
          </p>
        </div>
        <div className="flex bg-white/5 border border-white/10 p-1 font-mono text-[9px] uppercase tracking-widest text-white/50">
          <button className="px-3 py-1 bg-[#8A2BE2]/20 text-[#8A2BE2] font-bold border border-[#8A2BE2]/50">
            Recommend Only
          </button>
          <button className="px-3 py-1 hover:text-white transition-colors">
            Require Approval
          </button>
          <button className="px-3 py-1 hover:text-white transition-colors">
            Fully Autonomous
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 min-h-0">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`animate-in fade-in slide-in-from-bottom-2 ${m.role === "user" ? "flex justify-end gap-4" : "flex gap-4"}`}
          >
            {m.role !== "user" && (
              <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0 text-black font-black text-xl italic uppercase shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                B
              </div>
            )}

            <div
              className={`max-w-2xl font-mono relative p-5 ${m.role === "user" ? "bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-sm uppercase tracking-wide" : "bg-white/5 border border-white/10 text-sm text-white"}`}
            >
              {m.role !== "user" && (
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 ${m.type === "status" ? "bg-[#8A2BE2]" : m.type === "action" ? "bg-[#FF4E00]" : "bg-[#00F0FF]"}`}
                ></div>
              )}

              {m.type === "status" && (
                <div className="text-white/50 text-xs uppercase tracking-widest">
                  {m.content}
                </div>
              )}

              {m.type === "message" && <div>{m.content}</div>}

              {m.type === "debate" && (
                <div>
                  <p className="mb-4 text-[#8A2BE2] text-xs font-bold uppercase tracking-widest bg-[#8A2BE2]/10 inline-block px-2 py-1">
                    {m.content}
                  </p>
                  <div className="space-y-2 mt-2">
                    {m.agents?.map((agent: any, i: number) => (
                      <div
                        key={i}
                        className="flex gap-3 text-[10px] bg-black/50 border border-white/5 p-3"
                      >
                        <div
                          className={`font-bold tracking-widest uppercase shrink-0 w-32 ${agent.color}`}
                        >
                          {agent.name}
                        </div>
                        <div className="text-white/70 italic border-l border-white/10 pl-3 leading-relaxed">
                          {agent.opinion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {m.type === "insight" && (
                <div>
                  <p className="mb-4 text-[#00F0FF] text-xs font-bold uppercase tracking-widest">
                    {m.content}
                  </p>
                  <div className="space-y-3">
                    {m.insights?.map((ins: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-xs bg-black/50 border border-white/5 p-2 transition-transform hover:translate-x-1 cursor-default"
                      >
                        <div className="p-1 bg-white/5">{ins.icon}</div>
                        <span className="text-white/40 min-w-[50px]">
                          {ins.time}
                        </span>
                        <span className="text-white/80">{ins.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {m.type === "action" && (
                <div>
                  <div className="mb-4 whitespace-pre-wrap text-white/80 leading-relaxed text-xs">
                    {m.content}
                  </div>
                  <div className="bg-black/50 border border-white/10 p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[#FF4E00] uppercase text-[10px] tracking-widest font-bold">
                        Recommended Action
                      </span>
                      <span className="bg-[#FF4E00]/20 text-[#FF4E00] px-2 py-0.5 text-[10px] font-bold border border-[#FF4E00]/50">
                        {m.action}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                      <div>
                        <span className="text-white/40 uppercase block mb-1">
                          Target Resource
                        </span>
                        <span className="text-white font-bold">{m.target}</span>
                      </div>
                      <div>
                        <span className="text-white/40 uppercase block mb-1">
                          Impact Confidence
                        </span>
                        <span className="text-green-500 font-bold">
                          {m.confidence}%
                        </span>
                      </div>
                      <div className="col-span-2 mt-2">
                        <span className="text-white/40 uppercase block mb-1">
                          Rollback Plan
                        </span>
                        <span className="text-white/80">{m.rollback}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-[9px] text-[#FF4E00]">
                      <ShieldAlert className="w-3 h-3" />
                      OPA Governance: Action complies with `scale-limits.rego`
                      policy constraints.
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => m.id && handleExecute(m.id, m.target, m.action)}
                      disabled={executing}
                      className="flex-1 bg-[#FF4E00]/10 border border-[#FF4E00] text-[#FF4E00] py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-[#FF4E00]/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      Approve & Execute
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/20 text-white/60 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all hover:text-white">
                      Decline Action
                    </button>
                  </div>
                </div>
              )}

              {m.type === "audit" && (
                <div>
                  <div className="flex items-center gap-3 mb-4 text-[#00F0FF]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {m.content}
                    </span>
                  </div>
                  <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/30 p-4 grid grid-cols-2 gap-4 text-[10px]">
                    <div>
                      <span className="block text-white/40 uppercase mb-1">
                        Action Trace ID
                      </span>
                      <span className="font-mono text-white tracking-widest">
                        {m.traceId}
                      </span>
                    </div>
                    <div>
                      <span className="block text-white/40 uppercase mb-1">
                        Execution Status
                      </span>
                      <span className="font-mono text-green-400 tracking-widest">
                        {m.result}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {m.role === "user" && (
              <div className="w-10 h-10 border border-[#00F0FF]/30 bg-[#00F0FF]/10 flex items-center justify-center shrink-0 text-[#00F0FF] font-black text-xs uppercase tracking-widest">
                OP
              </div>
            )}
          </div>
        ))}

        {executing && (
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 border border-[#FF4E00]/50 bg-[#FF4E00]/10 flex items-center justify-center shrink-0 text-[#FF4E00] font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,78,0,0.5)]">
              <Terminal className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-black border border-[#FF4E00]/30 text-sm max-w-2xl w-full p-4 font-mono text-[10px] text-green-400/80 leading-loose flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4E00] to-transparent animate-pulse"></div>
              {executionLogs.map((log, i) => (
                <div
                  key={i}
                  className="animate-in slide-in-from-bottom-1 fade-in"
                >
                  {log}
                </div>
              ))}
              <div className="mt-2 text-[#FF4E00] animate-pulse">_</div>
            </div>
          </div>
        )}
        <div ref={scrollRef} className="h-10 shrink-0"></div>
      </div>

      <div className="p-4 md:p-8 pt-0 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input) {
                handleSubmit(input);
              }
            }}
            placeholder="ENTER COMMAND OR INQUIRY..."
            className="w-full pl-6 pr-14 py-4 md:py-5 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#00F0FF] transition-colors placeholder:text-white/20 rounded-none shadow-2xl"
          />
          <button
            onMouseDown={() => setIsListening(true)}
            onMouseUp={() => setIsListening(false)}
            onMouseLeave={() => setIsListening(false)}
            onTouchStart={() => setIsListening(true)}
            onTouchEnd={() => setIsListening(false)}
            className={`absolute right-12 md:right-14 top-1/2 -translate-y-1/2 p-2 transition-colors rounded-none ${isListening ? "bg-[#FF4E00] text-black" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSubmit(input)}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-[#00F0FF] hover:text-black transition-colors rounded-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleSubmit("Why did latency spike on the auth-service 5 minutes ago?")}
            className="whitespace-nowrap px-4 py-2 border border-[#FF4E00]/30 text-[10px] font-bold tracking-widest uppercase text-[#FF4E00] hover:bg-[#FF4E00]/10 hover:border-[#FF4E00] transition-colors bg-[#FF4E00]/5"
          >
            Diagnose Auth-Service
          </button>
          <button
            onClick={() => handleSubmit("Why did OPA deny the last action?")}
            className="whitespace-nowrap px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50 hover:text-[#8A2BE2] hover:border-[#8A2BE2]/50 transition-colors bg-white/5"
          >
            Why did OPA deny action?
          </button>
          <button
            onClick={() =>
              handleSubmit("Show nodes with highest memory growth")
            }
            className="whitespace-nowrap px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors bg-white/5"
          >
            Identify Memory Leaks
          </button>
          <button
            onClick={() => handleSubmit("Replay the outage from 14:00")}
            className="whitespace-nowrap px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50 hover:text-green-500 hover:border-green-500/50 transition-colors bg-white/5"
          >
            Replay 14:00 Outage
          </button>
        </div>
      </div>
    </div>
  );
}
