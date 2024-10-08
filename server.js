// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Allow connections from any origin
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('playerAnswered', (data) => {
        console.log(data);
        if (data.correct) {
            io.emit('displayCongrats', { playerName: data.playerName }); // Emit the congrats message
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
