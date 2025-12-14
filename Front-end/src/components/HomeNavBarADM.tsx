import { Link, useNavigate } from "react-router-dom";
import { removeTokenCookie } from "../services/Cookies";

export default function HomeNavBarADM() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeTokenCookie();
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="w-full max-w-7xl mx-auto mb-8">
            <div className="bg-[#1f2937] rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between border border-gray-700 shadow-xl gap-4">

                {/* 1. ÁREA DA ESQUERDA: VOLTAR SIMPLES */}
                <div className="flex items-center">
                    <Link
                        to="/home"
                        className="text-teal-400 hover:text-teal-300 font-bold text-sm uppercase tracking-wide transition-colors flex items-center gap-2"
                        title="Sair do modo Admin"
                    >
                        <span>⬅ Voltar à Plataforma</span>
                    </Link>
                </div>

                {/* 2. ÁREA CENTRAL: MENU DE NAVEGAÇÃO */}
                <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-wide">
                    <Link
                        to="/admin"
                        className="hover:text-white hover:underline decoration-teal-500 underline-offset-4 transition-all"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/users"
                        className="hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all"
                    >
                        Usuários
                    </Link>

                    <Link
                        to="/admin/items"
                        className="hover:text-white hover:underline decoration-yellow-500 underline-offset-4 transition-all"
                    >
                        Loja & Itens
                    </Link>

                    <Link
                        to="/admin/exams"
                        className="hover:text-white hover:underline decoration-purple-500 underline-offset-4 transition-all"
                    >
                        Importar Provas
                    </Link>
                </nav>

                {/* 3. ÁREA DA DIREITA: LOGOUT */}
                <div>
                    <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-white hover:bg-red-600/80 text-xs font-bold border border-red-900/50 bg-red-900/10 px-4 py-2 rounded transition-all"
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
        </div>
    );
}