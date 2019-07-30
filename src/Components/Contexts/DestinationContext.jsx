import React, { createContext, useState } from 'react';

const DestinationContext = createContext();

const DestinationProvider = () => {
    const [destinationText, destinationSearch] = useState('');
    function handleDestinationSearch(e) {
        destinationSearch(e.target.value);
    }

    return (
        <DestinationContext.Provider
            value={[destinationText, handleDestinationSearch]}
        />
    );
}

export {DestinationContext, DestinationProvider};