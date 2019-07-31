import React, { useContext, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import DayPicker from 'react-day-picker/DayPickerInput';
import { Container, Row, Col } from 'reactstrap';

import { authenticate, getIATACode } from '../../Utilities/AmadeusAPI';

import { FlightContext } from '../Contexts/FlightContext';

import { 
    originPlaceholder,
    departureDatePlaceholder,
    destinationPlaceholder,
    destinationDatePlaceholder
 } from '../../Constants/flightSearchConstants';

import './FlightSearch.css';
import 'react-day-picker/lib/style.css';

import FaPlane from 'react-icons/lib/fa/plane';
import FaCalendar from 'react-icons/lib/fa/calendar';

const FlightSearch = () => {
    const [
        [originText, originSearch],
        [destinationText, destinationSearch],
        [destinationDate, setDestinationDate],
        [departureDate, setDepartureDate]
    ] = useContext(FlightContext);

    const [tmpDepartureDate, setTmpDepartureDate] = useState('');
    const [tmpDestinationDate, setTmpDestinationDate] = useState('');

    useEffect(() => {
        async function storeAccessToken() {
            sessionStorage.setItem("amadeus-token", await authenticate());
        }

        storeAccessToken();
    }, []);

    useEffect(() => {
        let result = new Date();
        result = departureDate;
        let replaced = result
            .toISOString()
            .split('T')[0];
        setTmpDepartureDate(replaced);
    },[departureDate, tmpDepartureDate])

    useEffect(() => {
        let result = new Date();
        result = destinationDate;
        let replaced = result
            .toISOString()
            .split('T')[0];
            setTmpDestinationDate(replaced);
    },[destinationDate, tmpDestinationDate])
    
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const getDepartureSuggestions = async () => {
        return await getIATACode(originText)
            .then(result => {
                setDepartureSuggestions(result);
                return departureSuggestions;
            })
            .catch(error => {
                throw error;
            });
    }

    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const getDestinationSuggestions = async () => {
        return await getIATACode(destinationText)
            .then(result => {
                setDestinationSuggestions(result);
                return destinationSuggestions;
            })
            .catch(error => {
                throw error;
            });
    }

    return(
        <div id="flightHeader">
            <Container>
                <Row>
                    <Col id="departure" xs={6} lg={6} className="leftColumnStyle">
                        <div className="connected formatComponents">
                            <FaPlane size="28" className="connected"/>
                            <AsyncSelect
                                className="selectStyle connected"
                                placeholder={originPlaceholder}
                                options={departureSuggestions}
                                loadOptions={async() => await getDepartureSuggestions()}
                                onInputChange={(e) => originSearch(e)}
                                isClearable={true}
                            />
                        </div>    
                        <div id="departureDate" className="connected formatComponents">
                            <FaCalendar className="connected" size="20"/>
                            <DayPicker
                                className="connected"
                                onDayChange={(date) => setDepartureDate(date)}
                                selectedDays={departureDate}
                                placeholder={departureDatePlaceholder}
                            />
                        </div>
                    </Col>

                    <Col id="destination" xs={6} lg={6} className="leftColumnStyle">
                        <div className="connected formatComponents">
                            <FaPlane size="28" className="connected"/>
                            <AsyncSelect
                                className="selectStyle connected"
                                placeholder={destinationPlaceholder}
                                options={destinationSuggestions}
                                loadOptions={async() => await getDestinationSuggestions()}
                                onInputChange={(e) => destinationSearch(e)}
                                isClearable={true}
                            />
                        </div>
                        <div className="connected formatComponents">
                            <FaCalendar className="connected" size="20"/>
                            <DayPicker
                                className="connected"
                                onDayChange={(date) => setDestinationDate(date)}
                                selectedDays={destinationDate}
                                placeholder={destinationDatePlaceholder}
                            />
                        </div>
                        <div>
                            optional
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FlightSearch;