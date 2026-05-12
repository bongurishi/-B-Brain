import React, { useState } from "react";
import {
  Brain,
  Activity,
  TrendingUp,
  Zap,
  DollarSign,
  Database,
  MessageSquareText,
  Settings,
  Key,
  ShieldAlert,
  FlaskConical,
  LogOut,
  ChevronDown,
  Plus,
  Terminal,
  Network,
  Gauge,
  PlayCircle,
  Eye,
  ShieldCheck,
  BookOpen,
  Server,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export type ModuleId =
  | "mission-control"
  | "architecture"
  | "engineering-concepts"
  | "deployment-proof"
  | "benchmarking"
  | "topology"
  | "fleet-view"
  | "wal-timeline"
  | "b-engine"
  | "b-tasks"
  | "b-monitor"
  | "b-predictor"
  | "b-decide"
  | "b-analyser"
  | "observability"
  | "incident-replay"
  | "security-governance"
  | "memory"
  | "security"
  | "simulations"
  | "integrations"
  | "copilot"
  | "connection-guide"
  | "k8s-export";

interface SidebarProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

const navItems: { id: ModuleId; label: string; icon: React.ElementType }[] = [
  { id: "mission-control", label: "Mission Control", icon: ShieldAlert },
  { id: "copilot", label: "Ops Commander", icon: MessageSquareText },
  { id: "connection-guide", label: "Connection Guide", icon: BookOpen },
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "engineering-concepts", label: "Engineering Concepts", icon: BookOpen },
  { id: "deployment-proof", label: "Deployment & K8s", icon: Server },
  { id: "benchmarking", label: "Performance & Latency", icon: Gauge },
  { id: "topology", label: "Global Topology", icon: Activity },
  { id: "fleet-view", label: "Connected Fleet", icon: Activity },
  { id: "wal-timeline", label: "Orchestration Timeline", icon: Database },
  { id: "observability", label: "Tracing & Metrics", icon: Eye },
  { id: "incident-replay", label: "Incident Replay", icon: PlayCircle },
  { id: "security-governance", label: "OPA Governance", icon: ShieldCheck },
  { id: "b-engine", label: "B-Engine", icon: Brain },
  { id: "b-tasks", label: "B-Tasks", icon: Activity },
  { id: "b-monitor", label: "B-Monitor", icon: Activity },
  { id: "b-predictor", label: "Predictor Agent", icon: TrendingUp },
  { id: "b-decide", label: "Remediation Agent", icon: Zap },
  { id: "b-analyser", label: "FinOps Agent", icon: DollarSign },
  { id: "memory", label: "Memory", icon: Database },
  { id: "simulations", label: "Simulations", icon: FlaskConical },
  { id: "integrations", label: "Providers", icon: Settings },
  { id: "k8s-export", label: "K8s Export", icon: Terminal },
];

export function Sidebar({
  activeModule,
  setActiveModule,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const {
    user,
    logout,
    projects,
    activeProject,
    setActiveProject,
    createProject,
    loading,
  } = useAuth();
  const [showProjects, setShowProjects] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 w-64 md:w-64 shrink-0 h-screen border-r border-white/10 bg-[#050505] flex flex-col pt-8 z-50 transform transition-transform duration-300 md:translate-x-0 md:relative ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-6 flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="font-black italic text-white tracking-tighter text-4xl leading-none uppercase">
              B Brain
            </h1>
          </div>
          <button
            className="md:hidden text-white/50 hover:text-white"
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-4 mb-8">
          <div className="relative">
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors text-left"
            >
              <div>
                <p className="text-[9px] text-[#00F0FF] font-mono tracking-[0.2em] uppercase">
                  Workspace
                </p>
                <p className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[140px]">
                  {loading
                    ? "..."
                    : activeProject
                      ? activeProject.name
                      : "No Workspace"}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-white/50" />
            </button>

            {showProjects && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a0a0a] border border-white/10 rounded-sm z-50">
                <div className="max-h-48 overflow-y-auto python">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p);
                        setShowProjects(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${activeProject?.id === p.id ? "text-[#00F0FF] bg-white/5" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const name = prompt("New Workspace Name:");
                    if (name) {
                      createProject(name);
                      setShowProjects(false);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-bold text-white/50 hover:text-white border-t border-white/10 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Create Workspace
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-mono font-bold text-white/40 mb-4 tracking-widest uppercase">
            Modules
          </p>
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-sm text-[11px] uppercase tracking-widest font-bold transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-[#00F0FF]"
                    : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${isActive ? "text-[#00F0FF]" : "text-white/50"}`}
                />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-1 bg-[#00F0FF]" />}
              </button>
            );
          })}
        </div>

        <div className="p-6 border-t border-white/10 mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || ""}
              alt="avatar"
              className="w-8 h-8 rounded-full border border-white/20"
            />
            <div className="overflow-hidden">
              <p className="text-xs text-white font-bold truncate">
                {user?.displayName}
              </p>
              <p className="text-[9px] text-[#00F0FF] uppercase tracking-widest font-mono">
                Operator
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 flex justify-center items-center py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors rounded-sm"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="flex-1 flex justify-center items-center py-2 bg-[#FF4E00]/10 border border-[#FF4E00]/30 text-[#FF4E00] hover:bg-[#FF4E00]/20 transition-colors rounded-sm"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
