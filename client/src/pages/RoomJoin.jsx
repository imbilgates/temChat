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
        setUsername("");
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center text-white px-2">
            <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-sm text-center border border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
                <h1 className="text-3xl font-bold mb-4 relative z-10">Join a Room</h1>
                <form onSubmit={joinRoom} className="relative z-10">
                    <input
                        type="text"
                        placeholder="Enter a room name"
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type='submit'
                        className="w-full font-semibold py-2 rounded-lg focus:outline-none transition-all duration-300 text-white shadow-md bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RoomJoin;
