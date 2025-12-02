import { Link } from "react-router-dom";
// import type { User } from "./types/User";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#1e1b1c] text-white select-none">
            {/* NAVBAR */}
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
                    <Link to="/dashboard" className="hover:opacity-70">Home</Link>
                    <Link to="/vestibulares" className="hover:opacity-70">Vestibulares</Link>
                    <Link to="/loja" className="hover:opacity-70">Loja</Link>
                </div>

                {/* Icon usuário */}
                <div className="bg-white rounded-full p-2 shadow-md">
                    
                </div>
            </nav>

            {/* Conteúdo principal */}
            <div className="bg-[#dcdcdc] text-black mt-2 mx-4 p-16 min-h-[600px] text-center shadow-xl">
                <p className="text-4xl font-extrabold mb-32" style={{ fontFamily: "monospace" }}>
                    Aqui abaixo irão textos explicando <br /> funcionamento do sistema.
                </p>

                {/* Botão Fazer Prova */}
                <div className="flex justify-center">
                    <button
                        className="px-10 py-4 text-3xl font-extrabold rounded-full shadow-xl active:translate-y-0.5"
                        style={{
                            background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                            fontFamily: "monospace",
                        }}
                    >
                        Fazer Prova
                    </button>
                </div>
            </div>
        </div>
    );
}
