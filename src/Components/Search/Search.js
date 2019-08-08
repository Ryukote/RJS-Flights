import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container, Spinner } from 'reactstrap';
import { Modal as BootstrapModal, 
    ModalHeader as BootstrapModalHeader,
    ModalBody as BootstrapModalBody,
    ModalFooter as BootstrapModalFooter
} from 'reactstrap';

import FlightPanel from '../FlightPanel/FlightPanel';

import { departureValidationMessage, destinationValidationMessage } from '../../Constants/flightSearchConstants';
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
        departureDate,
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
        departureDate,
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

    const [toggle, setToggle] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const validation = () => {
        if(originIATA[0] === '' || originIATA[0] === null) {
            setValidationMessage(departureValidationMessage)
            setToggle(!toggle);
            return 0;
        }

        else if(destinationIATA[0] === '' || destinationIATA[0] === null) {
            setValidationMessage(destinationValidationMessage)
            setToggle(!toggle);
            return 0;
        }

        return 1;
    }

    return(
        <div>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Button className="fixedCenter" onClick={async() => {
                                if(validation() === 1) {
                                    toggleSpinner(false);                            
                                    setFlights(await GetFlights(data));
                                    toggleSpinner(true);
                                }
                            }}>
                                Get flights
                            </Button>

                            <BootstrapModal isOpen={toggle} toggle={setToggle}>
                                <BootstrapModalHeader toggle={setToggle}>
                                    Non valid data
                                </BootstrapModalHeader>

                                <BootstrapModalBody>
                                    {validationMessage}
                                </BootstrapModalBody>

                                <BootstrapModalFooter>
                                    <Button color="primary" onClick={() => setToggle(!toggle)}>
                                        Ok
                                    </Button>
                                </BootstrapModalFooter>
                            </BootstrapModal>
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
                                    let keyOf = key;

                                    return (
                                        <Row key={key}>
                                            <Col 
                                                sm={{size: 10, offset: 1}}
                                                md={{size: 10, offset: 1}}
                                                lg={{size: 10, offset: 1}}
                                            >
                                                <FlightPanel value={value} keyOf={keyOf}/>
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