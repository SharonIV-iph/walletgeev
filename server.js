#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Use npx to run json-server
const jsonServerProcess = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3001'], {
    shell: true,
    stdio: 'inherit'
});

jsonServerProcess.on('close', (code) => {
    console.log(`json-server process exited with code ${code}`);
});
