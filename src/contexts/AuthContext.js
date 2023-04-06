import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('auth', {});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (user.accessToken) {
            setIsAuthenticated(true);
        }
    })

    const onLogin = (user) => {
        setUser(user);
        setIsAuthenticated(true);
    }

    const onLogout = () => {
        setUser({})
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}