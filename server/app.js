/**
 * socket.io server
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv'; 
import path from 'path';
import {fileURLToPath} from 'url';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

// dotenv
configDotEnv();

// create server
const app = express();
const server = createServer(app);
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// server listen
listenServer(server, io);

/**
 * test API
 * HTTP GET
 */
app.get('/test', (req, res) => {
    console.log('execute test API.');
    io.emit('test', `date:${getNowLocaleString()} host:${req.headers['host']}`);
    res.json('test.');
});

// connect
io.sockets.on('connect', (socket) => {
    console.log(`connected headers:${JSON.stringify(socket.handshake.headers)}`);

    socket.emit('message', 'connect success.');

    // disconnect
    socket.on('disconnect', (data) => {
        console.log(`disconnected data:${data}`);
    });
});

io.sockets.on('connection', (socket) => {
    console.log(`server connection id:${socket.id}`);
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

/**
 * server listen
 */
function listenServer(server, io) {
    // redis
    const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();

    Promise.all([
        pubClient.connect(),
        subClient.connect(),
    ])
    .then(() => {
        const port = process.env.PORT;
        io.adapter(createAdapter(pubClient, subClient));
        server.listen(port);
        console.log(`listened port:${port}`);
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

/**
 * 現在時刻をtoLocaleStringで取得
 */
function getNowLocaleString() {
    return new Date().toLocaleString();
}