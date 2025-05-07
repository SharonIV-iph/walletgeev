#!/usr/bin/env node

const { spawn } = require('child_process');

const jsonServerProcess = spawn('json-server', ['--watch', 'db.json', '--port', '3001']);

jsonServerProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
});

jsonServerProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
});

jsonServerProcess.on('close', (code) => {
    console.log(`json-server process exited with code ${code}`);
});
