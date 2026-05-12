import React, { useState } from "react";
import {
  Server,
  Download,
  Terminal,
  Database,
  CheckCircle2,
  Box,
  Eye,
  Network,
} from "lucide-react";

export function DeploymentProof() {
  const [activeTab, setActiveTab] = useState<
    "architecture" | "manifests" | "commands"
  >("architecture");

  return (
    <div className="p-4 md:p-8 space-y-6 h-full flex flex-col">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-white flex items-center gap-3">
          <Server className="w-6 h-6 text-[#FF4E00]" />
          Production Deployment Proof
        </h2>
        <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
          Real Kubernetes Manifests & Infra Automation
        </p>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("architecture")}
          className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === "architecture" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"}`}
        >
          Topology
        </button>
        <button
          onClick={() => setActiveTab("commands")}
          className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === "commands" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"}`}
        >
          Runbook
        </button>
        <button
          onClick={() => setActiveTab("manifests")}
          className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === "manifests" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"}`}
        >
          K8s YAMLs
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === "architecture" && (
          <div className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 bg-black p-4">
                <h3 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TargetIcon color="text-green-500" /> Minikube / K3s Target
                </h3>
                <div className="space-y-2 text-[10px] font-mono text-white/50">
                  <p>
                    Cluster:{" "}
                    <span className="text-white">
                      bbrain-production-cluster-1
                    </span>
                  </p>
                  <p>
                    Nodes:{" "}
                    <span className="text-white">
                      3x m5.xlarge (EKS / GKE Equivalent)
                    </span>
                  </p>
                  <p>
                    Storage:{" "}
                    <span className="text-white">
                      500GB gp3 Persistent Volumes
                    </span>
                  </p>
                  <p>
                    Ingress:{" "}
                    <span className="text-white">Nginx Ingress Controller</span>
                  </p>
                </div>
              </div>

              <div className="border border-white/10 bg-black p-4">
                <h3 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#8A2BE2]" /> Observability Stack
                </h3>
                <div className="space-y-2 text-[10px] font-mono text-white/50">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                    Prometheus (Metrics DB)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Grafana
                    (Visualization)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                    OpenTelemetry Collector
                  </p>
                </div>
              </div>

              <div className="border border-white/10 bg-black p-4">
                <h3 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#00F0FF]" /> Orchestration
                  Backplane
                </h3>
                <div className="space-y-2 text-[10px] font-mono text-white/50">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Temporal
                    Cluster (Durability)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Kafka
                    StatefulSet (Event Bus)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                    Zookeeper (Consensus)
                  </p>
                </div>
              </div>

              <div className="border border-white/10 bg-black p-4">
                <h3 className="text-white/80 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#FF4E00]" /> State
                  Persistence
                </h3>
                <div className="space-y-2 text-[10px] font-mono text-white/50">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                    PostgreSQL (Relational State)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                    TSDB/InfluxDB (Time-series)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "commands" && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-black border border-white/10">
              <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
                <Terminal className="w-4 h-4 text-white/50" />
                <span className="font-mono text-xs text-white/80 uppercase">
                  01_Initialize_Cluster.sh
                </span>
              </div>
              <div className="p-4 font-mono text-[10px] text-green-400">
                <p># Start local environment or context</p>
                <p>minikube start --cpus 4 --memory 8192</p>
                <p>kubectl create namespace bbrain-system</p>
              </div>
            </div>

            <div className="bg-black border border-white/10">
              <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
                <Terminal className="w-4 h-4 text-white/50" />
                <span className="font-mono text-xs text-white/80 uppercase">
                  02_Install_Core_Infra.sh
                </span>
              </div>
              <div className="p-4 font-mono text-[10px] text-green-400">
                <p># Deploy Kafka & Temporal using HELM</p>
                <p>helm repo add bitnami https://charts.bitnami.com/bitnami</p>
                <p>helm install kafka bitnami/kafka -n bbrain-system</p>
                <p>
                  helm install temporal temporalio/temporal -n bbrain-system
                </p>
                <p>
                  helm install prometheus
                  prometheus-community/kube-prometheus-stack -n bbrain-system
                </p>
              </div>
            </div>

            <div className="bg-black border border-white/10">
              <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/10">
                <Terminal className="w-4 h-4 text-white/50" />
                <span className="font-mono text-xs text-white/80 uppercase">
                  03_Deploy_Agents.sh
                </span>
              </div>
              <div className="p-4 font-mono text-[10px] text-green-400">
                <p># Apply operators and CRDs</p>
                <p>kubectl apply -f ./k8s/bbrain-crd.yaml</p>
                <p>kubectl apply -f ./k8s/decision-engine-deployment.yaml</p>
                <p>kubectl apply -f ./k8s/opa-policies-configmap.yaml</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "manifests" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <ManifestViewer
              filename="docker-compose.yml"
              language="yaml"
              content={COMPOSER_YAML}
            />
            <ManifestViewer
              filename="k8s/bbrain-operator.yaml"
              language="yaml"
              content={OPERATOR_YAML}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TargetIcon({ color }: any) {
  return <Network className={`w-4 h-4 ${color}`} />;
}

function ManifestViewer({
  filename,
  content,
  language,
}: {
  filename: string;
  content: string;
  language?: string;
}) {
  return (
    <div className="border border-white/10 bg-[#050505] flex flex-col h-full opacity-90 hover:opacity-100 transition-opacity">
      <div className="bg-white/5 p-3 flex justify-between items-center border-b border-white/10">
        <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">
          {filename}
        </span>
        <button
          className="text-white/40 hover:text-white transition-colors"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto font-mono text-[10px] text-[#00F0FF]/80 whitespace-pre">
        {content}
      </div>
    </div>
  );
}

const COMPOSER_YAML = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PROMETHEUS_URL=http://prometheus:9090
      - DATABASE_URL=postgres://bbrain:secret@postgres:5432/bbrain

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
      
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  temporal:
    image: temporalio/auto-setup:latest
    ports:
      - "7233:7233"
      - "8233:8233"
    environment:
      - DB=postgresql

  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"
`;

const OPERATOR_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: bbrain-operator
  namespace: bbrain-system
spec:
  replicas: 2
  selector:
    matchLabels:
      app: bbrain-operator
  template:
    metadata:
      labels:
        app: bbrain-operator
    spec:
      serviceAccountName: bbrain-operator-sa
      containers:
      - name: operator
        image: bbrain/operator:v1.2.0
        env:
        - name: TEMPORAL_ADDRESS
          value: "temporal-frontend:7233"
        - name: KAFKA_BROKERS
          value: "kafka:9092"
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
`;
