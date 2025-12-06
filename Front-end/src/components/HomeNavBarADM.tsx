import { Link } from "react-router-dom";

export default function HomeNavBarADM() {

    return (
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
            
        </div>
    );
}