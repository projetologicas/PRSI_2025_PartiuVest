import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Navega para a página anterior
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 font-pixel">
            {/* Container Principal (Moldura Cinza) */}
            <div className="relative bg-[#d9d9d9] w-full max-w-2xl border-[12px] border-[#1a1a1a] pt-16 pb-12 px-8 flex flex-col items-center shadow-lg">

                {/* Badge do Topo (Logo) - Posicionado com absolute para "sair" da borda */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#333333] px-6 py-3 rounded-full shadow-[0px_4px_0px_rgba(0,0,0,0.5)] z-10">
                    <h1 className="text-[#4fd1c5] text-xl md:text-2xl tracking-widest drop-shadow-md">
                        PartiuVest
                    </h1>
                </div>

                {/* Conteúdo Central */}
                <div className="text-center space-y-8 mt-4">

                    {/* Texto de Erro Vermelho */}
                    <h2 className="text-[#ff0000] text-3xl md:text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                        ERRO 404!
                    </h2>

                    {/* Descrição do Erro */}
                    <p className="text-black text-xs md:text-sm leading-relaxed tracking-wider">
                        Erro ao acessar esta pagina
                    </p>

                    {/* Botão Voltar */}
                    <button
                        onClick={handleGoBack}
                        className="mt-8 bg-[#1cd6ac] text-black text-sm md:text-base py-3 px-8 rounded-full
                       hover:bg-[#16b490] transition-transform active:translate-y-1
                       shadow-[0px_6px_0px_rgba(0,0,0,0.3)] active:shadow-[0px_2px_0px_rgba(0,0,0,0.3)]
                       uppercase tracking-wide"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};