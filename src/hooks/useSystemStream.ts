import { useState, useEffect } from 'react';

export interface SystemService {
  name: string;
  status: string;
  restarts: number;
  memory: number;
  cpu: number;
  pid: number | null;
  type?: string;
  provider?: string;
  region?: string;
  costPerHour?: number;
  idle?: boolean;
}

export interface Incident {
  id: string;
  title: string;
  date: string;
  learned: string;
  duration: string;
}

export interface SystemMetrics {
  systemCpu: number;
  systemMem: number;
  diskIo: number;
  networkRx: number;
  networkTx: number;
  dbCpu: number;
  spikeActive: boolean;
  healing: boolean;
  responseTime: number;
  eventsSec: number;
  engineLatency: number;
  eventLag: number;
  decisionTime: number;
  services: SystemService[];
  incidents: Incident[];
  cloudSpendRate: number;
  selfObservability?: {
    apiLatency: number;
    eventQueueDepth: number;
    internalMemoryGrowth: number;
  };
}

const initialServices: SystemService[] = [
  { name: 'db-primary-node', status: 'RUNNING', restarts: 0, memory: 450, cpu: 12, pid: 1024, type: 'docker', provider: 'AWS', region: 'us-east-1', costPerHour: 1.2 },
  { name: 'auth-service', status: 'RUNNING', restarts: 0, memory: 120, cpu: 4, pid: 1025, type: 'local', provider: 'GCP', region: 'us-west-1', costPerHour: 0.8 },
  { name: 'worker-queue-01', status: 'RUNNING', restarts: 2, memory: 80, cpu: 2, pid: 1026, type: 'local', provider: 'AWS', region: 'us-east-1', coatPerHour: 0.5, idle: true },
  { name: 'edge-laptop-alpha', status: 'RUNNING', restarts: 0, memory: 16000, cpu: 5, pid: null, type: 'agent', provider: 'GCP', region: 'asia-southeast1', costPerHour: 2.5 }
];

export function useSystemStream() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    systemCpu: 5,
    systemMem: 30,
    diskIo: 15,
    networkRx: 1.2,
    networkTx: 0.8,
    dbCpu: 20,
    spikeActive: false,
    healing: false,
    responseTime: 45,
    eventsSec: 2100,
    engineLatency: 12,
    eventLag: 5,
    decisionTime: 2,
    services: [...initialServices],
    incidents: [],
    cloudSpendRate: 1.5,
    selfObservability: {
      apiLatency: 12,
      eventQueueDepth: 0,
      internalMemoryGrowth: 0
    }
  });

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setMetrics(prev => {
        const spikeMult = prev.spikeActive ? (Math.random() * 2 + 3) : 1;
        const healingActive = prev.healing;

        let newDbCpu = prev.spikeActive 
           ? Math.min(100, prev.dbCpu + (Math.random() * 10)) 
           : healingActive ? Math.max(20, prev.dbCpu - (Math.random() * 5)) 
           : 20 + Math.random() * 5;

        // Auto stop spike if it's been active a while
        let newSpikeActive = prev.spikeActive;
        let newHealing = prev.healing;

        if (prev.spikeActive && tick % 20 === 0 && !prev.healing) {
           newHealing = true; // Auto-heal kicks in
        }

        if (prev.healing && newDbCpu <= 25) {
           newSpikeActive = false;
           newHealing = false;
           if (prev.spikeActive) {
             // Add an incident
             const inc = {
               id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
               title: 'Auto-Healed Resource Exhaustion',
               date: new Date().toLocaleTimeString(),
               learned: 'Scaled read replicas and flushed WAL.',
               duration: '14s'
             };
             setTimeout(() => setMetrics(m => ({...m, incidents: [inc, ...m.incidents].slice(0, 5)})), 0);
           }
        }

        const sysCpu = Math.min(100, 5 * spikeMult + Math.random() * 5);
        const sysMem = Math.min(100, 30 + (spikeMult * 5) + Math.random() * 2);

        const updatedServices = prev.services.map(s => {
          if (s.name === 'db-primary-node') {
            return { ...s, cpu: newDbCpu, memory: 450 + (spikeMult * 100) };
          }
          return { ...s, cpu: Math.max(1, Math.min(100, s.cpu + (Math.random() * 2 - 1) * spikeMult)) };
        });

        return {
          ...prev,
          systemCpu: sysCpu,
          systemMem: sysMem,
          dbCpu: newDbCpu,
          spikeActive: newSpikeActive,
          healing: newHealing,
          diskIo: 15 * spikeMult + Math.random() * 5,
          networkRx: 1.2 * spikeMult + Math.random(),
          networkTx: 0.8 * spikeMult + Math.random(),
          responseTime: healingActive ? 120 : prev.spikeActive ? 800 + Math.random() * 200 : 45 + Math.random() * 10,
          eventsSec: Math.floor(2100 * spikeMult + Math.random() * 100),
          services: updatedServices,
          cloudSpendRate: updatedServices.reduce((acc, s) => acc + (s.costPerHour || 0), 0)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerSpike = async () => {
    setMetrics(m => ({ ...m, spikeActive: true, healing: false, incidents: [{
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: 'Simulated Load Spike Detected',
      date: new Date().toLocaleTimeString(),
      learned: 'System absorbing impact...',
      duration: 'Ongoing'
    }, ...m.incidents].slice(0, 5) }));
  };

  const triggerHeal = async () => {
    setMetrics(m => ({ ...m, healing: true }));
  };

  const restartService = async (name: string) => {
    setMetrics(m => ({
      ...m,
      services: m.services.map(s => s.name === name ? { ...s, restarts: s.restarts + 1, status: 'RESTARTING', cpu: 0, memory: 0 } : s)
    }));
    setTimeout(() => {
      setMetrics(m => ({
        ...m,
        services: m.services.map(s => s.name === name ? { ...s, status: 'RUNNING', cpu: 5, memory: 100 } : s)
      }));
    }, 2000);
  };

  const killService = async (name: string) => {
    setMetrics(m => ({
      ...m,
      services: m.services.map(s => s.name === name ? { ...s, status: 'DEAD', cpu: 0, memory: 0 } : s)
    }));
    setTimeout(() => restartService(name), 3000);
  };

  const scaleService = async () => {
    setMetrics(m => {
      const newName = `worker-queue-${String(m.services.length).padStart(2, '0')}`;
      return {
        ...m,
        services: [...m.services, {
          name: newName, status: 'RUNNING', restarts: 0, memory: 80 + Math.random() * 20, cpu: 2 + Math.random() * 5, 
          pid: 1000 + m.services.length, type: 'local', provider: 'AWS', region: 'us-east-1', costPerHour: 0.5
        }]
      };
    });
  };

  return { metrics, triggerSpike, triggerHeal, restartService, killService, scaleService };
}
