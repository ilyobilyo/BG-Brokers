import { createContext, useEffect, useState } from "react";
import { GetAllTownsWithHoods } from "../services/townService";

export const TownContext = createContext();

export const TownProvider = ({children}) => {
    const [towns, setTowns] = useState([]);
    const [hoods, setHoods] = useState([]);

    useEffect(() => {
        GetAllTownsWithHoods()
            .then(data => {
                setTowns(data.towns);
                setHoods(data.hoods);
            });
    }, [])

    return (
        <TownContext.Provider value={{towns, hoods}}>
            {children}
        </TownContext.Provider>
    )
}