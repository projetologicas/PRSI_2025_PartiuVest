import { Navigate, Outlet } from 'react-router-dom';
import { getTokenCookie } from "../../services/Cookies";
import { useUserContext } from '../../hooks/useUserContext'; 

const AdminRoute = () => {
    const isAuthenticated = getTokenCookie() ? true : false;
    const { role, isLoading } = useUserContext(); 

    if (isLoading) {
        return <div style={{padding: '50px', textAlign: 'center'}}>Carregando dados do usuário...</div>;
    }

    const isAdmin = isAuthenticated && role === 'ADMIN';

    if (isAdmin) {
        return <Outlet />;
    } else if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    } else {
        return <Navigate to="/" replace />; 
    }
};

export default AdminRoute;