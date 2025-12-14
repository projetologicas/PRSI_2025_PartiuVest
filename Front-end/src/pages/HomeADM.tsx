import { Link } from "react-router-dom";
import HomeNavBarADM from "../components/HomeNavBarADM";

export default function AdminHome() {
    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-6 text-gray-100 font-sans">
            <HomeNavBarADM/>

            {/* HEADER */}
            <div className="text-center mb-10 mt-4">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                    Painel Administrativo
                </h1>
                <p className="text-gray-400">Gerencie o ecossistema do PartiuVest com as ferramentas abaixo.</p>
            </div>

            {/* MAIN CONTENT - GRID DE FUNCIONALIDADES */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* CARD 1: USUÁRIOS */}
                <Link to="/admin/users" className="group">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-lg hover:border-blue-500 hover:shadow-blue-500/10 transition-all h-full flex flex-col">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            👥
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Gerenciar Usuários</h2>
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                            Cadastre novos administradores ou alunos manualmente. Visualize a lista de usuários ativos no sistema.
                        </p>
                        <div className="mt-4 text-blue-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Acessar <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

                {/* CARD 2: LOJA */}
                <Link to="/admin/items" className="group">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-lg hover:border-yellow-500 hover:shadow-yellow-500/10 transition-all h-full flex flex-col">
                        <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            🛒
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Loja & Itens</h2>
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                            Crie novos itens cosméticos. Adicione <strong>Avatares</strong>, <strong>Títulos</strong> e <strong>Temas</strong> para os alunos comprarem com suas moedas.
                        </p>
                        <div className="mt-4 text-yellow-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Acessar <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

                {/* CARD 3: PROVAS */}
                <Link to="/admin/exams" className="group">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-lg hover:border-purple-500 hover:shadow-purple-500/10 transition-all h-full flex flex-col">
                        <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            📝
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Importar Provas</h2>
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                            Carregue novos simulados e questões através de arquivos JSON. Alimente o banco de dados com novos vestibulares.
                        </p>
                        <div className="mt-4 text-purple-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Acessar <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}