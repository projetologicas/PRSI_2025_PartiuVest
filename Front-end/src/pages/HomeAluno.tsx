import HomeNavBar from "../components/HomeNavBar";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#1e1b1c] text-white select-none">
            <HomeNavBar/>

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
