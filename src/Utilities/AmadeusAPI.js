import axios from 'axios';
import qs from 'qs';

export const authenticate = async () => {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    await axios.post(`${process.env.REACT_APP_AUTHENTICATE_URL}`, qs.stringify({
        "grant_type": "client_credentials",
        "client_id": process.env.REACT_APP_KEY,
        "client_secret": process.env.REACT_APP_SECRET
    }), config)
        .then(response => {
            sessionStorage.setItem("amadeus-token", response.data.access_token);
        })
        .catch(error => {
            throw error;
        });
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
                        label: value.name + ", " + value.country + " (" + value.iata + ")",
                        value: value.iata                        
                    });
                }
            })

            console.log(data);

            // Object(tmpResult).map((value){
            //     if(value.iata !== '') {
            //         data.push({
            //             value: value.iata,
            //             label: value.name + ", " + value.country + " (" + value.iata + ")"
            //         });

            //         i++;
            //     }
            // })

            return data;
        })
}