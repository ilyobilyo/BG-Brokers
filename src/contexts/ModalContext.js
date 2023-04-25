import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.tagName === 'SECTION' && event.target.className.includes('modal')) {
                navigate(-1);
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