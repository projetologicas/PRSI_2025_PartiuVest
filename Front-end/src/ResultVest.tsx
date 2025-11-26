import { useEffect, useState } from "react";
import axios from "axios";

interface ResultadoVestDTO {
    nomeVestibular: string;
    nota: number;
    totalQuestoes: number;
    maiorStreak: number;
    acertos: number;
    erros: number;
    pontosObtidos: number;
}

export default function ResultadoVestibular() {
    const [dados, setDados] = useState<ResultadoVestDTO | null>(null);

    useEffect(() => {
        axios.get("/api/vestibular/resultado") // ajuste conforme seu backend
            .then(res => setDados(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!dados) {
        return <div className="text-white p-6">Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-black pb-10">

            {/* Navbar */}
            <div className="flex items-center bg-[#d9d9d9] px-6 py-4 justify-between shadow">
                <div className="flex items-center gap-10">
                    <div className="bg-[#222] px-5 py-1 rounded-full shadow-md">
                        <h1 className="text-[#33e6c9] text-3xl font-bold">PartiuVest</h1>
                    </div>

                    <nav className="flex gap-10 text-2xl font-semibold">
                        <a className="hover:opacity-70 cursor-pointer">Home</a>
                        <a className="hover:opacity-70 cursor-pointer">Vestibulares</a>
                        <a className="hover:opacity-70 cursor-pointer">Loja</a>
                    </nav>
                </div>

                {/* Ícone do usuário */}
                <div className="w-14 h-14 rounded-full bg-black"></div>
            </div>

            {/* Conteúdo principal */}
            <div className="bg-[#dcdcdc] mx-4 mt-6 rounded-lg shadow-lg px-10 py-12">

                <h2 className="text-3xl font-bold mb-6">
                    + {dados.nomeVestibular} - Nota: {dados.nota}
                </h2>

                <div className="text-xl font-semibold leading-relaxed">
                    <p>Questões: <span className="font-normal">{dados.totalQuestoes}</span></p>
                    <p>Maior Streak: <span className="font-normal">{dados.maiorStreak}</span></p>
                    <p>Acertos: <span className="font-normal">{dados.acertos}</span></p>
                    <p>Erros: <span className="font-normal">{dados.erros}</span></p>
                    <p>Pontos obtidos: <span className="font-normal">{dados.pontosObtidos}</span></p>
                </div>

                {/* Botões */}
                <div className="flex justify-between mt-16">

                    <button
                        className="bg-[#8fb4ad] text-black text-3xl font-bold px-10 py-3 rounded-full shadow-lg active:scale-95 transition"
                        onClick={() => window.history.back()}
                    >
                        Voltar
                    </button>

                    <button
                        className="bg-[#26e9c3] text-black text-3xl font-bold px-10 py-3 rounded-full shadow-lg active:scale-95 transition"
                        onClick={() => window.location.reload()}
                    >
                        Tentar novamente
                    </button>

                </div>
            </div>
        </div>
    );
}
