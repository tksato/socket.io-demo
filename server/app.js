/**
 * socket.io server
 */

const config = require('./config.json');
const io = require('socket.io').listen(config.port);
console.log(`listened port:${config.port}`);

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
