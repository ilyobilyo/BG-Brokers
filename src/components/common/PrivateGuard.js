import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


export const PrivateGuard = ({children}) => {
    const { isAuthenticated } = useContext(AuthContext);
    debugger
    if (!isAuthenticated) {
        return <Navigate to="/account/login" replace />
    }

    return children ? children : <Outlet />  
};