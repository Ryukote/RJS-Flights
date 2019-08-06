import React, { useContext, useState } from 'react';
import { Button } from 'reactstrap';
import { getFlightOffer } from '../../Utilities/AmadeusAPI';
import { FlightContext } from '../Contexts/FlightContext';
import { Row, Col, Container, Spinner } from 'reactstrap';
import './Search.css';


const GetFlights = async(data) => {
    let result = await getFlightOffer(data);
    // toggleSpinner(false);
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

    const [spinnerValue, toggleSpinner] = useState(true);
    const [flights, setFlights] = useState({});
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Button className="fixedCenter" onClick={async() => {
                            toggleSpinner(false);
                            await GetFlights(data);
                            toggleSpinner(true);
                        }}>
                            Get flights
                        </Button>
                    </Col>
                </Row>
            </Container>

            <div className={spinnerValue ? 'hidden' : 'absoluteCenter' }>
                <Spinner 
                    type="grow" 
                    color="info"
                />
            </div>

            {
                // (flights !== undefined && flights.length > 0)
                //     ? 
                //         Object(flights).map((value, key) => {
                //             let data = value.offerItems;
                //             let baseRender = Object(data).map((base, dataKey) => {
                //                 console.log(base);
                //                 return <BaseData base={base}/>
                //             })

                //             let detailRender = Object(data).map((details, key) => {
                //                 return <DetailData details={details}/>
                //             })

                //             return baseRender + detailRender;
                //         })
                //     : ''
            }
        </div>
    );
}

export default Search;