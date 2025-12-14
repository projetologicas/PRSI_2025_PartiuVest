import { Link } from "react-router-dom";
import HomeNavBar from "../components/HomeNavBar";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-theme-bg text-theme-text select-none transition-colors duration-300 font-sans">
            <HomeNavBar/>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* HERO SECTION */}
                <div className="bg-theme-card border border-theme-border rounded-2xl p-12 text-center shadow-2xl mb-12 transition-colors duration-300">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Domine o vestibular com <span className="text-theme-accent">PartiuVest</span>!
                    </h1>

                    <p className="text-lg md:text-xl text-theme-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
                        Nossa plataforma oferece um ambiente focado na simulação real de provas das maiores universidades do país.
                        Pratique com questões oficiais, acompanhe suas estatísticas de acerto e evolua seu desempenho de forma consistente.
                    </p>

                    <Link to="/question_book">
                        <button className="px-12 py-4 text-xl font-bold rounded-full bg-theme-accent text-white hover:opacity-90 transition-all shadow-lg hover:shadow-theme-accent/30 active:scale-[0.98]">
                            Começar simulado agora
                        </button>
                    </Link>
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-theme-card border border-theme-border p-8 rounded-xl hover:border-theme-accent transition-colors duration-300">
                        <h3 className="text-xl font-bold mb-3 text-theme-text">Banco de Questões</h3>
                        <p className="text-theme-subtext text-sm leading-relaxed">
                            Acesse milhares de questões organizadas por matéria, ano e instituição. Treine especificamente onde você tem mais dificuldade.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-theme-card border border-theme-border p-8 rounded-xl hover:border-theme-accent transition-colors duration-300">
                        <h3 className="text-xl font-bold mb-3 text-theme-text">Análise de Desempenho</h3>
                        <p className="text-theme-subtext text-sm leading-relaxed">
                            Visualize seu progresso através de gráficos detalhados. Identifique seus pontos fortes e as áreas que precisam de reforço.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-theme-card border border-theme-border p-8 rounded-xl hover:border-theme-accent transition-colors duration-300">
                        <h3 className="text-xl font-bold mb-3 text-theme-text">Sistema de Recompensas</h3>
                        <p className="text-theme-subtext text-sm leading-relaxed">
                            Mantenha a constância nos estudos e desbloqueie conquistas visuais para seu perfil. A disciplina gera resultados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}