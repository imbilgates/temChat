import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contex/SocketContex';

function RandomJoin() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on("chat_started", (data) => {
            setIsLoading(false);
            localStorage.setItem('room', JSON.stringify({ room: data.room, username }));
            window.location.reload();
        });

        return () => {
            socket.off("chat_started");
        };
    }, [socket, username]);

    const findPartner = (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setIsLoading(true);
        socket.emit("find_partner", username);
    };

    return (
        <div className="flex flex-col items-center justify-center text-white px-4">
            <div className="bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-sm text-center border border-gray-700 relative overflow-hiddenn">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
                <h1 className="text-3xl font-bold mb-4 relative z-10">Talk With Strangers</h1>
                <form onSubmit={findPartner} className="relative z-10">
                    <input
                        type="text"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={`w-full font-semibold py-2 rounded-lg focus:outline-none transition-all duration-300 text-white shadow-md 
                        ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Finding a partner..." : "Find Partner"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RandomJoin;