import React, { useEffect } from 'react';
import { useTicker } from '../../contexts/ticker';

export const TickerDetails = () => {
    const { ticker } = useTicker();

    useEffect(() => {
        console.log('TickerDetails: useEffect updated', ticker);
    }, [ticker]);

    return <div>{ticker}</div>;
}