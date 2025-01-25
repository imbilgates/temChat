import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageCard from '../component/MessageCard';

const socket = io('http://localhost:5000');

function ChatRoom() {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const locRoom = JSON.parse(localStorage.getItem('room'));

    useEffect(() => {
        if (!socket || !locRoom) return;

        socket.emit('join_room', { room: locRoom.room, username: locRoom.username });

        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, { message: data.message, username: data.username }]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [locRoom]);

    const handleMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") return;
        setMessages((prevMessages) => [...prevMessages, { message, username: locRoom.username }]);
        socket.emit('send_message', { message, room: locRoom.room });
        setMessage("");
    };

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-100 p-4 bg-gray-100 mt-6">


            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
                {messages.map((msg, index) => (
                    <MessageCard
                        key={index}
                        message={msg.message}
                        isSentByCurrentUser={msg.username === locRoom.username}
                        otherUser={msg.username}
                    />
                ))}
            </div>

            <form
                action=""
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
