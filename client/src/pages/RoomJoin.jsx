import { useState } from 'react';

function RoomJoin() {
    const [rooms, setRooms] = useState("");

    const joinRoom = () => {
        if (rooms.trim() === "") return;
        localStorage.setItem('room', rooms);
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
            <button onClick={joinRoom}>Join</button>
        </div>
    );
}

export default RoomJoin;
