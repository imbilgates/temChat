import { useState } from 'react';

function RoomJoin() {
    const [rooms, setRooms] = useState("");
    const [username, setUsername] = useState("");

    const joinRoom = () => {
        if (rooms.trim() === "") return;
        const data = {
            room: rooms,
            username
        };
        localStorage.setItem('room', JSON.stringify(data));
        setRooms("");
        window.location.reload();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a room name"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={joinRoom}>Join</button>
        </div>
    );
}

export default RoomJoin;
