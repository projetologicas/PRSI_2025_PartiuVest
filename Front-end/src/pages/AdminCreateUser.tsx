import { useState, useEffect } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null); // ID do usuário sendo editado

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users", { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            setUsers(res.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // MODO EDIÇÃO
                await api.put(`/admin/users/${editingId}`, form, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
                setMsg("✅ Usuário atualizado!");
                setEditingId(null);
            } else {
                // MODO CRIAÇÃO
                await api.post("/admin/users", form, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
                setMsg("✅ Usuário criado!");
            }
            setForm({ name: "", email: "", password: "" });
            fetchUsers();
        } catch (error: any) {
            setMsg("❌ Erro: " + (error.response?.data?.message || "Erro na operação."));
        }
    };

    const handleEdit = (user: any) => {
        setEditingId(user.id);
        setForm({ name: user.name, email: user.email, password: "" }); // Senha vazia para não alterar se não quiser
        setMsg("✏️ Editando usuário #" + user.id);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm({ name: "", email: "", password: "" });
        setMsg("");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Deletar usuário?")) return;
        try {
            await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            fetchUsers();
        } catch (error) { alert("Erro ao deletar."); }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-bold ${editingId ? 'text-blue-400' : 'text-teal-400'}`}>
                        {editingId ? 'Editar Usuário' : 'Novo Usuário'}
                    </h2>
                    {editingId && <button onClick={handleCancelEdit} className="text-xs text-gray-400 hover:text-white">Cancelar</button>}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <input className="flex-1 bg-gray-700 rounded p-2 text-white outline-none focus:ring-1 ring-teal-500"
                           placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    <input className="flex-1 bg-gray-700 rounded p-2 text-white outline-none focus:ring-1 ring-teal-500"
                           placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    <input className="flex-1 bg-gray-700 rounded p-2 text-white outline-none focus:ring-1 ring-teal-500"
                           placeholder={editingId ? "Nova Senha (opcional)" : "Senha"} type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required={!editingId} />

                    <button type="submit" className={`px-6 py-2 rounded font-bold transition ${editingId ? 'bg-blue-600 hover:bg-blue-500' : 'bg-teal-600 hover:bg-teal-500'}`}>
                        {editingId ? 'Salvar' : 'Criar'}
                    </button>
                </form>
                {msg && <p className="mt-2 text-sm text-center font-bold">{msg}</p>}
            </div>

            <div className="w-full max-w-4xl bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900 text-gray-400 uppercase">
                    <tr><th className="p-4">ID</th><th className="p-4">Nome</th><th className="p-4">Email</th><th className="p-4 text-right">Ações</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-700/30 transition">
                            <td className="p-4 font-mono text-gray-500">#{u.id}</td>
                            <td className="p-4 font-bold">{u.name}</td>
                            <td className="p-4 text-gray-400">{u.email}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button onClick={() => handleEdit(u)} className="text-blue-400 hover:text-white bg-blue-900/20 hover:bg-blue-600 px-3 py-1 rounded font-bold">Editar</button>
                                <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-white bg-red-900/20 hover:bg-red-600 px-3 py-1 rounded font-bold">Excluir</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}