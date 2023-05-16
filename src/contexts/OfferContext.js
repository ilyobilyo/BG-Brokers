import { createContext, useEffect, useState } from "react";
import * as offerService from '../services/offerService';

export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [lastDoc, setLastDoc] = useState({});

    useEffect(() => {
        offerService.getAllOffers()
            .then(data => {
                const newOffers = data.docs.map(x => {
                    const data = x.data();
                    const obj = { id: x.id };
                    for (const key in data) {
                        if (data[key]) {
                            obj[key] = data[key];
                        }
                    }

                    return obj;
                })

                setLastDoc(data.docs[data.docs.length - 1])
                setOffers(newOffers);
            });
    }, [])

    const addNewOffer = (offer) => {
        setOffers(state => ([offer, ...state]));
    }

    const updateOffer = (offer) => {
        const currOffers = [...offers];
        const offerIndex = offers.findIndex(x => x.id === offer.id);

        if (offerIndex !== -1) {
            currOffers[offerIndex] = offer;
            setOffers(currOffers);
        }
    }

    const deleteOfferFromState = (offerId) => {
        setOffers(offers.filter(x => x.id !== offerId));
    }

    const getOffersForInfiniteScroll = (lastDoc, handleScroll) => {
        offerService.getAllOffers(lastDoc)
            .then(data => {
                if (data.empty) {
                    window.removeEventListener("scroll", handleScroll);
                }

                const newOffers = data.docs.map(x => {
                    const data = x.data();
                    const obj = { id: x.id };
                    for (const key in data) {
                        if (data[key]) {
                            obj[key] = data[key];
                        }
                    }

                    return obj;
                })

                setLastDoc(state => data.docs[data.docs.length - 1])
                setOffers(state => [...state, ...newOffers]);
            });
    }

    return (
        <OfferContext.Provider value={{ lastDoc, offers, addNewOffer, updateOffer, deleteOfferFromState, getOffersForInfiniteScroll}}>
            {children}
        </OfferContext.Provider>
    )
}