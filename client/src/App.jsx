import RoomJoin from './pages/RoomJoin';
import ChatRoom from './pages/ChatRoom';
import { ToastContainer } from 'react-toastify';
import RandomJoin from './pages/RandomJoin';
import { useState } from 'react';
import OnlineUsers from './component/OnlineUsers';

function App() {
  const locRoom = JSON.parse(localStorage.getItem('room'));
  const [toggle, setToggle] = useState(false);

  const exitRoom = () => {
    localStorage.removeItem("room");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <ToastContainer />
      <OnlineUsers />
      {locRoom && (
        <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-300">
            <b className="text-blue-400">{locRoom.room.slice(locRoom.room.length - 6) + "..."}</b>-Room
          </h3>
          <button
            onClick={exitRoom}
            className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow-md"
          >
            Exit
          </button>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-100">
        Welcome! <b className="text-blue-400">{locRoom && locRoom.username}</b>
      </h1>
      {!locRoom && (
        <>
          <h3 className="text-lg text-gray-400">Join a room to start chatting!</h3>
          <button
            onClick={() => setToggle((prv) => !prv)}
            className="mt-4 text-blue-400 hover:text-blue-300 underline cursor-pointer transition duration-300"
          >
            {toggle ? "Strangers Chat?" : "Room Chat?"}
          </button>
          <div className="mt-6">
            {toggle ? <RoomJoin /> : <RandomJoin />}
          </div>
        </>
      )}
      {locRoom && <ChatRoom />}
    </div>
  );
}

export default App;