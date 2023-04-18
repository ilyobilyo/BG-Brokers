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

    const updateOffer = (offer) => {
        const currOffers = [...offers];
        const offerIndex = offers.findIndex(x => x.id === offer.id);

        if (offerIndex !== -1) {
            currOffers[offerIndex] = offer;
            setOffers(currOffers);
        }
    }

    return (
        <OfferContext.Provider value={{offers, addNewOffer, updateOffer}}>
            {children}
        </OfferContext.Provider>
    )
}