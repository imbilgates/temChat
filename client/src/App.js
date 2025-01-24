import RoomJoin from './pages/RoomJoin';
import ChatRoom from './pages/ChatRoom';

function App() {
  const locRoom = localStorage.getItem('room');

  const exitRoom = () => {
    localStorage.removeItem("room");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Welcome! {locRoom && <button onClick={exitRoom}>Exit</button>}</h1>
      {!locRoom ? (
        <RoomJoin />
      ) : (
        <ChatRoom />
      )}
    </div>
  );
}

export default App;
