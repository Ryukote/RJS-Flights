import React, { createContext, useState } from 'react';

export const FlightContext = createContext();

export const FlightProvider = (props) => {
    const [originText, originSearch] = useState('');
    const [destinationText, destinationSearch] = useState('');
    const [destinationDate, setDestinationDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());

    return (
        <FlightContext.Provider
            value={[
                [originText, originSearch],
                [destinationText, destinationSearch],
                [destinationDate, setDestinationDate],
                [departureDate, setDepartureDate]
            ]}
        >
            {props.children}
        </FlightContext.Provider>
    )
}