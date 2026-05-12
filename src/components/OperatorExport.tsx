import React, { useState } from 'react';
import { Download, Terminal, Settings, Copy, CheckCircle2 } from 'lucide-react';

const yamlContent = `apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: bbrainautoscalers.bbrain.io
spec:
  group: bbrain.io
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                target:
                  type: string
                cpuThreshold:
                  type: integer
                maxReplicas:
                  type: integer
  scope: Namespaced
  names:
    plural: bbrainautoscalers
    singular: bbrainautoscaler
    kind: BBrainAutoscaler
    shortNames:
      - bba
---
apiVersion: bbrain.io/v1
kind: BBrainAutoscaler
metadata:
  name: bbrain-db-scaler
spec:
  target: db-primary
  cpuThreshold: 70
  maxReplicas: 5`;

const nodejsContent = `const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
const customApi = kc.makeApiClient(k8s.CustomObjectsApi);

const GROUP = 'bbrain.io';
const VERSION = 'v1';
const PLURAL = 'bbrainautoscalers';
const NAMESPACE = 'default';

async function reconcile() {
  try {
    console.log('[+] Fetching BBrainAutoscalers...');
    const res = await customApi.listNamespacedCustomObject(GROUP, VERSION, NAMESPACE, PLURAL);
    const autoscalers = res.body.items;

    for (const scaler of autoscalers) {
      const targetName = scaler.spec.target;
      const threshold = scaler.spec.cpuThreshold;
      const maxReplicas = scaler.spec.maxReplicas;

      console.log(\`[!] Reconciling \${scaler.metadata.name} -> Target: \${targetName}\`);
      
      // Fetch target deployment
      const deployRes = await k8sApi.readNamespacedDeployment(targetName, NAMESPACE);
      const deployment = deployRes.body;
      const currentReplicas = deployment.spec.replicas;

      // Simulated Prometheus Metric Fetch here
      // In reality: await axios.get('http://prometheus.../api/v1/query?query=...')
      const currentCpuUtilization = 85; // Replace with prometheus response

      console.log(\`    Current CPU: \${currentCpuUtilization}%, Threshold: \${threshold}%\`);

      if (currentCpuUtilization > threshold && currentReplicas < maxReplicas) {
        const newReplicas = Math.min(currentReplicas + 1, maxReplicas);
        console.log(\`    [SCALING UP] Desired: \${newReplicas} -> Actual: \${currentReplicas}\`);
        
        deployment.spec.replicas = newReplicas;
        await k8sApi.replaceNamespacedDeployment(targetName, NAMESPACE, deployment);
        console.log(\`    [SUCCESS] Scaled \${targetName} to \${newReplicas} replicas.\`);
      } else {
        console.log(\`    [Synced] No action needed.\`);
      }
    }
  } catch (err) {
    if (err.statusCode === 404) {
      console.log('Target deployment not found or CRD missing.');
    } else {
      console.error('Error reconciling:', err);
    }
  }
}

// Watch loop
console.log('BBrain Operator starting up...');
setInterval(reconcile, 10000);`;

export function OperatorExport() {
  const [copiedYaml, setCopiedYaml] = useState(false);
  const [copiedNode, setCopiedNode] = useState(false);

  const handleCopy = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#00F0FF] italic uppercase flex items-center gap-4">
            K8s Operator Export
            <Settings className="w-8 h-8 md:w-10 md:h-10 text-white/20 hidden sm:block" />
          </h2>
          <p className="text-white/40 mt-2 font-mono text-[9px] md:text-[11px] tracking-[0.2em] uppercase">
            Custom Kubernetes Operator / Autonomous Scaling
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Node.js Operator Code */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#00F0FF]">operator.js</h3>
                <p className="text-[10px] text-white/50 font-mono mt-1">Node.js Kubernetes Controller</p>
              </div>
              <button 
                onClick={() => handleCopy(nodejsContent, setCopiedNode)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white uppercase tracking-wider font-bold transition-colors"
              >
                {copiedNode ? <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> : <Copy className="w-4 h-4 text-white/50" />}
                {copiedNode ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="bg-black border border-white/10 p-4 rounded-sm overflow-x-auto">
              <pre className="text-[10px] sm:text-[11px] font-mono leading-relaxed text-white/70">
                <code dangerouslySetInnerHTML={{ __html: nodejsContent.replace(/const|require|await|async|try|catch|if|else|for|new/g, '<span class="text-[#00F0FF]">$&</span>') }} />
              </pre>
            </div>
          </div>

          {/* CRD YAML Component */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
             <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">bbrain-crd.yaml</h3>
                <p className="text-[10px] text-white/50 font-mono mt-1">CRD Definition & Instance</p>
              </div>
              <button 
                onClick={() => handleCopy(yamlContent, setCopiedYaml)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white uppercase tracking-wider font-bold transition-colors"
              >
                {copiedYaml ? <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> : <Copy className="w-4 h-4 text-white/50" />}
                {copiedYaml ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="bg-black border border-white/10 p-4 rounded-sm overflow-x-auto">
              <pre className="text-[10px] sm:text-[11px] font-mono leading-relaxed text-white/70">
                <code dangerouslySetInnerHTML={{ __html: yamlContent.replace(/apiVersion|kind|metadata|spec|name/g, '<span class="text-[#FF4E00]">$&</span>') }} />
              </pre>
            </div>
          </div>

        </div>

        <div className="space-y-6">
           <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/20 p-6 rounded-sm">
             <h3 className="text-xs font-bold uppercase tracking-widest text-[#00F0FF] flex items-center gap-2 mb-4">
               <Terminal className="w-4 h-4" /> Execution Steps
             </h3>
             <ol className="list-decimal list-inside space-y-4 text-[10px] sm:text-[11px] font-mono text-white/70 leading-relaxed">
               <li>
                 Start your local cluster:
                 <code className="block mt-2 bg-black p-2 border border-white/10 text-[#00F0FF]">minikube start</code>
               </li>
               <li>
                 Install the Kubernetes client:
                 <code className="block mt-2 bg-black p-2 border border-white/10 text-[#00F0FF]">npm install @kubernetes/client-node</code>
               </li>
               <li>
                 Apply the CRD and custom instance:
                 <code className="block mt-2 bg-black p-2 border border-white/10 text-[#00F0FF]">kubectl apply -f bbrain-crd.yaml</code>
               </li>
               <li>
                 Create the target deployment (mock):
                 <code className="block mt-2 bg-black p-2 border border-white/10 text-[#00F0FF]">kubectl create deployment db-primary --image=nginx</code>
               </li>
               <li>
                 Run the B-Brain Operator:
                 <code className="block mt-2 bg-black p-2 border border-white/10 text-[#00F0FF]">node operator.js</code>
               </li>
               <li className="text-white pt-4 font-sans">
                 👉 Watch the controller log: <br/><br/>
                 <span className="text-[#00F0FF]/70 font-mono text-[10px]">
                   [!] Reconciling bbrain-db-scaler &gt; Target: db-primary<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;Current CPU: 82%, Threshold: 70%<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;[SCALING UP] Desired: 2 &gt; Actual: 1<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;[SUCCESS] Scaled db-primary to 2 replicas.<br/>
                 </span>
               </li>
             </ol>
           </div>
        </div>
      </div>
    </div>
  );
}
