import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


export const AdminGuard = ({children}) => {
    const { isAuthenticated, user } = useContext(AuthContext);
   
    if (!isAuthenticated || !user.roles.includes('admin')) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />  
};