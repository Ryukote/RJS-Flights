import React, { createContext, useState } from 'react';

export const FlightContext = createContext();

export const FlightProvider = (props) => {
    const [originText, originSearch] = useState('');
    const [destinationText, destinationSearch] = useState('');
    const [originIATA, setOriginIATA] = useState('');
    const [destinationIATA, setDestinationIATA] = useState('');
    const [destinationDate, setDestinationDate] = useState(new Date());
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureDateText, setDepartureDateText] = useState('');
    const [destinationDateText, setDestinationDateText] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [seniors, setSeniors] = useState(0);
    const [travelClass, setTravelClass] = useState('');
    const [currency, setCurrency] = useState('');

    return (
        <FlightContext.Provider
            value={[
                [originText, originSearch],
                [destinationText, destinationSearch],
                [originIATA, setOriginIATA],
                [destinationIATA, setDestinationIATA],
                [destinationDate, setDestinationDate],
                [departureDate, setDepartureDate],
                [departureDateText, setDepartureDateText],
                [destinationDateText, setDestinationDateText],
                [adults, setAdults],
                [children, setChildren],
                [infants, setInfants],
                [seniors, setSeniors],
                [travelClass, setTravelClass],
                [currency, setCurrency]
            ]}
        >
            {props.children}
        </FlightContext.Provider>
    )
}