import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminHome() {
    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-6">
            {/* NAVBAR */}
            <div className="w-full max-w-5xl bg-gray-800 rounded-xl p-4 flex items-center justify-between border border-gray-700">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <div className="bg-black rounded-full px-4 py-1 shadow-md">
                        <span className="text-teal-300 font-bold text-xl">Partiu</span>
                        <span className="text-blue-400 font-bold text-xl">Vest</span>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex gap-6 text-lg font-semibold text-gray-300">
                    <Link to="/admin" className="hover:text-white transition">Home</Link>
                    <Link to="/admin/vestibulares" className="hover:text-white transition">Vestibulares</Link>
                    <Link to="/cadastrar" className="hover:text-white transition">Cadastrar</Link>
                </nav>

                {/* ICON */}
                <User className="w-10 h-10 text-white" />
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full max-w-5xl bg-gray-300 mt-8 rounded-xl p-10 flex items-center justify-center text-center shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800">
                    Aqui abaixo irão textos explicando funcionamento do sistema.
                </h1>
            </div>
        </div>
    );
}
