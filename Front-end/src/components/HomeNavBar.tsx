import { Link } from "react-router-dom";
import { useContext } from "react";
// Certifique-se que o caminho está correto conforme sua estrutura
import { UserContext } from "../common/context/UserCotext";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function HomeNavBarUser() {
    // 1. Puxamos tudo o que precisamos do Contexto
    const { name, role, xp, streak, points, currentAvatar } = useContext(UserContext);

    return (
        // 2. Navbar adaptada ao Tema (bg-theme-card, text-theme-text)
        <nav className="w-full bg-theme-card text-theme-text px-6 py-4 flex items-center justify-between shadow-xl font-sans transition-colors duration-300 sticky top-0 z-50 border-b border-theme-border">

            {/* Logo PartiuVest */}
            <div
                className="hidden md:block px-6 py-1 rounded-full shadow-lg text-2xl font-extrabold text-black"
                style={{
                    // Mantive o gradiente original pois é a identidade da marca
                    background: "linear-gradient(90deg, #14e7b1, #0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Links Centrais */}
            <div className="flex gap-6 md:gap-10 text-xl md:text-2xl font-bold items-center" style={{ fontFamily: "monospace" }}>
                <Link to="/home" className="hover:text-theme-accent transition-colors">Home</Link>
                <Link to="/question_book" className="hover:text-theme-accent transition-colors">Vestibulares</Link>

                {/* Botão Admin Condicional */}
                {role === 'ADMIN' && (
                    <Link
                        to="/admin"
                        className="bg-red-600 text-white text-sm md:text-lg px-3 py-1 rounded font-bold hover:bg-red-500 transition-all animate-pulse shadow-lg shadow-red-500/30"
                    >
                        PAINEL ADMIN 🔒
                    </Link>
                )}

                <Link to="/leaderboard" className="hover:text-theme-accent transition-colors">Ranking</Link>
                <Link to="/shop" className="hover:text-theme-accent transition-colors">Loja</Link>
            </div>

            {/* Stats e Perfil */}
            <div className="flex items-center gap-6">

                {/* Stats (Barrinha de Status) */}
                {/* Adaptado para fundo escuro/claro dependendo do tema */}
                <div className="hidden lg:flex items-center gap-4 text-sm font-bold bg-theme-bg border border-theme-border px-4 py-2 rounded-full shadow-inner transition-colors">
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

                {/* Ícone Usuário */}
                <Link to="/profile" className="no-underline group">
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-lg font-bold group-hover:text-theme-accent text-theme-text transition-colors">
                            {name || "Usuário"}
                        </div>
                        <div className="rounded-full shadow-md cursor-pointer border-2 border-theme-border group-hover:border-theme-accent transition-colors bg-gray-800">
                            <img
                                src={currentAvatar || DEFAULT_AVATAR}
                                alt="User"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </Link>
            </div>
        </nav>
    );
}