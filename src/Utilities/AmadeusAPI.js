import axios from 'axios';
import qs from 'qs';
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