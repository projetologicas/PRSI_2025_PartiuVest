import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../common/context/UserCotext.tsx";

export default function PerfilPage() {
    const context = useContext(UserContext);

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center p-6 text-black">
            <div className="bg-gray-300 w-full max-w-5xl rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/home">
                        <button className="px-6 py-2 bg-teal-400 text-black font-bold rounded-full shadow-md">Home</button>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-center flex-1 -ml-20">PartiuVest</h1>
                    <Link to="/home">
                        <button className="px-6 py-2 bg-red-500 text-black font-bold rounded-full shadow-md">Sair</button>
                    </Link>
                </div>

                <div className="flex justify-end mr-4 text-xl font-bold">
                    {context.points} <span className="ml-1">💰</span>
                </div>

                <h2 className="text-center text-3xl font-extrabold mb-6">DADOS</h2>

                <div className="flex gap-10 items-center px-10">
                    <div className="bg-teal-400 w-52 h-52 rounded-full flex items-center justify-center">
                        <div className="bg-black w-40 h-40 rounded-full" />
                    </div>

                    <div className="text-xl font-bold space-y-2">
                        <p>Nome: {context.name}</p>
                        <p>Exercícios feitos: {context.exerciciosFeitos}</p>
                        <p>Streak: {context.streak}</p>
                        <p>Rank: {context.rank}</p>
                        <p>Lvl: {context.xp}</p>
                    </div>
                </div>

                {/*
                <div className="bg-gray-600 mt-10 p-6 rounded-2xl text-white">
                    <h3 className="text-xl font-bold mb-4">Conquistas</h3>
                    <div className="flex gap-10">
                        {data?.conquistas.map((c, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <img src={c.icone} className="w-20 h-20" />
                                <p className="mt-2 font-bold">{c.titulo}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
}