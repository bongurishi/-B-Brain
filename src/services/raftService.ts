import { EventEmitter } from 'events';

export type NodeState = 'FOLLOWER' | 'CANDIDATE' | 'LEADER';

export class RaftNode extends EventEmitter {
    nodeId: string;
    state: NodeState = 'FOLLOWER';
    term: number = 0;
    votedFor: string | null = null;
    leaderId: string | null = null;
    
    constructor(nodeId: string) {
        super();
        this.nodeId = nodeId;
        this.startElectionTimeout();
    }
    
    startElectionTimeout() {
        const timeout = 1500 + Math.random() * 1500;
        setTimeout(() => {
            if (this.state !== 'LEADER') {
                this.startElection();
            }
        }, timeout);
    }
    
    startElection() {
        this.state = 'CANDIDATE';
        this.term++;
        this.votedFor = this.nodeId;
        this.emit('election_started', { term: this.term, candidate: this.nodeId });
        
        // Simulate winning majority logically in this single-process representation
        setTimeout(() => {
            if (this.state === 'CANDIDATE') {
                this.state = 'LEADER';
                this.leaderId = this.nodeId;
                this.emit('leader_elected', { term: this.term, leader: this.nodeId });
                this.startHeartbeat();
            }
        }, 50);
    }
    
    startHeartbeat() {
        setInterval(() => {
            if (this.state === 'LEADER') {
                this.emit('heartbeat', { term: this.term, leader: this.nodeId });
            }
        }, 500);
    }
    
    isLeader() {
        return this.state === 'LEADER';
    }
}

export const raftCluster = new RaftNode(`ctrl-plane-${Math.random().toString(36).substr(2,5)}`);
