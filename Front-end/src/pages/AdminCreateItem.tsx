import { useState } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";

export default function AdminCreateItem() {
    // Estado inicial específico para ITENS
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 100,
        type: "AVATAR",
        imageUrl: ""
    });
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Envia para a rota de itens
            await api.post("/admin/items", form, {
                headers: { Authorization: `Bearer ${getTokenCookie()}` }
            });

            setMsg("✅ Item adicionado à Loja com sucesso!");

            // Limpa o formulário mantendo valores padrão úteis
            setForm({
                name: "",
                description: "",
                price: 100,
                type: "AVATAR",
                imageUrl: ""
            });
        } catch (error: any) {
            console.error(error);
            setMsg("❌ Erro ao criar item. Verifique se o backend está rodando.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl mt-8">
                <div className="border-b border-gray-700 pb-2 mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">Cadastrar Novo Item</h2>
                    <p className="text-sm text-gray-400">Adicione cosméticos para a loja do jogo.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* NOME */}
                        <div className="col-span-2">
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Nome do Item</label>
                            <input
                                className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-yellow-500 outline-none transition"
                                placeholder="Ex: Chapéu de Mago"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                required
                            />
                        </div>

                        {/* DESCRIÇÃO */}
                        <div className="col-span-2">
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Descrição</label>
                            <input
                                className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-yellow-500 outline-none transition"
                                placeholder="Ex: Aumenta seu estilo em 100%..."
                                value={form.description}
                                onChange={e => setForm({...form, description: e.target.value})}
                                required
                            />
                        </div>

                        {/* PREÇO */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Preço (Coins)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-yellow-500">💰</span>
                                <input
                                    type="number"
                                    className="w-full bg-gray-700 rounded p-3 pl-10 focus:ring-2 ring-yellow-500 outline-none transition font-mono"
                                    value={form.price}
                                    onChange={e => setForm({...form, price: Number(e.target.value)})}
                                    required
                                />
                            </div>
                        </div>

                        {/* TIPO (SELECT) */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Tipo de Item</label>
                            <select
                                className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-yellow-500 outline-none transition cursor-pointer"
                                value={form.type}
                                onChange={e => setForm({...form, type: e.target.value})}
                            >
                                <option value="AVATAR">👤 Avatar (Imagem)</option>
                                <option value="TITLE">👑 Título (Texto)</option>
                                <option value="THEME">🎨 Tema (Cor/Layout)</option>
                            </select>
                        </div>

                        {/* URL DA IMAGEM / CONTEÚDO */}
                        <div className="col-span-2">
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">
                                {form.type === 'THEME' ? 'ID do Tema (ex: matrix, neon)' :
                                    form.type === 'TITLE' ? 'Texto do Título' : 'URL da Imagem (Link)'}
                            </label>
                            <input
                                className="w-full bg-gray-700 rounded p-3 focus:ring-2 ring-yellow-500 outline-none font-mono text-sm text-blue-300"
                                placeholder={form.type === 'AVATAR' ? "https://..." : "Valor do item"}
                                value={form.imageUrl}
                                onChange={e => setForm({...form, imageUrl: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Preview (Opcional, só para ficar bonito) */}
                    {form.type === 'AVATAR' && form.imageUrl && (
                        <div className="flex justify-center py-4">
                            <div className="text-center">
                                <p className="text-xs text-gray-500 mb-2">Pré-visualização:</p>
                                <img src={form.imageUrl} alt="Preview" className="w-20 h-20 rounded-full border-2 border-yellow-500 object-cover bg-black" />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded mt-4 transition shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
                    >
                        CADASTRAR ITEM NA LOJA
                    </button>
                </form>

                {msg && (
                    <div className={`mt-6 p-4 rounded text-center font-bold border ${msg.includes('Erro') ? 'bg-red-900/30 border-red-500 text-red-200' : 'bg-green-900/30 border-green-500 text-green-200'}`}>
                        {msg}
                    </div>
                )}
            </div>
        </div>
    );
}