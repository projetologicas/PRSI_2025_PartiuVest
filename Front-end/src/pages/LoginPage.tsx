import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { setTokenCookie, getTokenCookie } from "../services/Cookies";
import cerebro from "../assets/brain.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, refreshUserContext } from "../common/context/UserCotext";
import { SystemContext } from "../common/context/SystemContext";

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const userContext = useContext(UserContext);
    const systemContext = useContext(SystemContext);
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

    // Estado local para controlar a visibilidade do modal de erro
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [localErrorMsg, setLocalErrorMsg] = useState("");

    useEffect(() => {
        if (getTokenCookie() !== undefined) {
            navigate('/home');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        systemContext.setLoading(true);

        try {
            const resp = await axios.post('http://localhost:8080/auth/login', form);
            console.log('Login success', resp.data);
            setTokenCookie(resp.data.token, 1);

            await refreshUserContext(userContext);

            navigate('/home');
        } catch (err: any) {
            console.error(err);
            const msg = err?.response?.data?.message ?? 'E-mail ou senha incorretos.';
            setLocalErrorMsg(msg);
            setShowErrorModal(true);
        } finally {
            systemContext.setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full font-sans relative">

            {/* MODAL DE ERRO */}
            {showErrorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border-t-4 border-red-500">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Atenção</h3>
                        <p className="text-gray-600 mb-6">{localErrorMsg}</p>
                        <button
                            onClick={() => setShowErrorModal(false)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            )}

            {/* SEÇÃO ESQUERDA: Fundo Preto */}
            <div className="hidden md:flex flex-1 bg-black flex-col p-8">
                <div className="flex items-center justify-center w-full h-full gap-6">
                    <h1
                        className="text-4xl lg:text-6xl font-extrabold"
                        style={{
                            background: 'linear-gradient(45deg, #00FF7F, #00BFFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        PartiuVest
                    </h1>
                    <img src={cerebro} alt="Cérebro" className="w-48 lg:w-64 select-none drop-shadow-lg" />
                </div>
            </div>

            {/* SEÇÃO DIREITA: Formulário */}
            <div className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center min-w-[300px] p-4">
                <div className="w-full max-w-sm p-8 bg-gray-200">

                    {/* Título Mobile (só aparece se tela for pequena) */}
                    <h1 className="md:hidden text-3xl font-extrabold text-center mb-8" style={{ color: '#00E0A0' }}>PartiuVest</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="E-mail"
                                name="email"
                                className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-2 text-lg transition-colors"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-2 text-lg transition-colors"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Botões com Espaçamento (Flex gap) */}
                        <div className="pt-4 flex flex-col gap-4">
                            <button
                                type="submit"
                                className="w-full py-3 text-white font-semibold rounded-lg transition duration-200 cursor-pointer hover:opacity-90 active:scale-[0.98]"
                                style={{
                                    background: 'linear-gradient(to bottom, #00FFC0, #00E0A0)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 255, 192, 0.4)',
                                }}
                            >
                                Entrar
                            </button>

                            <Link to="/register" className="w-full block">
                                <button
                                    type="button"
                                    className="w-full py-3 text-white font-semibold rounded-lg transition duration-200 cursor-pointer hover:opacity-90 active:scale-[0.98]"
                                    style={{
                                        background: 'linear-gradient(to bottom, #00BFFF, #0099D9)',
                                        boxShadow: '0 4px 6px -1px rgba(0, 191, 255, 0.4)',
                                    }}
                                >
                                    Criar conta
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};