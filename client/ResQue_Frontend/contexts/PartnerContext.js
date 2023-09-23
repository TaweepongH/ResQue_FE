import {createContext, useContext, useState} from 'react';

const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {

    const [PartnerData, setPartnerData] = useState([]);

    const setPartnerDataContext = (array) => {
        setPartnerData(array);
    }

    const contextValue = {
        PartnerData,
        setPartnerDataContext
    }

    return (
        <PartnerContext.Provider value={contextValue}>

            {children}

        </PartnerContext.Provider>
    )
}

export const usePartnerContext = () => {
    return useContext(PartnerContext);
}