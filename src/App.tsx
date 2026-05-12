import { useState } from "react";
import { Sidebar, type ModuleId } from "./components/Sidebar";
import { EngineDashboard } from "./components/EngineDashboard";
import { Monitor } from "./components/Monitor";
import { Predictor } from "./components/Predictor";
import { Decide } from "./components/Decide";
import { Analyser } from "./components/Analyser";
import { MemorySystem } from "./components/MemorySystem";
import { Copilot } from "./components/Copilot";
import { MissionControl } from "./components/MissionControl";
import { SecurityIntel } from "./components/SecurityIntel";
import { Simulations } from "./components/Simulations";
import { Integrations } from "./components/Integrations";
import { TopologyMap } from "./components/TopologyMap";
import { FleetView } from "./components/FleetView";
import { AuditTimeline } from "./components/AuditTimeline";
import { OperatorExport } from "./components/OperatorExport";
import { TaskManager } from "./components/TaskManager";
import { LandingPage } from "./components/LandingPage";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { BenchmarkingDashboard } from "./components/BenchmarkingDashboard";
import { ObservabilityPanel } from "./components/ObservabilityPanel";
import { IncidentReplay } from "./components/IncidentReplay";
import { SecurityGovernance } from "./components/SecurityGovernance";
import { EngineeringConcepts } from "./components/EngineeringConcepts";
import { DeploymentProof } from "./components/DeploymentProof";
import { ConnectionGuide } from "./components/ConnectionGuide";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const [activeModule, setActiveModule] = useState<ModuleId>("mission-control");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case "mission-control":
        return <MissionControl />;
      case "architecture":
        return <ArchitectureDiagram />;
      case "engineering-concepts":
        return <EngineeringConcepts />;
      case "deployment-proof":
        return <DeploymentProof />;
      case "benchmarking":
        return <BenchmarkingDashboard />;
      case "observability":
        return <ObservabilityPanel />;
      case "incident-replay":
        return <IncidentReplay />;
      case "security-governance":
        return <SecurityGovernance />;
      case "connection-guide":
        return <ConnectionGuide />;
      case "fleet-view":
        return <FleetView />;
      case "wal-timeline":
        return <AuditTimeline />;
      case "b-engine":
        return <EngineDashboard />;
      case "b-tasks":
        return <TaskManager />;
      case "b-monitor":
        return <Monitor />;
      case "b-predictor":
        return <Predictor />;
      case "b-decide":
        return <Decide />;
      case "topology":
        return <TopologyMap />;
      case "b-analyser":
        return <Analyser />;
      case "memory":
        return <MemorySystem />;
      case "security":
        return <SecurityIntel />;
      case "simulations":
        return <Simulations />;
      case "integrations":
        return <Integrations />;
      case "copilot":
        return <Copilot />;
      case "k8s-export":
        return <OperatorExport />;
      default:
        return <MissionControl />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#E0E0E0] overflow-hidden selection:bg-[#00F0FF] selection:text-black">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={(mod) => {
          setActiveModule(mod);
          setIsMobileMenuOpen(false);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 h-full relative flex flex-col pt-14 md:pt-0 pb-8 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a] fixed top-0 w-full z-40">
          <h1 className="font-black italic text-white tracking-tighter text-2xl leading-none uppercase">
            B Brain
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 border border-white/20 text-white hover:bg-white/10 transition-colors rounded-sm"
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
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{renderModule()}</div>
        {/* Global System Status Bar */}
        <div className="absolute bottom-0 w-full h-8 bg-black border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-50 flex items-center px-4 justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/50">
          <div className="flex gap-4 md:gap-8 items-center h-full">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse glow shadow-[0_0_5px_#00F0FF]"></span>{" "}
              Clusters Healthy: <span className="text-white">12/12</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]"></span>{" "}
              Active Incidents:{" "}
              <span className="text-[#FF4E00] font-bold">0</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A2BE2]"></span>{" "}
              Auto-Heal Actions Today: <span className="text-white">34</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              Cloud Cost Saved:{" "}
              <span className="text-[#00F0FF] font-bold">$8,214</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
