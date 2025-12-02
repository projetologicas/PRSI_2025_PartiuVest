import axios from "axios";
import { useEffect, useState } from "react";

interface ResultadoDTO {
    totalQuestoes: number;
    maiorStreak: number;
    acertos: number;
    erros: number;
    pontosObtidos: number;
}

export default function FinalizarCaderno() {
    const [resultado, setResultado] = useState<ResultadoDTO | null>(null);

    useEffect(() => {
        axios.get("/api/resultado") // exemplo de rota
            .then(res => setResultado(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!resultado) {
        return <div className="text-white p-6">Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-[#1f1b1d] flex flex-col items-center pt-10">
            {/* Logo */}
            <div className="bg-[#222] px-6 py-2 rounded-full shadow-md mb-6">
                <h1 className="text-[#33e6c9] text-3xl font-bold">PartiuVest</h1>
            </div>

            {/* Card */}
            <div className="bg-[#dcdcdc] w-[90%] max-w-4xl rounded-lg shadow-xl px-10 py-16 text-center">
                <h1 className="text-4xl font-bold mb-2">Parabéns !</h1>

                <p className="text-2xl font-semibold mb-10">
                    Você concluiu o caderno de questões
                </p>

                <div className="text-left mx-auto w-fit text-xl leading-relaxed font-semibold">
                    <p>Questões: <span className="font-normal">{resultado.totalQuestoes}</span></p>
                    <p>Maior Streak: <span className="font-normal">{resultado.maiorStreak}</span></p>
                    <p>Acertos: <span className="font-normal">{resultado.acertos}</span></p>
                    <p>Erros: <span className="font-normal">{resultado.erros}</span></p>
                    <p>Pontos obtidos: <span className="font-normal">{resultado.pontosObtidos}</span></p>
                </div>

                {/* Botão */}
                <button
                    onClick={() => window.location.href = "/home"}
                    className="mt-14 bg-[#26e9c3] text-black text-2xl font-bold px-10 py-3 rounded-full shadow-lg active:scale-95 transition"
                >
                    Concluir
                </button>
            </div>
        </div>
    );
}
