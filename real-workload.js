import http from 'http';

const port = process.env.PORT || 3001;
const name = process.env.SERVICE_NAME || 'worker';

let memoryLeak = [];

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
  } else if (req.url === '/compute') {
    // Burn some CPU
    let sum = 0;
    for (let i = 0; i < 5e6; i++) {
       sum += Math.sqrt(i);
    }
    res.writeHead(200);
    res.end('Computed');
  } else if (req.url === '/leak') {
    // Leak about 10MB
    const leak = Buffer.alloc(10 * 1024 * 1024, 1);
    memoryLeak.push(leak);
    res.writeHead(200);
    res.end('Leaked');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`[${name}] Real workload listening on 127.0.0.1:${port}`);
});

process.on('message', (msg) => {
  if (msg === 'CRASH') {
    console.error(`[${name}] Signal Received: Gracefully terminating process (Auto-Heal Intervention)`);
    process.exit(1);
  }
});
