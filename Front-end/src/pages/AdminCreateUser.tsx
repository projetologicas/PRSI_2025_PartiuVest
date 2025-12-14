import { useState } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";

export default function AdminCreateUser() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Chama o endpoint criado no AdminController
            await api.post("/admin/users", form, {
                headers: { Authorization: `Bearer ${getTokenCookie()}` }
            });
            setMsg("✅ Usuário cadastrado com sucesso!");
            setForm({ name: "", email: "", password: "" }); // Limpa form
        } catch (error: any) {
            setMsg("❌ Erro: " + (error.response?.data?.message || "Falha ao criar usuário."));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl mt-8">
                <h2 className="text-2xl font-bold mb-6 text-teal-400 border-b border-gray-700 pb-2">Novo Usuário</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1 text-gray-400">Nome Completo</label>
                        <input className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-teal-500 outline-none text-white"
                               type="text"
                               value={form.name}
                               onChange={e => setForm({...form, name: e.target.value})}
                               required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gray-400">E-mail</label>
                        <input className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-teal-500 outline-none text-white"
                               type="email"
                               value={form.email}
                               onChange={e => setForm({...form, email: e.target.value})}
                               required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gray-400">Senha Inicial</label>
                        <input className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-teal-500 outline-none text-white"
                               type="password"
                               value={form.password}
                               onChange={e => setForm({...form, password: e.target.value})}
                               required
                        />
                    </div>

                    <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded mt-6 transition shadow-lg">
                        CRIAR USUÁRIO
                    </button>
                </form>

                {msg && <div className="mt-4 p-3 bg-black/30 rounded text-center font-bold border border-gray-600">{msg}</div>}
            </div>
        </div>
    );
}