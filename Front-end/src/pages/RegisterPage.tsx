import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link, useNavigate } from 'react-router-dom';

type RegisterForm = {
    email: string;
    password: string;
    name: string;
};

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterForm>({
        email: "",
        password: "",
        name: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            console.log(form)
            const resp = await axios.post("http://localhost:8080/auth/register", form);
            console.log("Conta criada:", resp.data);
            navigate('/');
        } catch (err: any) {
            console.log(err);
            setError(err?.response?.data?.message ?? "Erro ao cadastrar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1b1c] flex flex-col items-center pt-6">
            {/* Logo topo */}
            <div
                className="px-8 py-2 rounded-full shadow-xl text-3xl font-extrabold"
                style={{
                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

            {/* Card central */}
            <div className="w-[90%] max-w-[1200px] bg-[#dcdcdc] mt-8 p-12 min-h-[600px] shadow-2xl">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-16 max-w-[500px] mx-auto mt-10"
                >
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="text-4xl font-bold text-[#bdbdbd] block mb-2"
                            style={{ fontFamily: "monospace" }}
                        >
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b-2 border-black outline-none text-2xl py-2"
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label
                            htmlFor="password"
                            className="text-4xl font-bold text-[#bdbdbd] block mb-2"
                            style={{ fontFamily: "monospace" }}
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b-2 border-black outline-none text-2xl py-2"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="text-4xl font-bold text-[#bdbdbd] block mb-2"
                            style={{ fontFamily: "monospace" }}
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b-2 border-black outline-none text-2xl py-2"
                        />
                    </div>

                    {error && <p className="text-red-600 text-lg">{error}</p>}

                    {/* Botão */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-64 py-4 text-3xl font-extrabold rounded-full shadow-xl active:translate-y-0.5 cursor-pointer"
                            style={{
                                background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                                fontFamily: "monospace",
                            }}
                        >
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        <div className="pl-5"></div>
                        <Link to="/">
                            <button
                                type="button"
                                className="w-64 py-4 text-3xl font-extrabold rounded-full shadow-xl active:translate-y-0.5 cursor-pointer"
                                style={{
                                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                                    fontFamily: "monospace",
                                }}
                            >
                                Voltar
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
