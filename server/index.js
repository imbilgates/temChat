const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io")


app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data.room);
        socket.username = data.username;
        console.log(`User with ID: ${socket.id} and username: ${socket.username} joined room: ${data.room}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', {
            message: data.message,
            username: socket.username,
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}, Username: ${socket.username}`);
    });
});



io.listen(5000, () => {
    console.log('Server is running on port 5000');
});