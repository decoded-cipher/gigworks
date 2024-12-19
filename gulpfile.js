
const { parallel } = require('gulp');
const { spawn } = require('child_process');

const startClient = (cb) => {
    const client = spawn('npm', ['run', 'dev'], { cwd: 'client', stdio: 'inherit', shell: true });
    client.on('close', cb);
}

const startServer = (cb) => {
    const server = spawn('npm', ['run', 'dev'], { cwd: 'server', stdio: 'inherit', shell: true });
    server.on('close', cb);
};

const startAll = parallel(startClient, startServer);
exports.start = startAll;
