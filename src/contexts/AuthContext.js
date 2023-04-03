import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('auth', {});

    const onLogin = (user) => {
        setUser(user)
    }

    const onLogout = () => {
        setUser({})
    }

    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, isAuthenticated: !!user.accessToken}}>
            {children}
        </AuthContext.Provider>
    )
}