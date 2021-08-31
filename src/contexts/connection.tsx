import React, { createContext, useContext } from 'react';
import { io, Socket } from "socket.io-client";
import { ENDPOINTS } from '../constants';

interface ConnectionConfig {
    socket?: Socket
}
const value = {
    // socket: io(ENDPOINTS.COINBASE_WS)
}
const ConnectionContext = createContext<ConnectionConfig>(value);

export function ConnectionProvider({ children = undefined as any }) {
    return (
        <ConnectionContext.Provider value={value}>
            {children}
        </ConnectionContext.Provider>
    );
}

export function useConnection() {
    return useContext(ConnectionContext).socket as Socket;
}