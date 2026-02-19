const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    socket.on('set name', (name) => {
        socket.username = name || 'Anonymous';
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { msg, name: socket.username || 'Anonymous' });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});
