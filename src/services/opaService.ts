/**
 * OPA (Open Policy Agent) simulated engine.
 * Validates JSON structures against strict governance rules.
 */

export interface OPARequest {
  input: {
     action: string;
     target: string;
     confidence: number;
     blastRadius: string;
     userRole?: string;
  }
}

export class OPAEngine {
    evaluate(request: OPARequest): { allow: boolean, reason?: string } {
        const { action, confidence, blastRadius, userRole } = request.input;
        
        // Rule: Only allow specific actions autonomously
        const allowedAutonomous = ['SCALE_WORKERS', 'RESTART_SERVICE', 'CLEAR_CACHE', 'ROTATE_LOGS'];
        if (!allowedAutonomous.includes(action) && userRole !== 'admin') {
            return { allow: false, reason: `Action ${action} is not in OPA whitelist for autonomous execution.` };
        }
        
        // Rule: Confidence must be >= 85 for any destructive/scaling action
        if (confidence < 85) {
            return { allow: false, reason: `Confidence ${confidence} is below OPA required threshold of 85.` };
        }
        
        // Rule: High blast radius requires HUMAN approval explicitly (denied by OPA by default)
        if (blastRadius === 'HIGH' && userRole !== 'admin') {
            return { allow: false, reason: `OPA Policy blocks HIGH blast radius actions without explicit admin role.` };
        }
        
        return { allow: true };
    }
}

export const opa = new OPAEngine();
