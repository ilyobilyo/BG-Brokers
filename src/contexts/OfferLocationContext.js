import { createContext, useEffect, useState } from "react";
import { GetHoodsForTown } from "../services/hoodService";
import { GetAllTowns } from "../services/townService";

export const OfferLocationContext = createContext();

export const OfferLocationProvider = ({children}) => {
    const [towns, setTowns] = useState([]);
    const [hoods, sethoods] = useState([]);

    useEffect(() => {
        GetAllTowns()
            .then(data => {
                setTowns(data);
            });
    }, [])

    const getTownHoods = (townId) => {
        GetHoodsForTown(townId)
        .then(data => {
            sethoods(data);
        });
    }

    return (
        <OfferLocationContext.Provider value={{towns, hoods, getTownHoods}}>
            {children}
        </OfferLocationContext.Provider>
    )
}