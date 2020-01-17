/**
 * socket.io server
 */

const config = require('./config.json');
const io = require('socket.io').listen(config.port);
console.log(`listened port:${config.port}`);

// connect
io.sockets.on('connect', (socket) => {
    console.log('connected.');

    socket.emit('message', 'connect success。');

    // disconnect
    socket.on('disconnect', (data) => {
        console.log(data);
        console.log('disconnected');
    });
});
