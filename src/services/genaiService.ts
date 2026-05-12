import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({}); 
  }
} catch (e) {
  // Ignore
}

export async function askPredictor(metrics: any) {
  if (!ai) {
    // Return mock prediction if no API key
    return {
      riskLevel: metrics.systemCpu > 80 ? 85 : 20,
      predictions: metrics.systemCpu > 80 ? ["High CPU utilization will lead to increased latency"] : ["System is stable"],
      recommendedAction: metrics.systemCpu > 80 ? "Scale up workers" : "Monitor system"
    };
  }

  try {
    const prompt = `
    You are B-Predictor, an AI meant to analyze system telemetry and predict failures before they happen.
    Analyze the following metrics and return a JSON object with: 
    - riskLevel (0-100)
    - predictions (array of string, what is likely to fail)
    - recommendedAction (string)
    
    Metrics: ${JSON.stringify(metrics, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) return JSON.parse(response.text);
    return null;
  } catch (err) {
    console.error("Gemini AI Error:", err);
    throw err;
  }
}

export async function askDecide(incidents: any[], metrics: any) {
    if (!ai) {
      if (metrics.systemCpu > 80) {
        return { 
          action: "SCALE_WORKERS", 
          target: "backend-service", 
          reason: "CPU utilization critically high",
          confidence: 95,
          policyStatus: "AUTO_APPROVED",
          blastRadius: "LOW"
        };
      } else if (metrics.systemMem > 85) {
        return { 
          action: "CLEAR_CACHE", 
          target: "agent-node", 
          reason: "Memory exhaustion imminent",
          confidence: 92,
          policyStatus: "AUTO_APPROVED",
          blastRadius: "LOW"
        };
      }
      return { 
         action: "DO_NOTHING", 
         target: null, 
         reason: "System metrics stable",
         confidence: 99,
         policyStatus: "NO_ACTION",
         blastRadius: "NONE"
      };
    }

    try {
      const activeHour = new Date().getHours();
      const inBusinessHours = activeHour > 9 && activeHour < 17;
      
      const payloadContext = {
        metrics,
        incidents,
        governanceContext: {
           isBusinessHours: inBusinessHours,
           multiTenantBudgetRemaining: 1540,
           currentCloudSpendHourly: metrics.cloudSpendRate || 0,
           // Control plane specifies what actions are globally supported vs what edge agents can run
           globallyAllowedActions: ["SCALE_WORKERS", "THROTTLE_PROCESS", "RESTART_SERVICE", "CLEAR_CACHE", "ROTATE_LOGS"],
           maxConfidenceRequiredForDestructive: 95
        }
      };

      const prompt = `
      You are B-Decide, the multi-agent consensus engine. 
      You are analyzing proposed actions from three separate sub-agents:
      1. FinOps Agent (focuses on lowering Cloud Spend)
      2. Reliability Agent (focuses on zero-downtime, prefers scaling up)
      3. Security Agent (focuses on isolating failing nodes)
      
      Given the current metrics and past incidents, negotiate a single immediate action to take.
      
      CRITICAL - AI POLICY GOVERNANCE:
      You operate under strict Zero-Trust infrastructure bindings.
      - Check governanceContext. If during business hours, prefer less disruptive actions (BlastRadius: LOW).
      - Check if target agent actually supports the action capability. Agent capabilities are found in metrics.services.
      - If action risks data loss, confidence must be > 95 and blastRadius "HIGH". This will require HUMAN_APPROVAL.
      - If action is reversible (e.g. scale up), blastRadius is "LOW".
      - Provide a confidence score (0-100).
      
      Return a JSON object with the finalized consensus: 
      - action (string: one of the available actions from governance or capabilities)
      - target (string: the service name, if applicable, e.g., 'worker-queue-01' or 'edge-laptop-alpha')
      - reason (string: briefly explain the negotiation between the 3 agents)
      - confidence (number 0-100)
      - blastRadius (string: "NONE" | "LOW" | "MEDIUM" | "HIGH")
      
      Context Payload: ${JSON.stringify(payloadContext, null, 2)}
      `;
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
  
      if (response.text) {
         let parsed = JSON.parse(response.text);
         
         // Apply Governance Rules Engine
         if (parsed.blastRadius === "HIGH" || parsed.blastRadius === "MEDIUM" || parsed.confidence < 90) {
            parsed.policyStatus = "REQUIRES_HUMAN_APPROVAL";
         } else if (parsed.action === "DO_NOTHING") {
            parsed.policyStatus = "NO_ACTION";
         } else {
            // Apply budget guardrail
            if (parsed.action === "SCALE_WORKERS" && payloadContext.governanceContext.currentCloudSpendHourly > 50) {
               parsed.policyStatus = "DENIED_BY_BUDGET";
               parsed.reason += " (Blocked by budget ceiling)";
            } else {
               parsed.policyStatus = "AUTO_APPROVED";
            }
         }
         
         return parsed;
      }
      return { action: "DO_NOTHING", policyStatus: "NO_ACTION", blastRadius: "NONE", confidence: 100 };
    } catch (err) {
      console.error("Gemini AI Decision Error:", err);
      return { action: "DO_NOTHING", policyStatus: "NO_ACTION", blastRadius: "NONE", confidence: 100 };
    }
  }
