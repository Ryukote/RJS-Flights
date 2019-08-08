import axios from 'axios';
import qs from 'qs';
import { numberOfFlights } from '../Constants/flightSearchConstants';
import moment from 'moment';
require('dotenv').config();

export const authenticate = async function() {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const body = qs.stringify({
        "grant_type": "client_credentials",
        "client_id": process.env.REACT_APP_KEY,
        "client_secret": process.env.REACT_APP_SECRET
    });

    let response = '';

    response = await axios.post(
        process.env.REACT_APP_AUTHENTICATE_URL,
        body,
        config
    );
    
    return response.data.access_token;
}

export const getIATACode = async (city) => {
    let data = [];

    return await axios.get(`${process.env.REACT_APP_IATA}=${city}`)
        .then(response => {
            let tmpResult = [];

            tmpResult = response.data.results;

            tmpResult.forEach((value) => {
                if(value.iata !== '') {
                    data.push({
                        label: `${value.name}, ${value.country} (${value.iata})`,
                        value: value.iata                        
                    });
                }
            })

            return data;
        })
}

export const getFlightOffer = async (data) => {
    let url = `${process.env.REACT_APP_OFFERS}?`
        + `origin=${data.originIATA[0].value}&`
        + `destination=${data.destinationIATA[0]}&`
        + `departureDate=${data.departureDateText[0]}`;

    (moment(data.destinationDateText, "yyyy-MM-dd", true).isValid()) 
        ? url += `&returnDate=${data.destinationDateText[0]}`
        : url += '';

    (data.adults > 1) 
        ? url += `&adults=${data.adults[0]}` 
        : url += '';
    
    (data.children > 0) 
        ? url += `&children=${data.children[0]}` 
        : url += '';

    (data.infants > 0) 
        ? url += `&infants=${data.infants[0]}` 
        : url += '';

    (data.seniors > 0) 
        ? url += `&seniors=${data.seniors[0]}` 
        : url += '';

    url += `&max=${numberOfFlights}`;

    let headers = {
        "Authorization": `Bearer ${sessionStorage.getItem("amadeus-token")}`
    }
    
    let response = await axios.get(
        url, {
            headers: headers
        }
    )

    return response.data.data;
}