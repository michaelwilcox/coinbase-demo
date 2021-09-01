import React, { createContext, useContext, useState } from 'react';

const defaultValue = { ticker: '' }
export const TickerContext = createContext<any>(defaultValue);

export function TickerProvider({ children = undefined as any }) {
    const [ticker, setTicker] = useState('');

    return (
        <TickerContext.Provider value={{
            ticker,
            setTicker
        }}>
            {children}
        </TickerContext.Provider>
    );
}

export function useTicker() {
    return useContext(TickerContext);
}
