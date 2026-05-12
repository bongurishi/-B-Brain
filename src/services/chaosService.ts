import { EventEmitter } from 'events';

export class ChaosMonkey extends EventEmitter {
    isActive: boolean = false;
    
    start() {
        this.isActive = true;
        this.emit('chaos_started');
        this.scheduleChaos();
    }
    
    stop() {
        this.isActive = false;
        this.emit('chaos_stopped');
    }
    
    scheduleChaos() {
        if (!this.isActive) return;
        
        setTimeout(() => {
            if (!this.isActive) return;
            const events = [
                this.networkPartition.bind(this),
                this.latencyInjection.bind(this),
                this.nodeTermination.bind(this)
            ];
            
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            randomEvent();
            
            this.scheduleChaos();
        }, 30000 + (Math.random() * 60000)); // Every 30-90 seconds
    }
    
    networkPartition() {
        this.emit('chaos_event', { type: 'NETWORK_PARTITION', description: 'Simulated AZ partition isolating the primary database.' });
    }
    
    latencyInjection() {
         this.emit('chaos_event', { type: 'LATENCY_INJECTION', description: 'Injected 500ms latency into the auth service mesh.' });
    }
    
    nodeTermination() {
        this.emit('chaos_event', { type: 'NODE_TERMINATION', description: 'Terminated random spot instance worker node.' });
    }
}
export const chaosMonkey = new ChaosMonkey();
