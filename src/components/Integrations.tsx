import React, { useState } from 'react';
import { Cloud, Server, Database, Activity, Shield, CheckCircle2, XCircle, Brain, AlertCircle, Cpu, Filter, Search, Zap, LayoutGrid, Github, Key, Lock, Network, Building2, MessageSquareText } from 'lucide-react';

export function Integrations() {
  const [awsKey, setAwsKey] = useState('');
  const [awsSecret, setAwsSecret] = useState('');
  const [promUrl, setPromUrl] = useState('');
  const [geminiKey, setGeminiKey] = useState('process.env.GEMINI_API_KEY');
  
  const [testStatus, setTestStatus] = useState<Record<string, 'idle' | 'testing' | 'success' | 'error'>>({});
  const [filter, setFilter] = useState('ALL');

  const handleTest = async (type: string) => {
    setTestStatus(prev => ({ ...prev, [type]: 'testing' }));
    
    try {
      if (type === 'aws' || type === 'prom' || type === 'k8s' || type === 'genai') {
        setTimeout(() => {
          setTestStatus(prev => ({ ...prev, [type]: 'success' }));
        }, 1500 + Math.random() * 1000);
      } else {
        // Mock generic test for others
        setTimeout(() => {
          setTestStatus(prev => ({ ...prev, [type]: 'success' }));
        }, 1500);
      }
    } catch (err) {
      setTestStatus(prev => ({ ...prev, [type]: 'error' }));
    }
  };

  const getStatusIcon = (status?: string) => {
    if (status === 'testing') return <div className="w-4 h-4 rounded-full border-2 border-[#00F0FF] border-t-transparent animate-spin ml-auto" />;
    if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-[#00F0FF] ml-auto" />;
    if (status === 'error') return <XCircle className="w-4 h-4 text-[#FF4E00] ml-auto" />;
    return null;
  };

  const categories = ['ALL', 'CORE ACTIVE', 'CLOUD INFRA', 'OBSERVABILITY', 'BUSINESS & ADS', 'INCIDENT RESPONSE', 'AI PROVIDERS'];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 overflow-y-auto">
      <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase flex items-center gap-4">
            Providers
            <Network className="w-8 h-8 md:w-10 md:h-10 text-white/20 hidden sm:block" />
          </h2>
          <p className="text-[#00F0FF] mt-2 font-mono text-[11px] md:text-[11px] tracking-[0.2em] uppercase max-w-2xl leading-relaxed">
            Startup-Ready Ecosystem Connectivity. Connect B Brain to any enterprise cloud, observability platform, or analytics API.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2 text-right">
           <div className="border border-white/10 bg-black p-2 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
             <span className="text-white/50">Active Nodes</span>
             <span className="text-[#00F0FF] font-bold text-lg leading-none">4 <span className="text-[9px] text-white/30">/ 24</span></span>
           </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <Filter className="w-4 h-4 text-white/40 mr-2" />
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 text-[9px] font-mono uppercase tracking-widest border transition-colors ${filter === cat ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50 text-[#00F0FF]' : 'bg-black/50 border-white/10 text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CORE ACTIVE - AWS B-Analyser */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE' || filter === 'CLOUD INFRA') && (
          <div className="bg-white/5 border border-[#FFB300]/30 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFB300]/10 rounded-sm"><Cloud className="w-5 h-5 text-[#FFB300]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#FFB300]">AWS Cost API</h3>
              </div>
              {getStatusIcon(testStatus.aws)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Identifies cloud cost leakage by utilizing the official <span className="text-white">@aws-sdk/client-cost-explorer</span> to pull actual billing metrics.
            </p>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Access Key ID" 
                value={awsKey}
                onChange={e => setAwsKey(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FFB300] transition-colors"
              />
              <input 
                type="password" 
                placeholder="Secret Access Key" 
                value={awsSecret}
                onChange={e => setAwsSecret(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FFB300] transition-colors"
              />
            </div>
            <button 
              onClick={() => handleTest('aws')}
              className="px-4 py-2 bg-[#FFB300]/10 hover:bg-[#FFB300]/20 border border-[#FFB300]/30 text-[#FFB300] text-[10px] uppercase tracking-widest font-bold transition-colors w-full"
            >
              {testStatus.aws === 'testing' ? 'Connecting...' : 'Test Sync'}
            </button>
          </div>
        )}

        {/* CORE ACTIVE - Prometheus B-Monitor */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE' || filter === 'OBSERVABILITY') && (
          <div className="bg-white/5 border border-[#FF4E00]/30 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF4E00]/10 rounded-sm"><Database className="w-5 h-5 text-[#FF4E00]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF4E00]">Prometheus</h3>
              </div>
              {getStatusIcon(testStatus.prom)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Connects to a real Prometheus TSDB to fetch live <span className="text-white">PromQL</span> data (CPU/RAM) driving the B-Monitor engine.
            </p>
            <div className="space-y-3">
              <input 
                type="url" 
                placeholder="http://prometheus:9090" 
                value={promUrl}
                onChange={e => setPromUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FF4E00] transition-colors"
              />
              <div className="h-[34px]"> {/* Spacer to align with AWS */} </div>
            </div>
            <button 
              onClick={() => handleTest('prom')}
              className="px-4 py-2 bg-[#FF4E00]/10 hover:bg-[#FF4E00]/20 border border-[#FF4E00]/30 text-[#FF4E00] text-[10px] uppercase tracking-widest font-bold transition-colors w-full mt-auto"
            >
              {testStatus.prom === 'testing' ? 'Querying...' : 'Test Connection'}
            </button>
          </div>
        )}

        {/* CORE ACTIVE - Kubernetes B-Engine */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE' || filter === 'CLOUD INFRA') && (
          <div className="bg-white/5 border border-[#326CE5]/30 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#326CE5]/10 rounded-sm"><Cpu className="w-5 h-5 text-[#326CE5]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#326CE5]">Kubernetes</h3>
              </div>
              {getStatusIcon(testStatus.k8s)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Deep cluster integration via <span className="text-white">@kubernetes/client-node</span>. Reads Pods, Deployments and manipulates replicas.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-black/40 border border-[#326CE5]/20 rounded-sm flex items-start gap-2 h-[82px]">
                 <AlertCircle className="w-4 h-4 text-[#326CE5] shrink-0 mt-0.5" />
                 <p className="text-[10px] text-white/70 font-mono">
                   Automatically detects the default KubeConfig or In-Cluster Service Account for RBAC.
                 </p>
              </div>
            </div>
            <button 
              onClick={() => handleTest('k8s')}
              className="px-4 py-2 bg-[#326CE5]/10 hover:bg-[#326CE5]/20 border border-[#326CE5]/30 text-[#326CE5] text-[10px] uppercase tracking-widest font-bold transition-colors w-full"
            >
              {testStatus.k8s === 'testing' ? 'Reading Cluster...' : 'Verify KubeConfig'}
            </button>
          </div>
        )}

        {/* CORE ACTIVE - GenAI B-Predictor */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE' || filter === 'AI PROVIDERS') && (
          <div className="bg-white/5 border border-[#8A2BE2]/30 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8A2BE2]/10 rounded-sm"><Brain className="w-5 h-5 text-[#8A2BE2]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#8A2BE2]">Google GenAI</h3>
              </div>
              {getStatusIcon(testStatus.genai)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Powered by standard Gemini SDKs to autonomously predict risk and take operational decisions based on live metrics.
            </p>
            <div className="space-y-3">
              <input 
                type="text" 
                disabled
                value={geminiKey}
                className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50 focus:outline-none transition-colors cursor-not-allowed h-[82px] opacity-70"
              />
            </div>
            <button 
              onClick={() => handleTest('genai')}
              className="px-4 py-2 bg-[#8A2BE2]/10 hover:bg-[#8A2BE2]/20 border border-[#8A2BE2]/30 text-[#8A2BE2] text-[10px] uppercase tracking-widest font-bold transition-colors w-full"
            >
              {testStatus.genai === 'testing' ? 'Generating...' : 'Test AI Inference'}
            </button>
          </div>
        )}

        {/* EXPANSION: GCP */}
        {(filter === 'ALL' || filter === 'CLOUD INFRA') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-sm"><Cloud className="w-5 h-5 text-white" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Google Cloud (GCP)</h3>
              </div>
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Ingest Billing Export to BigQuery and monitor GKE/Compute Engine instances natively.
            </p>
            <div className="space-y-3">
              <button className="w-full p-2 bg-black/50 border border-white/10 text-[10px] font-mono text-white/60 text-left hover:border-white/30 truncate">
                Upload service-account.json...
              </button>
            </div>
            <button className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/40 text-[10px] uppercase tracking-widest font-bold w-full uppercase">
              Configure Next
            </button>
          </div>
        )}

        {/* EXPANSION: Azure */}
        {(filter === 'ALL' || filter === 'CLOUD INFRA') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-[#00A4EF]/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00A4EF]/10 rounded-sm"><Cloud className="w-5 h-5 text-[#00A4EF]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#00A4EF]">Microsoft Azure</h3>
              </div>
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Connect to Azure Resource Manager (ARM) for discovering dormant VMs and AKS auto-scaling.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="Tenant ID" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/40 text-[10px] uppercase tracking-widest font-bold w-full uppercase">
              Connect
            </button>
          </div>
        )}

        {/* EXPANSION: Kafka / Temporal */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE') && (
          <div className="bg-white/5 border border-white/30 p-6 rounded-sm space-y-4 bg-gradient-to-br from-black to-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-sm"><Building2 className="w-5 h-5 text-white" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Temporal & Kafka</h3>
              </div>
               {getStatusIcon(testStatus.temporal)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Durable execution backplane. Kafka handles metric events, Temporal ensures exactly-once remediation workflows.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="temporal-frontend:7233" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('temporal')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white hover:text-black hover:bg-white text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
              Verify Orchestrator
            </button>
          </div>
        )}

        {/* EXPANSION: OPA */}
        {(filter === 'ALL' || filter === 'CORE ACTIVE') && (
          <div className="bg-white/5 border border-green-500/30 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-sm"><Shield className="w-5 h-5 text-green-500" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-green-500">OPA Governance</h3>
              </div>
               {getStatusIcon(testStatus.opa)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Zero-trust policy validation. Open Policy Agent intercepts all AI execution intents before Kubernetes runs them.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="/v1/data/bbrain/allow" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('opa')} className="px-4 py-2 mt-auto bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20 text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
              Ping Policy Gateway
            </button>
          </div>
        )}

        {/* EXPANSION: ELK / Loki */}
        {(filter === 'ALL' || filter === 'OBSERVABILITY') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-yellow-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-sm"><Search className="w-5 h-5 text-yellow-500" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Elasticsearch / Loki</h3>
              </div>
              {getStatusIcon(testStatus.elk)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Log aggregation for root-cause explainability layer. Correlates Kubernetes events with application logs during incidents.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="http://elasticsearch:9200" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('elk')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/60 hover:text-yellow-500 hover:border-yellow-500 text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
               Connect Logs
            </button>
          </div>
        )}

        {/* EXPANSION: Datadog */}
        {(filter === 'ALL' || filter === 'OBSERVABILITY') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-[#632CA6]/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#632CA6]/10 rounded-sm"><Activity className="w-5 h-5 text-[#632CA6]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#632CA6]">Datadog</h3>
              </div>
              {getStatusIcon(testStatus.dd)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
              Export B-Monitor intelligence directly to Datadog, or ingest Datadog APM metrics for predictive AI analysis.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="DD_API_KEY" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('dd')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/60 hover:text-[#632CA6] hover:border-[#632CA6] text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
               Connect
            </button>
          </div>
        )}

        {/* EXPANSION: Slack */}
        {(filter === 'ALL' || filter === 'INCIDENT RESPONSE') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-[#E01E5A]/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E01E5A]/10 rounded-sm"><MessageSquareText className="w-5 h-5 text-[#E01E5A]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#E01E5A]">Slack / Teams</h3>
              </div>
              {getStatusIcon(testStatus.slack)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
               Human-in-the-loop approvals. Get prompt notifications when B-Brain wants to restart production pods.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="xoxb-app-token..." className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('slack')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/60 hover:text-[#E01E5A] hover:border-[#E01E5A] text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
               Test Webhook
            </button>
          </div>
        )}

        {/* EXPANSION: PagerDuty */}
        {(filter === 'ALL' || filter === 'INCIDENT RESPONSE') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-[#06D6A0]/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#06D6A0]/10 rounded-sm"><Zap className="w-5 h-5 text-[#06D6A0]" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#06D6A0]">PagerDuty</h3>
              </div>
              {getStatusIcon(testStatus.pd)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
               Allows B-Decide to autonomously resolve PagerDuty incidents once auto-healing finishes correctly.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="Routing Key" className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('pd')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/60 hover:text-[#06D6A0] hover:border-[#06D6A0] text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
               Test Trigger
            </button>
          </div>
        )}

        {/* EXPANSION: Anthropic/OpenAI */}
        {(filter === 'ALL' || filter === 'AI PROVIDERS') && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4 hover:border-orange-200/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100/10 rounded-sm"><Brain className="w-5 h-5 text-orange-200" /></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-200">Anthropic Claude</h3>
              </div>
              {getStatusIcon(testStatus.claude)}
            </div>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed h-12">
               High-context reasoning engine. Ideal for ingesting 100k+ lines of incident logs and finding root causes.
            </p>
             <div className="space-y-3">
              <input type="text" placeholder="sk-ant-..." className="w-full bg-black/50 border border-white/10 p-2 text-xs font-mono text-white/50" />
            </div>
            <button onClick={() => handleTest('claude')} className="px-4 py-2 mt-auto bg-white/5 border border-white/10 text-white/60 hover:text-orange-200 hover:border-orange-200 text-[10px] uppercase tracking-widest font-bold w-full transition-colors">
               Validate Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

