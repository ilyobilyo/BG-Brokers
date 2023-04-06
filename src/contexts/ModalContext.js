import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className.includes('modal')) {
                navigate('/');
            } 
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <ModalContext.Provider value={{ isOpen, modalRef }}>
            {children}
        </ModalContext.Provider>
    )
}