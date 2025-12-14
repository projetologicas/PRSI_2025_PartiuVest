import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const [loading, setLoading] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setErrorMsg("Por favor, insira um e-mail válido (ex: nome@email.com).");
            return false;
        }

        if (form.password.length < 6) {
            setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setErrorMsg("As senhas não coincidem.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setShowErrorModal(true);
            return;
        }

        setLoading(true);

        try {
            // Enviamos apenas o necessário para o backend (sem o confirmPassword)
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password
            };

            await axios.post("http://localhost:8080/auth/register", payload);
            alert("Conta criada com sucesso! Faça login."); // Pode trocar por um modal de sucesso se quiser
            navigate('/');
        } catch (err: any) {
            console.log(err);
            setErrorMsg(err?.response?.data?.message ?? "Erro ao realizar cadastro.");
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1b1c] flex flex-col items-center pt-6 relative">

            {/* MODAL DE ERRO */}
            {showErrorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border-t-4 border-red-500 animate-bounce-in">
                        <div className="text-4xl mb-4">🚫</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Algo deu errado</h3>
                        <p className="text-gray-600 mb-6 font-medium">{errorMsg}</p>
                        <button
                            onClick={() => setShowErrorModal(false)}
                            className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-8 rounded-full transition w-full"
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            )}

            {/* Logo topo */}
            <div
                className="px-8 py-2 rounded-full shadow-xl text-3xl font-extrabold mb-4"
                style={{
                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Card central */}
            <div className="w-[90%] max-w-[800px] bg-[#dcdcdc] p-8 md:p-12 rounded-xl shadow-2xl border border-gray-600">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-700" style={{ fontFamily: "monospace" }}>Crie sua conta</h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 max-w-[500px] mx-auto"
                >
                    {/* Nome Completo - Reordenado para ser o primeiro */}
                    <div>
                        <label htmlFor="name" className="text-xl font-bold text-gray-500 block mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Seu nome"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-400 focus:border-teal-500 outline-none text-xl py-2 transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="text-xl font-bold text-gray-500 block mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-400 focus:border-teal-500 outline-none text-xl py-2 transition-colors"
                        />
                    </div>

                    {/* Senha e Confirmação lado a lado em telas maiores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="password" className="text-xl font-bold text-gray-500 block mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="******"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-gray-400 focus:border-teal-500 outline-none text-xl py-2 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="text-xl font-bold text-gray-500 block mb-1 uppercase" style={{ fontFamily: "monospace" }}>
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="******"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-gray-400 focus:border-teal-500 outline-none text-xl py-2 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 text-2xl font-extrabold rounded-full shadow-lg active:translate-y-0.5 cursor-pointer hover:brightness-110 transition"
                            style={{
                                background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                                fontFamily: "monospace",
                            }}
                        >
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>

                        <Link to="/" className="flex-1">
                            <button
                                type="button"
                                className="w-full py-3 text-2xl font-extrabold rounded-full shadow-lg active:translate-y-0.5 cursor-pointer hover:bg-gray-300 transition bg-white text-gray-700 border-2 border-gray-300"
                                style={{
                                    fontFamily: "monospace",
                                }}
                            >
                                Voltar
                            </button>
                        </Link>
                    </div>
                </form>
            </div>

            <div className="pb-10"></div>
        </div>
    );
}