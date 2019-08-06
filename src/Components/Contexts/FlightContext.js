import React, { createContext, useState } from 'react';

export const FlightContext = createContext();

export const FlightProvider = (props) => {
    const [originTextValue, originSearch] = useState('');
    const [destinationTextValue, destinationSearch] = useState('');
    const [originIATAValue, setOriginIATA] = useState('');
    const [destinationIATAValue, setDestinationIATA] = useState('');
    const [destinationDateValue, setDestinationDate] = useState(new Date());
    const [departureDateValue, setDepartureDate] = useState(new Date());
    const [departureDateTextValue, setDepartureDateText] = useState('');
    const [destinationDateTextValue, setDestinationDateText] = useState('');
    const [adultsValue, setAdults] = useState(1);
    const [currencyValue, setCurrency] = useState('');

    const context = {
        originText: [originTextValue, originSearch],
        destinationText: [destinationTextValue, destinationSearch],
        originIATA: [originIATAValue, setOriginIATA],
        destinationIATA: [destinationIATAValue, setDestinationIATA],
        destinationDate: [destinationDateValue, setDestinationDate],
        departureDate: [departureDateValue, setDepartureDate],
        departureDateText: [departureDateTextValue, setDepartureDateText],
        destinationDateText: [destinationDateTextValue, setDestinationDateText],
        adults: [adultsValue, setAdults],
        currency: [currencyValue, setCurrency]
    }

    return (
        <FlightContext.Provider
            value={context}
        >
            {props.children}
        </FlightContext.Provider>
    )
}