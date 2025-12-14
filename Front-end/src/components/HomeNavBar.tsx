import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../common/context/UserCotext";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function HomeNavBarUser() {
    const { name, role, xp, streak, points, currentAvatar } = useContext(UserContext);

    return (
        <nav className="w-full bg-theme-card text-theme-text px-6 py-4 flex items-center justify-between shadow-xl font-sans transition-colors duration-300 sticky top-0 z-50 border-b border-theme-border">

            {/* Logo (Mantido Original) */}
            <div
                className="hidden md:block px-6 py-1 rounded-full shadow-lg text-2xl font-extrabold text-black"
                style={{
                    background: "linear-gradient(90deg, #14e7b1, #0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Links Centrais (Com hover do tema) */}
            <div className="flex gap-6 md:gap-10 text-xl md:text-2xl font-bold items-center" style={{ fontFamily: "monospace" }}>
                <Link to="/home" className="hover:text-theme-accent transition-colors">Home</Link>
                <Link to="/question_book" className="hover:text-theme-accent transition-colors">Vestibulares</Link>

                {role === 'ADMIN' && (
                    <Link
                        to="/admin"
                        className="bg-red-600 text-white text-base px-3 py-1 rounded font-bold hover:bg-red-500 transition-all animate-pulse"
                    >
                        PAINEL ADMIN 🔒
                    </Link>
                )}

                <Link to="/leaderboard" className="hover:text-theme-accent transition-colors">Ranking</Link>
                <Link to="/shop" className="hover:text-theme-accent transition-colors">Loja</Link>
            </div>

            {/* Stats e Perfil */}
            <div className="flex items-center gap-6">

                {/* Stats (Fundo adaptado ao tema) */}
                <div className="hidden lg:flex items-center gap-4 text-sm font-bold bg-theme-bg text-theme-text border border-theme-border px-4 py-2 rounded-full shadow-inner transition-colors">
                    <div className="flex items-center gap-1 text-blue-500" title="XP Total">
                        <span>⚡</span>
                        <span>{xp} XP</span>
                    </div>
                    <div className="w-px h-4 bg-theme-border"></div>
                    <div className="flex items-center gap-1 text-orange-500" title="Streak Atual">
                        <span>🔥</span>
                        <span>{streak}</span>
                    </div>
                    <div className="w-px h-4 bg-theme-border"></div>
                    <div className="flex items-center gap-1 text-yellow-500" title="Pontos para Loja">
                        <span>💰</span>
                        <span>{points}</span>
                    </div>
                </div>

                {/* Ícone Usuário (Estilo Dados.tsx com Gradiente) */}
                <Link to="/profile" className="no-underline group">
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-lg font-bold group-hover:text-theme-accent transition-colors">
                            {name}
                        </div>

                        {/* Círculo com Borda Gradiente (Igual Dados.tsx) */}
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full p-0.5 bg-gradient-to-tr from-teal-400 to-purple-600 shadow-md group-hover:scale-105 transition-transform">
                            <img
                                src={currentAvatar || DEFAULT_AVATAR}
                                alt="User"
                                className="w-full h-full rounded-full object-cover bg-gray-800 border-2 border-theme-card"
                            />
                        </div>
                    </div>
                </Link>
            </div>
        </nav>
    );
}