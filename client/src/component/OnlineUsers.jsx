import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contex/SocketContex";

export default function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (count) => {
      setOnlineUsers(count);
      console.log(`Online users updated: ${count}`);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket]);

  return (
    <>
      <div className="fixed top-4 left-4 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border border-green-400">
        <div className="relative w-4 h-4">
          <span className="absolute w-full h-full bg-green-500 rounded-full animate-pulse"></span>
          <span className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></span>
        </div>
        <h2 className="text-lg font-semibold">Online: {onlineUsers - 2}</h2>  
        {/* -2 for server */}
      </div>
    </>
  );
}
