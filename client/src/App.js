import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");


  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(data.message);
    });
  }, [message]);

  const handleMessage = () => {
    socket.emit('send_message',{ message, room});
  }

  const joinRoom = () => {
    if (room === "") return;
    socket.emit('join_room', room);
  }

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <input type="text" placeholder='Enter a room name' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join</button> <br />
      <input type="text" placeholder="message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleMessage}>Send</button>
      {messages}
    </div>
  );
}

export default App;
