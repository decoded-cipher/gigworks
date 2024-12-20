
const { parallel } = require('gulp');
const { exec } = require('child_process');

const runCommand = (command, args, options) => {
    return new Promise((resolve, reject) => {
        const proc = exec([command, ...args].join(' '), options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
    });
};

const startClient = async () => {
    try {
        await runCommand('npm', ['run', 'dev'], { cwd: 'client', stdio: 'inherit', shell: true });
        console.log('Client started successfully');
    } catch (error) {
        console.error('Failed to start client:', error);
    }
};

const startServer = async () => {
    try {
        await runCommand('npm', ['run', 'dev'], { cwd: 'server', stdio: 'inherit', shell: true });
        console.log('Server started successfully');
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

const startAdmin = async () => {
    try {
        await runCommand('npm', ['run', 'dev'], { cwd: 'admin', stdio: 'inherit', shell: true });
        console.log('Admin started successfully');
    } catch (error) {
        console.error('Failed to start admin:', error);
    }
};



const startAll = parallel(startClient, startServer, startAdmin);
exports.startAll = startAll;

exports.startClient = startClient;
exports.startServer = startServer;
exports.startAdmin = startAdmin;
