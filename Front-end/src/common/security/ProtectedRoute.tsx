import { Navigate, Outlet } from 'react-router-dom';
import { setTokenCookie, getTokenCookie, removeTokenCookie } from "../../services/Cookies.ts"

const ProtectedRoute = () => {
    const isAuthenticated = getTokenCookie() ? true : false; 

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;