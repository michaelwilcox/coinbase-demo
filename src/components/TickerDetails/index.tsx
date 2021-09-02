import React from 'react';
import { useTicker } from '../../contexts/ticker';

export const TickerDetails = () => {
    const { ticker } = useTicker();
    return <div>{ticker}</div>;
}