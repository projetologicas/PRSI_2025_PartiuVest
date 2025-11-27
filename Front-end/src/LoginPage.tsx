import React, { useState } from "react";
import axios from "axios";
import { setTokenCookie, getTokenCookie, removeTokenCookie } from "./services/Cookies.ts"

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Example axios POST. Configure baseURL globally or replace with absolute URL
            const resp = await axios.post('http://localhost:8080/auth/login', form);
            // resp.data -> token or user
            console.log('Login success', resp.data);
            setTokenCookie(resp.data.token, 1);
            console.log(resp.data.token)
            // redirect or save token...
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message ?? 'Erro ao autenticar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e1b1c]">
            <div className="w-[1000px] h-[620px] relative flex shadow-2xl">
                {/* Left visual */}
                <div className="flex-1 relative bg-[#1b1819] p-8 flex items-center justify-center overflow-hidden">
                    {/* background brain image - put your exported png/svg in public/brain-bg.png */}
                    <img
                        src="/brain-bg.png"
                        alt="brain"
                        className="absolute right-0 h-[480px] opacity-95 select-none pointer-events-none"
                        style={{ transform: 'translateX(10%)' }}
                    />

                    <div className="relative z-10 flex flex-col items-start gap-6 ml-6">
                        <h1 className="text-5xl font-extrabold text-[#00f0b0] tracking-tight leading-none" style={{ fontFamily: 'monospace' }}>
                            PartiuVest
                        </h1>
                        <p className="text-sm text-[#66ffd2] opacity-80 mt-2" style={{ fontFamily: 'monospace' }}>
                            Aprimore sua preparação
                        </p>
                    </div>
                </div>

                {/* Right form card */}
                <div className="w-[420px] bg-[#e6e6e6] p-10 flex flex-col justify-between">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div>
                            <label className="text-2xl block mb-2 font-bold text-[#bdbdbd]" htmlFor="email" style={{ fontFamily: 'monospace' }}>
                                E-mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-black outline-none py-2 placeholder-gray-500 text-black text-lg"
                                placeholder=""
                            />
                        </div>

                        <div>
                            <label className="text-2xl block mb-2 font-bold text-[#bdbdbd]" htmlFor="password" style={{ fontFamily: 'monospace' }}>
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b-2 border-black outline-none py-2 placeholder-gray-500 text-black text-lg"
                                placeholder=""
                            />
                        </div>

                        {error && <div className="text-sm text-red-600">{error}</div>}

                        <div className="flex flex-col items-end gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-56 py-3 rounded-full shadow-lg text-black font-extrabold text-xl transform active:translate-y-0.5"
                                style={{ background: 'linear-gradient(90deg,#14e7b1,#0dd6b6)' }}
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>

                            <button
                                type="button"
                                onClick={() => alert('Navegar para criação de conta')}
                                className="w-56 py-3 rounded-full shadow-lg text-black font-extrabold text-xl mt-2"
                                style={{ background: 'linear-gradient(90deg,#17c0f1,#13b8d9)' }}
                            >
                                Criar Conta
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-right text-xs text-gray-500">&nbsp;</div>
                </div>
            </div>
        </div>
    );
}