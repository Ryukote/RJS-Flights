import React, { useContext, useState, useEffect, useConstant } from 'react';
import AsyncSelect from 'react-select/async';
import DayPicker from 'react-day-picker/DayPickerInput';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import dayjs from 'dayjs';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

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
    const {
        departureDate,
        departureDateText,
        destinationDate,
        destinationDateText,
        originText,
        destinationText,
        originIATA,
        destinationIATA
    } = useContext(FlightContext);

    useEffect(() => {
        async function storeAccessToken() {
            sessionStorage.setItem("amadeus-token", await authenticate());
        }

        storeAccessToken();
    }, []);

    useEffect(() => {
        let result = new Date();
        result = departureDate[0];
        
        if(moment(result, 'yyyy-MM-dd', true).isValid()) {
            let replaced = result
                .toISOString()
                .split('T')[0];
                departureDateText[1](replaced);
        }
    },[departureDate, departureDateText])

    useEffect(() => {
        let result = new Date();
        result = destinationDate.value;

        if(moment(result, 'yyyy-MM-dd', true).isValid() &&
            dayjs(departureDate[0]).isBefore(dayjs(result))) {
                let replaced = result
                    .toISOString()
                    .split('T')[0];
                    destinationDateText[1](replaced);
        } else {
            destinationDateText[1]('');
        }
    },[destinationDate, destinationDateText, departureDate])
    
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const getDepartureSuggestions = async () => {
        return await getIATACode(originText[0])
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
        return await getIATACode(destinationText[0])
            .then(result => {
                setDestinationSuggestions(result);
                return destinationSuggestions;
            })
            .catch(error => {
                throw error;
            });
    }

    const searchOriginIATA = AwesomeDebouncePromise(async() => await getDepartureSuggestions(), 30);

    const searchDestinationIATA = AwesomeDebouncePromise(async() =>  await getDestinationSuggestions(), 30);

    return(
        <div id="flightHeader">
            <Container>
                <Row>
                    <Col id="departure" xs={12} md={6} lg={6}                       className="leftColumnStyle">
                        <div className="connected formatComponents">
                            <FaPlane size="28" className="connected"/>
                            <AsyncSelect
                                className="selectStyle connected"
                                placeholder={originPlaceholder}
                                options={departureSuggestions}
                                loadOptions={async() => await searchOriginIATA()}
                                onInputChange={(e) => originText[1](e)}
                                isClearable={true}
                                onChange={(data) => originIATA[1](data)}
                            />
                        </div>    
                        <div id="departureDate" className="connected formatComponents">
                            <FaCalendar className="connected" size="20"/>
                            <DayPicker
                                className="connected"
                                onDayChange={(date) => departureDate[1](date)}
                                selectedDays={departureDate[0]}
                                placeholder={departureDatePlaceholder}
                            />
                        </div>
                    </Col>

                    <Col id="destination" xs={12} md={6} lg={6} className="leftColumnStyle">
                        <div className="connected formatComponents">
                            <FaPlane size="28" className="connected"/>
                            <AsyncSelect
                                className="selectStyle connected"
                                placeholder={destinationPlaceholder}
                                options={destinationSuggestions}
                                loadOptions={async() => await searchDestinationIATA()}
                                onInputChange={(e) => destinationText[1](e)}
                                isClearable={true}
                                onChange={(data) => destinationIATA[1](data.value)}
                            />
                        </div>
                        <div className="connected formatComponents">
                            <FaCalendar className="connected" size="20"/>
                            <DayPicker
                                className="connected"
                                onDayChange={(date) => destinationDate[1](date)}
                                selectedDays={destinationDate[0]}
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