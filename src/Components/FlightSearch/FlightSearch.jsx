import React, { useContext, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { authenticate, getIATACode } from '../../Utilities/AmadeusAPI';
import { OriginContext } from '../Contexts/OriginContext';
import { originPlaceholder } from '../../Constants/flightSearchConstants';

const FlightSearch = () => {
    useEffect(() => {
        async function storeAccessToken() {
            sessionStorage.setItem("amadeus-token", await authenticate());
        }

        storeAccessToken();
    }, []);

    const [originText, originSearch] = useContext(OriginContext);
    
    const [suggestions, setSuggestions] = useState([]);
    const getIATASuggestions = async () => {
        return await getIATACode(originText)
            .then(result => {
                console.log(originText)
                setSuggestions(result);
                return suggestions;
            })
            .catch(error => {
                throw error;
            });
    }

    return(
        <div id="flightSearch">
            <div id="originIATA">
                <AsyncSelect
                    placeholder={originPlaceholder}
                    options={suggestions}
                    loadOptions={async() => await getIATASuggestions()}
                    onInputChange={(e) => originSearch(e)}
                    isClearable={true}
                />
            </div>
        </div>
    );
}

export default FlightSearch;