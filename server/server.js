const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

let waitingUsers = {}; // Store users waiting for a chat partner with socket ID as key
let userRooms = {}; // Map socket IDs to rooms

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("find_partner", (username) => {
        socket.username = username;

        if (Object.keys(waitingUsers).length > 0) {
            // Get first waiting user
            let partnerId = Object.keys(waitingUsers)[0];
            let partnerSocket = waitingUsers[partnerId];

            let room = `room-${socket.id}-${partnerSocket.id}`;
            socket.join(room);
            partnerSocket.join(room);

            userRooms[socket.id] = room;
            userRooms[partnerSocket.id] = room;

            delete waitingUsers[partnerId];

            io.to(room).emit("chat_started", { room, users: [socket.id, partnerSocket.id] });
            console.log(`Paired ${socket.id} with ${partnerSocket.id} in room ${room}`);
        } else {
            // No available users, add to waiting list
            waitingUsers[socket.id] = socket;
            console.log(`User ${socket.id} is waiting for a partner`);
        }
    });

    socket.on("join_room", (data) => {
        socket.join(data.room);
        socket.username = data.username;
        userRooms[socket.id] = data.room;

        console.log(`User with ID: ${socket.id} and username: ${socket.username} joined room: ${data.room}`);
        socket.to(data.room).emit("user_joined", { id: socket.id, username: socket.username, room: data.room });
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', {
            message: data.message,
            username: socket.username,
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}, Username: ${socket.username}`);

        // Notify the room that the user has left
        const room = userRooms[socket.id];
        if (room) {
            socket.to(room).emit('receive_message', {
                message: `${socket.username || "A user"} has left the chat.`,
                username: "System",
            });
            delete userRooms[socket.id]; // Remove user from room tracking
        }

        // Remove from waiting users if still waiting
        if (waitingUsers[socket.id]) {
            delete waitingUsers[socket.id];
        }
    });
});

// Serve the client app
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
