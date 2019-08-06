import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container } from 'reactstrap';

const getFlights = async(data) => {
    console.log(await getFlightOffer(data));
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

    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={async() => await getFlights(data)}>
                            Get flights
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Search;