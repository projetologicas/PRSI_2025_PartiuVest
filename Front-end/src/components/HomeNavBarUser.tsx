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
        <nav className="w-full bg-[#dcdcdc] text-black px-6 py-4 flex items-center justify-between shadow-xl">
            {/* Logo */}
            <div
                className="px-6 py-1 rounded-full shadow-lg text-3xl font-extrabold"
                style={{
                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Links */}
            <div className="flex gap-10 text-3xl font-bold" style={{ fontFamily: "monospace" }}>
                <Link to="/home" className="hover:opacity-70">Home</Link>
                <Link to="/question_book" className="hover:opacity-70">Vestibulares</Link>
                <Link to="/loja" className="hover:opacity-70">Loja</Link>
            </div>

            {/* Icon usuário */}
            <Link to="/profile" className="no-underline">
                <div className="flex items-center gap-4">
                    <div className="text-xl font-bold">
                        {userContext.name}
                    </div>
                    <div className="bg-white rounded-full shadow-md cursor-pointer">
                        <img 
                            src={userIcon} 
                            alt="User" 
                            className="w-12 md:w-16 select-none"
                            />
                    </div>
                </div>
            </Link>
        </nav>
    );

}