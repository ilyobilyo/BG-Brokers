import { createContext, useEffect, useState } from "react";
import { GetAllTypes } from "../services/typeService";

export const TypeContext = createContext();

export const TypeProvider = ({children}) => {
    const [types, setTypes] = useState({});

    useEffect(() => {
        GetAllTypes()
            .then(data => {
                setTypes(data);
            });
    }, [])

    return (
        <TypeContext.Provider value={{types}}>
            {children}
        </TypeContext.Provider>
    )
}