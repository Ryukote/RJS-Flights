import React from 'react';
import './BaseData.css';
// import MdAirplanemodeActive from 'react-icons/md/airplanemode-active'

const BaseData = (base) => {
    console.log(base);
    return(
        <div className="baseData">
            <div className="baseIcon">
                {/* <MdAirplanemodeActive size="24"/> */}
            </div>

            <div className="rows">
        	    <div className="topRow">
                    <div>
                        {`Total price: ${base.base.price.total} EUR`}
                    </div>

                    <div>
                        {`Total taxes: ${base.base.price.totalTaxes} EUR`}
                    </div>
                </div>

                <div className="bottomRow">
                    <div>
                        {`Travel class: ${base.base.services[0].segments[0].pricingDetailPerAdult.travelClass}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseData;