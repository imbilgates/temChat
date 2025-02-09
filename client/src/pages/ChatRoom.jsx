import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import MessageCard from '../component/MessageCard';
import { toast } from 'react-toastify';
import { SocketContext } from '../contex/SocketContex'

function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const { socket } = useContext(SocketContext)

    const locRoom = useRef(JSON.parse(localStorage.getItem('room')));

    // Join room and set up socket listeners
    useEffect(() => {
        if (!socket || !locRoom.current) return;

        const { room, username } = locRoom.current;

        socket.emit('join_room', { room, username });

        const handleReceiveMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, { message: data.message, username: data.username }]);
        };

        const handleUserJoined = (data) => {
            toast(`${data.username} joined the room`);
        };

        socket.on('receive_message', handleReceiveMessage);
        socket.on('user_joined', handleUserJoined);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.off('user_joined', handleUserJoined);
        };
    }, [socket]);

    const handleMessage = useCallback(
        (e) => {
            e.preventDefault();
            if (message.trim() === "") return;

            const { username, room } = locRoom.current;

            setMessages((prevMessages) => [...prevMessages, { message, username }]);
            socket.emit('send_message', { message, room });
            setMessage("");
        },
        [message, socket]
    );

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-100 p-4 bg-gray-100 mt-6">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            >
                {messages.map((msg, index) => (
                    <MessageCard
                        key={index}
                        message={msg.message}
                        isSentByCurrentUser={msg.username === locRoom.current.username}
                        otherUser={msg.username}
                    />
                ))}
            </div>

            <form
                onSubmit={handleMessage}
                className="flex items-center space-x-2 p-2 rounded-lg"
            >
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border border-black rounded-lg bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    type="submit"
                    className="px-4 py-2 border border-black text-black font-semibold rounded-lg bg-transparent hover:bg-black hover:text-white"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatRoom;
