import { useContext } from 'react'; // <--- Importe useContext
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenCookie } from "../../services/Cookies";
import {UserContext} from "../context/UserCotext.tsx";

const AdminRoute = () => {
    // Agora o TypeScript sabe que 'role' e 'isLoading' existem aqui dentro!
    const { role, isLoading } = useContext(UserContext);

    const hasToken = getTokenCookie();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    if (!hasToken) {
        return <Navigate to="/" replace />;
    }

    const isAdmin = role === 'ADMIN';

    if (isAdmin) {
        return <Outlet />;
    } else {
        return <Navigate to="/home" replace />;
    }
};

export default AdminRoute;