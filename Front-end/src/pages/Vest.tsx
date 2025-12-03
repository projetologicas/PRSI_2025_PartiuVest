import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface VestibularDTO {
    id: number;
    nome: string;
    nota: number;
}

export default function Vestibulares() {
    const [lista, setLista] = useState<VestibularDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/vestibulares") // ajuste a rota conforme seu backend
            .then((res) => setLista(res.data))
            .catch((err) => console.error(err));
    }, []);

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
                        <a className="hover:opacity-70 cursor-pointer border-b-4 border-black pb-1">Vestibulares</a>
                        <a className="hover:opacity-70 cursor-pointer">Loja</a>
                    </nav>
                </div>

                {/* Ícone do usuário */}
                <div className="w-14 h-14 rounded-full bg-black"></div>
            </div>

            {/* Conteúdo */}
            <div className="bg-[#dcdcdc] mx-4 mt-6 rounded-lg shadow-lg px-10 py-10">

                <div className="text-3xl font-bold space-y-6">

                    {lista.map((vest) => (
                        <p
                            key={vest.id}
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => navigate(`/vestibular/${vest.id}`)}
                        >
                            + {vest.nome} – Nota: {vest.nota ?? "xxxx"}
                        </p>
                    ))}

                </div>

            </div>
        </div>
    );
}
