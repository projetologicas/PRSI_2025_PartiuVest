import { useState, useEffect } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";
import type { ShopItem } from "../types/ShopItem";

export default function AdminItems() {
    const [items, setItems] = useState<ShopItem[]>([]);
    // Removido o campo 'description' do estado inicial
    const [form, setForm] = useState({ name: "", price: 100, type: "AVATAR", imageUrl: "" });
    const [msg, setMsg] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchItems = async () => {
        try {
            const res = await api.get("/shop", { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            setItems(res.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/items/${editingId}`, form, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
                setMsg("✅ Item atualizado!");
                setEditingId(null);
            } else {
                await api.post("/admin/items", form, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
                setMsg("✅ Item criado!");
            }
            // Reset do formulário sem descrição
            setForm({ name: "", price: 100, type: "AVATAR", imageUrl: "" });
            fetchItems();
        } catch (error) { setMsg("❌ Erro na operação."); }
    };

    const handleEdit = (item: ShopItem) => {
        setEditingId(item.id);
        // Preenche o formulário sem descrição
        setForm({
            name: item.name,
            price: item.price,
            type: item.type,
            imageUrl: item.image_url
        });
        setMsg("✏️ Editando item #" + item.id);
        window.scrollTo(0,0);
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Deletar item?")) return;
        try {
            await api.delete(`/admin/items/${id}`, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            fetchItems();
        } catch (error) { alert("Erro ao deletar."); }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-6xl bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-bold ${editingId ? 'text-blue-400' : 'text-yellow-400'}`}>
                        {editingId ? 'Editar Item' : 'Novo Item'}
                    </h2>
                    {editingId && <button onClick={() => {setEditingId(null); setForm({ name: "", price: 100, type: "AVATAR", imageUrl: "" })}} className="text-gray-400 hover:text-white">Cancelar</button>}
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    {/* Campo Nome expandido para ocupar o espaço que era da descrição */}
                    <div className="md:col-span-3">
                        <label className="text-xs text-gray-500 block mb-1">Nome</label>
                        <input className="w-full bg-gray-700 rounded p-2 outline-none focus:ring-1 ring-yellow-500" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Preço</label>
                        <input type="number" className="w-full bg-gray-700 rounded p-2 outline-none focus:ring-1 ring-yellow-500" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-500 block mb-1">Tipo</label>
                        <select className="w-full bg-gray-700 rounded p-2 outline-none" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                            <option value="AVATAR">Avatar</option>
                            <option value="TITLE">Título</option>
                            <option value="THEME">Tema</option>
                        </select>
                    </div>

                    <div className="md:col-span-5">
                        <label className="text-xs text-gray-500 block mb-1">URL / ID</label>
                        <input className="w-full bg-gray-700 rounded p-2 outline-none focus:ring-1 ring-yellow-500 font-mono text-sm" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} required />
                    </div>

                    <button type="submit" className={`h-10 rounded font-bold text-black transition ${editingId ? 'bg-blue-500 hover:bg-blue-400' : 'bg-yellow-600 hover:bg-yellow-500'}`}>
                        {editingId ? 'SALVAR' : 'CRIAR'}
                    </button>
                </form>
                {msg && <p className="mt-2 text-center font-bold text-green-400">{msg}</p>}
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center relative group hover:border-yellow-500 transition">
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-white" title="Editar">✏️</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-white" title="Excluir">🗑️</button>
                        </div>

                        <div className="h-20 flex items-center justify-center mb-3">
                            {item.type === 'AVATAR' ?
                                <img src={item.image_url} className="w-16 h-16 rounded-full bg-black object-cover" /> :
                                <span className="text-4xl">{item.type === 'THEME' ? '🎨' : '👑'}</span>
                            }
                        </div>
                        <h3 className="font-bold text-white mb-2">{item.name}</h3>
                        {/* Descrição removida daqui */}
                        <span className="text-yellow-400 font-bold">💰 {item.price}</span>
                        <span className="text-[10px] uppercase bg-gray-700 px-2 py-1 rounded mt-2 text-gray-300">{item.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}