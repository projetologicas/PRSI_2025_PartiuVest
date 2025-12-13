import { Link } from "react-router-dom";
import userIcon from "../assets/perfil.png";
import { refreshUserContext, UserContext } from "../common/context/UserCotext";
import { useContext, useEffect } from "react";

export default function HomeNavBarUser() {
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.name === "") {
            refreshUserContext(userContext);
        }
    }, []);

    return (
        <nav className="w-full bg-[#dcdcdc] text-black px-6 py-4 flex items-center justify-between shadow-xl font-sans">
            {/* Logo */}
            <div
                className="hidden md:block px-6 py-1 rounded-full shadow-lg text-2xl font-extrabold text-black"
                style={{
                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Links Centrais */}
            <div className="flex gap-6 md:gap-10 text-xl md:text-2xl font-bold" style={{ fontFamily: "monospace" }}>
                <Link to="/home" className="hover:text-teal-600 transition">Home</Link>
                <Link to="/question_book" className="hover:text-teal-600 transition">Vestibulares</Link>
                {/* Link Novo */}
                <Link to="/leaderboard" className="hover:text-teal-600 transition">Ranking</Link>
                <Link to="/shop" className="hover:text-teal-600 transition">Loja</Link>
            </div>

            {/* Stats e Perfil */}
            <div className="flex items-center gap-6">

                {/* Stats (Só aparece em telas médias pra cima) */}
                <div className="hidden lg:flex items-center gap-4 text-sm font-bold bg-white px-4 py-2 rounded-full shadow-inner">
                    <div className="flex items-center gap-1 text-blue-600" title="XP Total">
                        <span>⚡</span>
                        <span>{userContext.xp} XP</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-1 text-orange-500" title="Streak Atual">
                        <span>🔥</span>
                        <span>{userContext.streak}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-1 text-yellow-600" title="Pontos para Loja">
                        <span>💰</span>
                        <span>{userContext.points}</span>
                    </div>
                </div>

                {/* Ícone Usuário */}
                <Link to="/profile" className="no-underline group">
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-lg font-bold group-hover:text-teal-600 transition">
                            {userContext.name}
                        </div>
                        <div className="bg-white rounded-full shadow-md cursor-pointer border-2 border-transparent group-hover:border-teal-400 transition">
                            <img
                                src={userIcon}
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