import RoomJoin from './pages/RoomJoin';
import ChatRoom from './pages/ChatRoom';

function App() {
  const locRoom = JSON.parse(localStorage.getItem('room'));

  const exitRoom = () => {
    localStorage.removeItem("room");
    window.location.reload();
  };

  return (
    <div className="App">
      {locRoom && <h3>{locRoom.room}-Room <button onClick={exitRoom}>Exit</button></h3>}
      <h1>Welcome! <b>{locRoom && locRoom.username}</b></h1>
      {!locRoom && <h3>Join a room to start chatting!</h3>}
      {!locRoom ? (
        <RoomJoin />
      ) : (
        <ChatRoom />
      )}
    </div>
  );
}

export default App;
