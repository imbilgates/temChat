import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contex/SocketContex';

function RandomJoin() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on("chat_started", (data) => {
            setIsLoading(false); // Stop loading once paired
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
        setIsLoading(true); // Start loading
        socket.emit("find_partner", username);
    };

    return (
        <div className="flex flex-col items-center mt-6 min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                    Talk With Strangers
                </h1>
                <form onSubmit={findPartner}>
                    <input
                        type="text"
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={isLoading} // Disable input when searching
                    />
                    <button
                        type="submit"
                        className={`w-full text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1
                        ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"}`}
                        disabled={isLoading} // Disable button while searching
                    >
                        {isLoading ? "Finding a partner..." : "Find Partner"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RandomJoin;
