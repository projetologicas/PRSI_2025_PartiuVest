import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { refreshUserContext, UserContext } from "../common/context/UserCotext";
import { SystemContext } from "../common/context/SystemContext";
import { removeTokenCookie, getTokenCookie } from "../services/Cookies";
import api from "../services/api";
import type { ShopItem } from "../types/ShopItem";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function PerfilPage() {
    const userContext = useContext(UserContext);
    const systemContext = useContext(SystemContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'AVATAR' | 'TITLE' | 'THEME'>('AVATAR');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    useEffect(() => {
        if (!userContext.name) {
            refreshUserContext(userContext);
        }
    }, []);

    const openEditModal = () => {
        setFormData({
            name: userContext.name || "",
            email: userContext.email || "",
            password: "",
            confirmPassword: ""
        });
        setIsEditing(true);
    };

    const handleLogout = () => {
        removeTokenCookie();
        navigate('/');
        window.location.reload();
    };

    const handleEquip = async (item: ShopItem) => {
        try {
            systemContext.setLoading(true);
            await api.post(`/shop/equip/${item.id}`, {}, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            await refreshUserContext(userContext);
        } catch (err: any) {
            alert("Não foi possível equipar o item.");
        } finally {
            systemContext.setLoading(false);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("A confirmação de senha não confere.");
            return;
        }

        try {
            systemContext.setLoading(true);
            const payload: any = { name: formData.name, email: formData.email };
            if (formData.password) payload.password = formData.password;

            await api.put('api/user/update', payload, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            await refreshUserContext(userContext);
            setIsEditing(false);
            alert("Perfil atualizado com sucesso.");
        } catch (err: any) {
            alert(err?.response?.data?.message || "Erro ao atualizar.");
        } finally {
            systemContext.setLoading(false);
        }
    };

    const filteredItems = userContext.items?.filter(item => item.type === activeTab) || [];

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text pb-10 font-sans relative transition-colors duration-300">

            {/* HEADER SIMPLIFICADO */}
            <header className="bg-theme-card border-b border-theme-border shadow-sm p-4 mb-8">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/home" className="flex items-center gap-2 text-theme-subtext hover:text-theme-text transition text-sm font-medium">
                        <span>← Voltar</span>
                    </Link>
                    <h1 className="text-lg font-bold uppercase tracking-widest text-theme-text">Meu Perfil</h1>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-400 text-sm font-bold transition">
                        Sair
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* COLUNA ESQUERDA: PERFIL */}
                <div className="md:col-span-1">
                    <div className="bg-theme-card rounded-xl p-8 shadow-lg border border-theme-border sticky top-4 text-center transition-colors duration-300">

                        {/* AVATAR LIMPO (Sem nível flutuante) */}
                        <div className="inline-block mb-6 p-1 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 shadow-lg">
                            <img
                                src={userContext.currentAvatar || DEFAULT_AVATAR}
                                alt="Avatar"
                                className="w-40 h-40 rounded-full object-cover bg-theme-bg border-4 border-theme-card"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-theme-text mb-2">{userContext.name}</h2>
                        <p className="text-sm text-theme-subtext mb-6">{userContext.email}</p>

                        {userContext.currentTitle && (
                            <span className="inline-block bg-theme-bg border border-theme-border text-theme-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                                {userContext.currentTitle}
                            </span>
                        )}

                        {/* BOTÃO EDITAR DESTACADO */}
                        <button
                            onClick={openEditModal}
                            className="w-full py-2 mb-8 bg-theme-bg border border-theme-border text-theme-text rounded font-medium hover:border-theme-accent hover:text-theme-accent transition-all text-sm"
                        >
                            Editar Informações
                        </button>

                        <div className="w-full h-px bg-theme-border mb-6"></div>

                        {/* ESTATÍSTICAS (Sem Rank) */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded bg-theme-bg/50">
                                <p className="text-[10px] text-theme-subtext uppercase font-bold mb-1">MOEDAS</p>
                                <p className="text-lg font-bold text-yellow-500">{userContext.points}</p>
                            </div>
                            <div className="p-2 rounded bg-theme-bg/50">
                                <p className="text-[10px] text-theme-subtext uppercase font-bold mb-1">XP TOTAL</p>
                                <p className="text-lg font-bold text-blue-500">{userContext.xp}</p>
                            </div>
                            <div className="p-2 rounded bg-theme-bg/50">
                                <p className="text-[10px] text-theme-subtext uppercase font-bold mb-1">STREAK</p>
                                <p className="text-lg font-bold text-orange-500">{userContext.streak}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUNA DIREITA: INVENTÁRIO */}
                <div className="md:col-span-2">
                    <div className="bg-theme-card rounded-xl shadow-lg border border-theme-border overflow-hidden min-h-[600px] transition-colors duration-300">

                        <div className="p-6 border-b border-theme-border flex justify-between items-center">
                            <h3 className="text-lg font-bold text-theme-text uppercase tracking-wide">
                                Meus Itens
                            </h3>
                            <Link to="/shop" className="text-theme-accent hover:underline text-sm font-medium">
                                Ir para a Loja
                            </Link>
                        </div>

                        {/* TABS DE NAVEGAÇÃO */}
                        <div className="flex border-b border-theme-border bg-theme-bg/30">
                            <button onClick={() => setActiveTab('AVATAR')} className={`flex-1 py-4 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'AVATAR' ? 'text-theme-accent border-b-2 border-theme-accent bg-theme-card' : 'text-theme-subtext hover:text-theme-text'}`}>Avatares</button>
                            <button onClick={() => setActiveTab('TITLE')} className={`flex-1 py-4 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'TITLE' ? 'text-theme-accent border-b-2 border-theme-accent bg-theme-card' : 'text-theme-subtext hover:text-theme-text'}`}>Títulos</button>
                            <button onClick={() => setActiveTab('THEME')} className={`flex-1 py-4 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'THEME' ? 'text-theme-accent border-b-2 border-theme-accent bg-theme-card' : 'text-theme-subtext hover:text-theme-text'}`}>Temas</button>
                        </div>

                        {/* GRID DE ITENS */}
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredItems.length === 0 ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-theme-subtext opacity-50">
                                    <div className="w-16 h-16 border-2 border-dashed border-current rounded-lg mb-4"></div>
                                    <p className="text-sm">Nenhum item nesta categoria.</p>
                                </div>
                            ) : (
                                filteredItems.map((item) => {
                                    let isEquipped = false;
                                    if (item.type === 'AVATAR') isEquipped = userContext.currentAvatar === item.image_url;
                                    if (item.type === 'TITLE') isEquipped = userContext.currentTitle === item.image_url;
                                    if (item.type === 'THEME') isEquipped = userContext.currentTheme === item.image_url;

                                    return (
                                        <div key={item.id} className={`bg-theme-bg rounded-lg p-4 border transition-all ${isEquipped ? 'border-theme-accent ring-1 ring-theme-accent' : 'border-theme-border hover:border-theme-subtext'}`}>
                                            <div className="h-24 flex items-center justify-center mb-4 bg-black/5 dark:bg-black/30 rounded">
                                                {item.type === 'AVATAR' ? (
                                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                                                ) : (
                                                    <span className="text-xs font-bold text-theme-subtext px-2 text-center">{item.image_url}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-bold text-theme-text text-sm truncate">{item.name}</h4>
                                                <button
                                                    onClick={() => !isEquipped && handleEquip(item)}
                                                    disabled={isEquipped}
                                                    className={`w-full py-1.5 rounded text-xs font-bold uppercase tracking-wide transition-colors ${isEquipped ? 'bg-transparent text-theme-accent cursor-default' : 'bg-theme-card border border-theme-border hover:bg-theme-accent hover:text-white hover:border-theme-accent'}`}
                                                >
                                                    {isEquipped ? 'Em uso' : 'Equipar'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE EDIÇÃO (Limpo e Funcional) */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-theme-card w-full max-w-md rounded-xl border border-theme-border shadow-2xl overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-theme-border">
                            <h3 className="text-lg font-bold text-theme-text">Atualizar Perfil</h3>
                        </div>

                        <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Nome</label>
                                <input
                                    type="text"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-2 text-theme-text focus:border-theme-accent focus:outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">E-mail</label>
                                <input
                                    type="email"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-2 text-theme-text focus:border-theme-accent focus:outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="border-t border-theme-border my-2 pt-2">
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Nova Senha (Opcional)</label>
                                <input
                                    type="password"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-2 text-theme-text focus:border-theme-accent focus:outline-none"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="••••••"
                                />
                            </div>

                            {formData.password && (
                                <div>
                                    <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        className="w-full bg-theme-bg border border-theme-border rounded p-2 text-theme-text focus:border-theme-accent focus:outline-none"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        placeholder="••••••"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 mt-6 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-2 rounded font-medium text-theme-subtext hover:bg-theme-bg transition text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 rounded font-bold bg-theme-accent text-white hover:opacity-90 transition shadow-lg text-sm"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}