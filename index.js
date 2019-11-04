const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const locationMap = new Map();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/tracker.html');
});

io.on('connection', socket => {
    socket.on('updateLocation', pos => {
        locationMap.set(socket.id, pos);
    });

    socket.on('requestLocation', () => {
        socket.emit('locationUpdate', Array.from(locationMap));
    });

    socket.on('disconnect', () => {
        locationMap.delete(socket.id);
    });
});

server.listen(1111, err => {
    if (err) {
        throw err;
    }
    console.log('Server Started');
});