import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container, Spinner } from 'reactstrap';

import FlightPanel from '../FlightPanel/FlightPanel';

import './Search.css';

const GetFlights = async(data) => {
    return await getFlightOffer(data);
}

const Search = () => {
    const {
        originText,
        destinationText,
        originIATA,
        destinationIATA,
        destinationDate,
        departureDateText,
        destinationDateText,
        adults
    } = useContext(FlightContext);

    let data = {
        originText,
        destinationText,
        originIATA,
        destinationIATA,
        destinationDate,
        departureDateText,
        destinationDateText,
        adults,
    }

    const [flights, setFlights] = useState({});
    const [isFlightsReady, setFlightsReady] = useState(false);
    const [spinnerValue, toggleSpinner] = useState(true);
    useEffect(() => {
        if(Object.keys(flights).length > 0) {
            setFlightsReady(true);
        }
    }, [flights]);
    
    return(
        <div>
            <div>
            <Container>
                <Row>
                    <Col>
                        <Button className="fixedCenter" onClick={async() => {
                            toggleSpinner(false);                            
                            setFlights(await GetFlights(data));
                            toggleSpinner(true);
                        }}>
                            Get flights
                        </Button>
                    </Col>
                </Row>
                <br/>
                <br/>
            </Container>

            <div className={spinnerValue ? 'hidden' : 'absoluteCenter' }>
                <Spinner 
                    type="grow" 
                    color="info"
                />
            </div>
        </div>

<div id="result">
{
    isFlightsReady
        ?
            <Container>
                {
                    Object(flights).map((value, key) => {
                        return (
                            <Row key={key}>
                                <Col 
                                    sm={{size: 10, offset: 1}}
                                    md={{size: 10, offset: 1}}
                                    lg={{size: 10, offset: 1}}
                                >
                                    <FlightPanel value={value} key={key}/>
                                </Col>
                            </Row>
                        );
                    })
                }
            </Container>
        : ""
}
</div>
        </div>
    );
}

export default Search;