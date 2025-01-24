import { useState, useEffect } from 'react';
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

    return (
        <div>
            <form action="" onSubmit={handleMessage}>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>

            <div>
                {messages.map((msg, index) => (
                    <MessageCard
                        key={index}
                        message={msg.message}
                        isSentByCurrentUser={msg.username === locRoom.username}
                        otherUser={msg.username}
                    />
                ))}
            </div>


        </div>
    );
}

export default ChatRoom;
