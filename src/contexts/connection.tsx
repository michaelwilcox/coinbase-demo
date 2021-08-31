import React, { createContext, useContext } from 'react';
import ws, { WebSocketClient } from '../utils/websocket';

interface ConnectionConfig {
    socket: WebSocketClient
}
const value = {
    socket: ws
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
    return useContext(ConnectionContext).socket as WebSocketClient;
}
