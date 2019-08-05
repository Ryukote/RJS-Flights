import React from 'react';

const DetailData = (details) => {
    return(
        <div className="details">
            <div className="leftDetailBlock">
                <div>
                    {`Departing from: ${details.departure.iataCode}`}
                </div>

                <div>
                    {`Departure at: ${details.departure.at}`}
                </div>
            </div>

            <div className="innerDetailBlock">
                <div>
                    {`Arriving to: ${details.arrival.at}`}
                </div>

                <div>
                    {`Arriving at: ${details.arrival.iataCode}`}
                </div>
            </div>

            <div className="rightDetailBlock">
                {`Duration: ${details.duration}`}
            </div>
        </div>
    );
}

export default DetailData;