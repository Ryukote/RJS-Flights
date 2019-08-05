import React, { useContext, useState } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container } from 'reactstrap';
import BaseData from '../BaseData/BaseData';
import DetailData from '../DetailData/DetailData';

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

    const [flights, setFlights] = useState({});
    return(
        <div className="full">
            <Container className="full">
                <Row className="centerButton">
                    <Col className="full">
                        <Button onClick={async() => 
                            setFlights(await getFlightOffer(data))}>
                            Get flights
                        </Button>
                    </Col>
                </Row>
            </Container>

            {
                (flights !== undefined && flights.length > 0)
                    ? 
                        Object(flights).map((value, key) => {
                            let data = value.offerItems;
                            let baseRender = Object(data).map((base, dataKey) => {
                                console.log(base);
                                return <BaseData base={base}/>
                            })

                            let detailRender = Object(data).map((details, key) => {
                                return <DetailData details={details}/>
                            })

                            return baseRender + detailRender;
                        })
                    : ''
            }
        </div>
    );
}

export default Search;