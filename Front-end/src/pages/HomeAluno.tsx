import HomeNavBar from "../components/HomeNavBar";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-theme-bg text-theme-text select-none transition-colors duration-300">
            <HomeNavBar/>
            <div className="bg-theme-card text-theme-text mt-2 mx-4 p-16 min-h-[600px] text-center shadow-xl border border-theme-border rounded-xl transition-colors duration-300">

                <p className="text-4xl font-extrabold mb-32 font-mono">
                    Aqui abaixo irão textos explicando <br /> funcionamento do sistema.
                </p>

                <div className="flex justify-center">
                    <button
                        className="px-10 py-4 text-3xl font-extrabold rounded-full shadow-xl active:translate-y-0.5 bg-theme-accent text-white hover:opacity-90 transition-all font-mono"
                    >
                        Fazer Prova
                    </button>
                </div>
            </div>
        </div>
    );
}