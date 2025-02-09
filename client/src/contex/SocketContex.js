import { createContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io("http://localhost:5000"), []);

    useEffect(() => {
        return () => {
            socket.disconnect(); 
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };
