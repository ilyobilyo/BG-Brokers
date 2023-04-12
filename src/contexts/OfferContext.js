import { createContext, useEffect, useState } from "react";
import * as offerService from '../services/offerService';

export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        offerService.getAllOffers()
            .then(data => {
                setOffers(data);
            });
    }, [])

    const addNewOffer = (offer) => {
        setOffers(state => [offer, ...state]);
    }

    return (
        <OfferContext.Provider value={{offers, addNewOffer}}>
            {children}
        </OfferContext.Provider>
    )
}