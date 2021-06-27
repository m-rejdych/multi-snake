import React, { useEffect } from 'react';
import io from 'socket.io-client';

console.log(process.env.SERVER_URL);
const socket = io(process.env.SERVER_URL || 'http://localhost:4000');

export const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    return () => {
      socket.disconnect();
      console.log('disconnected');
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
