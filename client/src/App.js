import RoomJoin from './pages/RoomJoin';
import ChatRoom from './pages/ChatRoom';
import { ToastContainer } from 'react-toastify';
import { useRef } from 'react';

function App() {
  const locRoom = useRef(JSON.parse(localStorage.getItem('room')));

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
            {locRoom.room}-Room
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
        {!locRoom ? <RoomJoin /> : <ChatRoom />}
      </div>
    </div>
  );
}

export default App;
