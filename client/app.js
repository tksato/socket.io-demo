/**
 * socket.io client
 */

const config = require('./config.json');
const client = require('socket.io-client');
const socket = client.connect(config.host);
let reconnectCount = 0;

socket.on('connect', () => {
    console.log(`client connected host:${config.host}`);
});

socket.on('message', (data) => {
    console.log(`message：${data}`);
});

socket.on('connect_error', () => {
    console.log('connect_error.');
});

socket.on('connect_timeout', () => {
    console.log('connect_timeout.');
});

socket.on('reconnect', () => {
    console.log('reconnect');
});

socket.on('reconnect_attempt', () => {
    reconnectCount++;
    console.log(`reconnect_attempt count:${reconnectCount}`);
});

socket.on('reconnecting', () => {
    console.log('reconnecting.');
});

socket.on('reconnect_error', () => {
    console.log('reconnect_error.');
});

socket.on('reconnect_failed', () => {
    console.log('reconnect_failed.');
});
