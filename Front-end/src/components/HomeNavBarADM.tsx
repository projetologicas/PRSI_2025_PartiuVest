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
            <div className="bg-[#1f2937] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between border border-gray-700 shadow-2xl gap-4">

                {/* 1. ÁREA DA ESQUERDA: LOGO E VOLTAR */}
                <div className="flex items-center gap-4">
                    {/* Botão para voltar à visão de usuário normal */}
                    <Link to="/home" className="flex items-center gap-2 group" title="Sair do modo Admin e ir para Home">
                        <div className="bg-gray-800 p-2 rounded-full border border-gray-600 group-hover:border-teal-400 transition-colors">
                            <span className="text-gray-400 group-hover:text-teal-400">⬅</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-teal-400 font-bold text-lg leading-none">PartiuVest</span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest group-hover:text-gray-300">Voltar ao Site</span>
                        </div>
                    </Link>

                    {/* Separador vertical */}
                    <div className="h-8 w-px bg-gray-700 hidden md:block"></div>

                    {/* Badge de Admin */}
                    <div className="hidden md:flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Modo Admin</span>
                    </div>
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
                        className="text-red-400 hover:text-white hover:bg-red-600 text-xs font-bold border border-red-900 bg-red-900/20 px-4 py-2 rounded transition-all shadow-lg"
                    >
                        SAIR (LOGOUT)
                    </button>
                </div>
            </div>
        </div>
    );
}