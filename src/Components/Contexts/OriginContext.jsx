import React, { createContext, useState } from 'react';

export const OriginContext = createContext();

export const OriginProvider = (props) => {
    const [originText, originSearch] = useState('');

    return (
        <div>
            <OriginContext.Provider
                value={[originText, originSearch]}
            >
                {props.children}
            </OriginContext.Provider>
        </div>
    )
}