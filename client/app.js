/**
 * socket.io client
 */

const options = {
    'reconnectionAttempts': 10,
    'reconnectionDelay': 100,
    'reconnectionDelayMax': 300,
    'timeout': 5000,
};

const config = require('./config.json');
const client = require('socket.io-client');
const socket = client.connect(config.host, options);

socket.on('connect', () => {
    console.log(`client connected host:${config.host}`);
});

socket.on('message', (data) => {
    console.log(`message：${data}`);
});

socket.on('connect_error', (error) => {
    console.log(`connect_error.${JSON.stringify(error)}`);
});

socket.on('connect_timeout', () => {
    console.log('connect_timeout.');
});

socket.on('reconnect', (attempt) => {
    console.log(`reconnect count:${attempt}`);
});

socket.on('reconnect_attempt', (attempt) => {
    console.log(`reconnect_attempt count:${attempt}`);
});

socket.on('reconnecting', (attempt) => {
    console.log(`reconnecting count:${attempt}`);
});

socket.on('reconnect_error', (error) => {
    console.log(`reconnect_error.${JSON.stringify(error)}`);
});

socket.on('reconnect_failed', () => {
    console.log('reconnect_failed.');
});
