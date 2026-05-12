#!/bin/bash
# install.sh - B-Brain Distributed Agent Installer

echo "[B-BRAIN] Setting up B-Brain Telemetry Agent..."

# Ensure we're root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root (sudo ./install.sh)"
  exit
fi

# Detect systemd
if [ -d "/etc/systemd/system" ]; then
    echo "[B-BRAIN] Installing systemd service..."

    # Create directory and copy agent
    mkdir -p /opt/bbrain-agent
    cp index.js /opt/bbrain-agent/index.js
    
    # We assume Node.js is installed
    NODE_PATH=$(which node)

    if [ -z "$NODE_PATH" ]; then
        echo "[B-BRAIN] WARNING: Node.js not found in PATH."
        echo "Please install Node.js and edit /etc/systemd/system/bbrain-agent.service ExecStart."
        NODE_PATH="/usr/bin/node"
    fi

    # Create the service file inline
    cat <<EOF > /etc/systemd/system/bbrain-agent.service
[Unit]
Description=B-Brain Distributed Telemetry Agent
After=network.target

[Service]
Environment=NODE_ENV=production
# Update BRAIN_URL to your central B-Brain Control Plane
Environment=BRAIN_URL=ws://127.0.0.1:3000
Environment=MACHINE_ID=%H
Type=simple
User=root
ExecStart=${NODE_PATH} /opt/bbrain-agent/index.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

    # Enable and start
    systemctl daemon-reload
    systemctl enable bbrain-agent
    systemctl start bbrain-agent

    echo "[B-BRAIN] Agent installed and started securely as a daemon!"
    systemctl status bbrain-agent --no-pager
else
    echo "[B-BRAIN] Systemd not detected. Only Debian/Ubuntu/RHEL/Arch supported in this quick script."
fi
