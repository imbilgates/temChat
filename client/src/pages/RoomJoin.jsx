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
        setRooms("")
        setUsername("")
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center mt-6 min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-sm">
                <form action="" onSubmit={joinRoom}>
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">Join a Room</h1>
                    <input
                        type="text"
                        placeholder="Enter a room name"
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RoomJoin;
