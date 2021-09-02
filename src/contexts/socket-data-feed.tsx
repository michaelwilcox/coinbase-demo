import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultValue = { ticker: '' }
export const SocketDataFeedContext = createContext<any>(defaultValue);

export function SocketDataFeedProvider({ children = undefined as any }) {
    const [data, setData] = useState('');

    return (
        <SocketDataFeedContext.Provider value={{
            data
        }}>
            {children}
        </SocketDataFeedContext.Provider>
    );
}

export function useDataFeed() {
    return useContext(SocketDataFeedContext);
}
