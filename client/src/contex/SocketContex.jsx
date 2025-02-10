import { createContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io("https://tempchat-dn7j.onrender.com"), []);

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
