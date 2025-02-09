import RoomJoin from './pages/RoomJoin';
import ChatRoom from './pages/ChatRoom';
import { ToastContainer } from 'react-toastify';
import RandomJoin from './pages/RandomJoin';
import { useState } from 'react';

function App() {
  const locRoom = JSON.parse(localStorage.getItem('room'));

  const exitRoom = () => {
    localStorage.removeItem("room");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 m-2">
      <ToastContainer />
      {locRoom && (
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">
            <b className="text-blue-600">{locRoom.room.slice(locRoom.room.length - 5)+ "..."}</b>-Room
          </h3>
          <button
            onClick={exitRoom}
            className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow"
          >
            Exit
          </button>
        </div>
      )}
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome! <b className="text-blue-600">{locRoom && locRoom.username}</b>
      </h1>
      {!locRoom && (
        <h3 className="text-lg text-gray-600">
          Join a room to start chatting!
        </h3>
      )}
      <div className="">
        {!locRoom ? <RootLayout /> : <ChatRoom />}
      </div>
    </div>
  );
}

export default App;

const RootLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {toggle ? <RoomJoin /> : <RandomJoin />}
      </div>
      <button
        onClick={() => setToggle((prv) => !prv)}
        className="fixed bottom-60 left-1/2 transform -translate-x-1/2 
             cursor-pointer hover:blue-600 transition duration-300 z-50"
      >
        {toggle ? "Strangers Chat?" : "Room Chat?"}
      </button>


    </div>
  );
};


