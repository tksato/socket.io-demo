/**
 * socket.io server
 */

import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv'; 
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// dotenv
dotenv.config({
  path: path.join(__dirname, '/.env'),
});

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


const port = process.env.PORT;
server.listen(process.env.PORT);
console.log(`listened port:${port}`);

/**
 * test API
 * HTTP GET
 */
app.get('/test', (req, res) => {
  console.log('execute test API.');

  io.emit('test', 'test!!');
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
