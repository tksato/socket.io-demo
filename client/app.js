/**
 * socket.io client
 */

const options = {
    'reconnectionAttempts': 10,
    'reconnectionDelay': 100,
    'reconnectionDelayMax': 300,
    'timeout': 5000,
};


import { io } from 'socket.io-client';
import * as dotenv from 'dotenv'; 
import path from 'path';
import {fileURLToPath} from 'url';

// dotenv
configDotEnv();

const host = process.env.HOST;
const socket = io(host);

socket.on('connect', () => {
    console.log(`client connected host:${host}`);
});

// test
socket.on('test', (data) => {
    console.log(`test ${data}`);
});

socket.on('message', (data) => {
    console.log(`message:${data}`);
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

/**
 * dotenvの設定
 */
function configDotEnv() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    dotenv.config({
        path: path.join(__dirname, '/.env'),
    });
}
