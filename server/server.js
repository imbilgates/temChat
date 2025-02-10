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

let onlineUsers = new Set(); // Store unique users
let waitingUsers = {}; // Users waiting for a chat partner
let userRooms = {}; // Maps socket IDs to rooms

io.on('connection', (socket) => {
    onlineUsers.add(socket.id);
    io.emit("onlineUsers", onlineUsers.size);

    console.log(`User connected: ${socket.id} | Online Users: ${onlineUsers.size}`);

    socket.on("find_partner", (username) => {
        socket.username = username || `Guest-${socket.id.slice(-4)}`;

        if (Object.keys(waitingUsers).length > 0) {
            let partnerId = Object.keys(waitingUsers)[0];

            if (!io.sockets.sockets.get(partnerId)) {
                delete waitingUsers[partnerId]; // Cleanup if disconnected
                waitingUsers[socket.id] = socket;
                return;
            }

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
            waitingUsers[socket.id] = socket;
            console.log(`User ${socket.id} is waiting for a partner`);
        }
    });

    socket.on("join_room", (data) => {
        socket.join(data.room);
        socket.username = data.username;
        userRooms[socket.id] = data.room;

        console.log(`User ${socket.id} (${socket.username}) joined room: ${data.room}`);
        socket.to(data.room).emit("user_joined", { id: socket.id, username: socket.username, room: data.room });
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', {
            message: data.message,
            username: socket.username,
        });
    });

    socket.on('disconnect', () => {
        onlineUsers.delete(socket.id);
        io.emit("onlineUsers", onlineUsers.size);

        const username = socket.username || `Guest-${socket.id.slice(-4)}`;
        console.log(`User disconnected: ${socket.id} (${username}) | Online Users: ${onlineUsers.size}`);

        const room = userRooms[socket.id];
        if (room) {
            socket.to(room).emit('receive_message', {
                message: `${username} has left the chat.`,
                username: "System",
            });
            delete userRooms[socket.id];
        }

        delete waitingUsers[socket.id]; // Remove user from waiting list
    });
});

// Serve the client app
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
