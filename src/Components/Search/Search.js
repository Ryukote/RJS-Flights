import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container } from 'reactstrap';

const getFlights = async(data) => {
    console.log(await getFlightOffer(data));
}

const Search = () => {
    const [
        [originText],
        [destinationText],
        [originIATA],
        [destinationIATA],
        [destinationDate],
        [departureDate],
        [departureDateText],
        [destinationDateText],
        [adults],
        [children],
        [infants],
        [seniors],
        [travelClass]
    ] = useContext(FlightContext);

    let data = {
        originText,
        destinationText,
        originIATA,
        destinationIATA,
        destinationDate,
        departureDateText,
        destinationDateText,
        adults,
        children,
        infants,
        seniors,
        travelClass
    }

    return(
        <div className="full">
            <Container className="full">
                <Row className="centerButton">
                    <Col className="full">
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