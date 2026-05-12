# B-Brain: Autonomous Cloud Operating System

B-Brain is an AI-native control plane for Kubernetes. It goes beyond observation and alerting—it continuously predicts, decides, and acts on infrastructure anomalies like traffic spikes or memory leaks before they cause downtime.

## 🚀 One-Command Startup

Start the entire B-Brain stack (App, Telemetry, and Mock Database):

```bash
docker-compose up -d
```

Access the Mission Control at `http://localhost:3000`

## 💻 Running Locally in VS Code

To work on B-Brain locally using VS Code:

1. Clone the repository and open the folder in **VS Code**.
2. Open the integrated terminal (`Ctrl` + `\``) and run:
   ```bash
   npm install
   ```
3. Start the Vite dev server and Express backend together:
   ```bash
   npm run dev
   ```
4. VS Code will run process on port `3000`. Navigate to `http://localhost:3000` to view the Mission Control.

## 🚀 Deploying to Vercel

B-Brain features a full-stack architecture (Vite frontend + Express Node.js backend). You can easily deploy it to Vercel by utilizing the provided `vercel.json` configuration.

1. **Push to GitHub**: Commit and push this project to a GitHub repository.
2. **Import to Vercel**: Connect your GitHub account to Vercel and import the project.
3. **Environment**: Keep defaults (`npm run build` will be auto-detected).
4. Vercel will automatically build the static Vite frontend to `dist/` and wrap `server.ts` as a Serverless Function connecting to `/api` routes!

### 🔑 Fixing Authentication on Vercel
If Google Login isn't working after deploying to Vercel (or any other provider), Firebase is blocking the unlisted domain.
1. Go to the [Firebase Console](https://console.firebase.google.com/) -> Select your project.
2. Go to **Authentication** -> **Settings** -> **Authorized domains**.
3. Click **Add domain** and enter your Vercel deployment URL exactly (e.g., `b-brain.vercel.app`), without `https://` or trailing slashes.
4. Save and the login should work immediately!

*Note: For the best Live SSE (Server-Sent Events) experience, consider Render or Railway which support long-lived socket connections, though Vercel Edge functions manage short telemetry bursts smoothly.*

## 🌍 Real Deployment & Cluster Testing

B-Brain is designed to run securely inside any compliant Kubernetes cluster (Minikube, Kind, K3s, AWS EKS, GCP GKE).

To deploy B-Brain with proper RBAC, Autoscaling, and Engine execution privileges:

```bash
# 1. Apply Namespace and RBAC Service Account
kubectl apply -f deploy/rbac.yaml

# 2. Deploy B-Brain Control Plane
kubectl apply -f deploy/deployment.yaml

# 3. Port Forward to UI
kubectl port-forward svc/b-brain-service 3000:80 -n b-brain
```

B-Brain requires `ClusterRole` privileges to dynamically read from Prometheus and scale Deployments.

## 🧠 Why B-Brain?

Most APM tools wake you up at 3 AM to fix an OOM kill. 
B-Brain:
1. Predicts the OOM kill based on memory heap slope constraints
2. Injects a new replica instantly, diverting traffic
3. Safely cycles the degraded pod
4. Updates its internal memory so it can react 30% faster next time.

### Core Architecture

- **Visibility (Phase 1)**: Hooks into Prometheus metrics stream (Metrics Engine)
- **Intelligence (Phase 2)**: Detects abnormal behavior, predicts overloads 
- **Decision Layer (Phase 3)**: A localized AI predictor that correlates signatures
- **Autonomous Exec (Phase 4)**: Kubernetes native Scaling & Traffic shifting (Action Orchestrator)
- **Learning System (Phase 5)**: Track successful remediation history

## 🔒 Security & Stability Hardened

- **Zero-Trust Boundaries**: Uses Strict Kubernetes RBAC instead of broad environment variables.
- **Graceful Failure**: Automatic fallback and event queue backpressure.
- **Self-Observability**: B-Brain monitors its own SSE lag, event queue depth, and memory growth.

## 📦 SDK Installation (Enterprise / Plugin Dev)

```bash
npm install @bbrain/core @bbrain/provider-aws
```

Integration is as simple as defining your guardrails:
```ts
import { Brain, Guardrails } from '@bbrain/core'

const engine = new Brain({
  maxReplicas: 20,
  preventRollbackLatency: 0.05,
  dailyBudgetCap: 500
});

engine.start();
```

---
*Built for Infra Startups, Platform Engineers, and those who sleep through the night.*




B-Brain
Autonomous Cloud Operating System

B-Brain is an AI-driven infrastructure control plane designed to monitor, predict, analyze, and autonomously remediate cloud and Kubernetes workloads in real time.

It combines observability, predictive intelligence, orchestration, self-healing automation, and infrastructure analytics into a unified operational system.

Core Capabilities
Real-Time Observability
Live CPU, Memory, Disk I/O, and Network telemetry
Kubernetes and container monitoring
Prometheus metrics ingestion
Distributed node visibility
Predictive Intelligence
Anomaly detection
Memory leak prediction
Traffic spike forecasting
Cascading failure analysis
Autonomous Decision Engine
AI-assisted remediation planning
Confidence scoring and explainability
Rollback safety policies
Zero-Touch execution mode
Self-Healing Infrastructure
Kubernetes-native orchestration
Auto scaling and restart workflows
Traffic rerouting simulation
Autonomous remediation pipelines
FinOps & Infrastructure Analytics
Cloud cost monitoring
Idle resource detection
Cost leakage analysis
Infrastructure efficiency tracking
Learning System
Incident memory database
Historical remediation tracking
MTTR optimization
Continuous operational learning
Architecture
Visibility → Intelligence → Decision → Execution → Learning
B-Brain continuously:

Observes infrastructure telemetry
Predicts anomalies and failures
Decides remediation strategies
Executes autonomous recovery
Learns from operational outcomes
Quick Start
Run with Docker
docker-compose up -d
Open: http://localhost:3000

Local Development
npm install
npm run dev
Kubernetes Deployment
kubectl apply -f deploy/rbac.yaml
kubectl apply -f deploy/deployment.yaml
kubectl port-forward svc/b-brain-service 3000:80 -n b-brain
Technology Stack
Frontend
React
TailwindCSS
Framer Motion
Recharts
Backend
Node.js
Express
TypeScript
SSE Streaming
Infrastructure
Docker
Kubernetes
Prometheus
systeminformation
Database
Firebase Firestore
AI Layer
OpenAI / Gemini APIs
Predictive anomaly engine
Autonomous remediation workflows
Security & Reliability
Kubernetes RBAC enforcement
Rollback protection policies
Event queue backpressure handling
Self-observability metrics
Graceful failure recovery
Vision
B-Brain is designed to evolve infrastructure operations from reactive monitoring into autonomous operational intelligence.

The long-term goal is a fully self-managing cloud operating system capable of operating large-scale distributed infrastructure with minimal human intervention.

License
MIT License

Built by Bongu Rishi bongurishi07@gmail.com
