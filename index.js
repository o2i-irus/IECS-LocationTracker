const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Server Working');
});

io.on('connection', socket => {
    socket.on('updateLocation', ({ lat, lng }) => {
        console.log('got ping');
        socket.emit('_pong');
    });
});

server.listen(1111, err => {
    if (err) {
        throw err;
    }
    console.log('Server Started');
});