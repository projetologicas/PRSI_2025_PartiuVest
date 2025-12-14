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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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
            alert("Erro ao equipar item.");
            console.error(err);
        } finally {
            systemContext.setLoading(false);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }

        try {
            systemContext.setLoading(true);

            const payload: any = {
                name: formData.name,
                email: formData.email
            };
            if (formData.password) {
                payload.password = formData.password;
            }

            await api.put('api/user/update', payload, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            await refreshUserContext(userContext);
            setIsEditing(false);
            alert("Dados atualizados com sucesso!");

        } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.message || "Erro ao atualizar perfil.");
        } finally {
            systemContext.setLoading(false);
        }
    };

    const filteredItems = userContext.items?.filter(item => item.type === activeTab) || [];

    return (
        // 1. FUNDO DA TELA COM CORES DO TEMA
        <div className="min-h-screen bg-theme-bg text-theme-text pb-10 font-sans relative transition-colors duration-300">

            {/* 2. HEADER */}
            <header className="bg-theme-card shadow-md p-4 mb-8 transition-colors duration-300">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/home" className="flex items-center gap-2 text-theme-accent font-bold hover:opacity-80 transition">
                        <span>⬅ Voltar para Home</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-wider hidden md:block">MEU PERFIL</h1>
                    <button onClick={handleLogout} className="text-red-400 font-bold hover:text-red-300 text-sm border border-red-400 px-4 py-1 rounded hover:bg-red-400/10 transition">
                        Sair da Conta
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* COLUNA DA ESQUERDA (CARD DO USUÁRIO) */}
                <div className="md:col-span-1">
                    <div className="bg-theme-card rounded-2xl p-6 shadow-xl border border-theme-border sticky top-4 text-center transition-colors duration-300">

                        <div className="relative inline-block mb-4">
                            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-teal-400 to-purple-600">
                                <img
                                    src={userContext.currentAvatar || DEFAULT_AVATAR}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover bg-gray-800 border-4 border-theme-card"
                                />
                            </div>

                            <span className="absolute bottom-2 right-2 bg-yellow-500 text-black font-bold w-10 h-10 flex items-center justify-center rounded-full border-4 border-theme-card">
                                {Math.floor((userContext.xp || 0) / 1000) + 1}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-theme-text mb-1">{userContext.name}</h2>

                        {/* BOTÃO DE EDITAR PERFIL */}
                        <button
                            onClick={openEditModal}
                            className="text-xs text-theme-subtext hover:text-theme-accent underline mb-3 transition-colors"
                        >
                            Editar Dados ✏️
                        </button>

                        <div className="block">
                            {userContext.currentTitle && (
                                <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/30 mb-4">
                                    {userContext.currentTitle}
                                </span>
                            )}
                        </div>

                        <div className="w-full h-px bg-theme-border my-4"></div>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-xs text-theme-subtext uppercase font-bold">Saldo</p>
                                <p className="text-xl font-bold text-yellow-400 flex items-center gap-1">
                                    💰 {userContext.points}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-theme-subtext uppercase font-bold">XP Total</p>
                                <p className="text-xl font-bold text-blue-400">{userContext.xp} XP</p>
                            </div>
                            <div>
                                <p className="text-xs text-theme-subtext uppercase font-bold">Streak</p>
                                <p className="text-xl font-bold text-orange-400">🔥 {userContext.streak} dias</p>
                            </div>
                            <div>
                                <p className="text-xs text-theme-subtext uppercase font-bold">Rank</p>
                                {/* Rank adaptado para a cor do texto do tema */}
                                <p className="text-xl font-bold text-theme-text opacity-80">{userContext.rank || "Novato"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUNA DA DIREITA (INVENTÁRIO) */}
                <div className="md:col-span-2">
                    <div className="bg-theme-card rounded-2xl shadow-xl border border-theme-border overflow-hidden min-h-[500px] transition-colors duration-300">

                        <div className="p-6 border-b border-theme-border flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-theme-text">
                                🎒 Inventário <span className="text-sm font-normal text-theme-subtext">({userContext.items?.length || 0} itens)</span>
                            </h3>
                            <Link to="/shop" className="text-theme-accent hover:opacity-80 text-sm font-bold">
                                + Ir para Loja
                            </Link>
                        </div>

                        <div className="flex border-b border-theme-border bg-black/20">
                            {/* Tabs mantendo cores específicas para diferenciar categorias, mas com hover do tema */}
                            <button onClick={() => setActiveTab('AVATAR')} className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'AVATAR' ? 'text-theme-accent border-b-2 border-theme-accent bg-white/5' : 'text-theme-subtext hover:text-theme-text'}`}>Avatares 👤</button>
                            <button onClick={() => setActiveTab('TITLE')} className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'TITLE' ? 'text-purple-400 border-b-2 border-purple-400 bg-white/5' : 'text-theme-subtext hover:text-theme-text'}`}>Títulos 👑</button>
                            <button onClick={() => setActiveTab('THEME')} className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'THEME' ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-theme-subtext hover:text-theme-text'}`}>Temas 🎨</button>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredItems.length === 0 ? (
                                <div className="col-span-full text-center py-10 text-theme-subtext">
                                    <p className="text-lg mb-2">Nada por aqui...</p>
                                    <Link to="/shop" className="bg-theme-accent text-white px-4 py-2 rounded font-bold hover:opacity-90 transition">Visitar Loja</Link>
                                </div>
                            ) : (
                                filteredItems.map((item) => {
                                    let isEquipped = false;
                                    if (item.type === 'AVATAR') isEquipped = userContext.currentAvatar === item.image_url;
                                    if (item.type === 'TITLE') isEquipped = userContext.currentTitle === item.image_url;
                                    if (item.type === 'THEME') isEquipped = userContext.currentTheme === item.image_url;

                                    return (
                                        <div key={item.id} className={`bg-theme-bg rounded-xl p-4 border transition-all hover:scale-[1.02] ${isEquipped ? 'border-theme-accent shadow-md shadow-theme-accent/20' : 'border-theme-border hover:border-gray-500'}`}>
                                            <div className="h-24 flex items-center justify-center mb-4 bg-black/20 rounded-lg">
                                                {item.type === 'AVATAR' ? (
                                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-600" />
                                                ) : (
                                                    <span className="text-sm font-bold text-gray-300 px-2 text-center">{item.image_url}</span>
                                                )}
                                            </div>
                                            <h4 className="font-bold text-theme-text mb-1 truncate">{item.name}</h4>
                                            <button onClick={() => !isEquipped && handleEquip(item)} disabled={isEquipped} className={`w-full py-2 rounded font-bold text-sm mt-2 transition-colors ${isEquipped ? 'bg-transparent text-theme-accent border border-theme-accent cursor-default' : 'bg-gray-700 hover:bg-theme-accent text-white'}`}>
                                                {isEquipped ? 'Equipado ✅' : 'Equipar'}
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE EDIÇÃO */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-theme-card w-full max-w-md rounded-2xl border border-theme-border shadow-2xl overflow-hidden animate-fade-in transition-colors duration-300">
                        <div className="p-6 border-b border-theme-border">
                            <h3 className="text-xl font-bold text-theme-text">Editar Dados Pessoais</h3>
                            <p className="text-sm text-theme-subtext">Atualize suas informações de cadastro.</p>
                        </div>

                        <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Nome de Usuário</label>
                                <input
                                    type="text"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-3 text-theme-text focus:border-theme-accent focus:outline-none transition"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">E-mail</label>
                                <input
                                    type="email"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-3 text-theme-text focus:border-theme-accent focus:outline-none transition"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            <hr className="border-theme-border my-2" />

                            <div>
                                <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Nova Senha <span className="text-gray-500 normal-case">(Deixe vazio para manter a atual)</span></label>
                                <input
                                    type="password"
                                    className="w-full bg-theme-bg border border-theme-border rounded p-3 text-theme-text focus:border-theme-accent focus:outline-none transition"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="••••••"
                                />
                            </div>

                            {formData.password && (
                                <div>
                                    <label className="block text-xs font-bold text-theme-subtext uppercase mb-1">Confirmar Nova Senha</label>
                                    <input
                                        type="password"
                                        className="w-full bg-theme-bg border border-theme-border rounded p-3 text-theme-text focus:border-theme-accent focus:outline-none transition"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        placeholder="••••••"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-3 rounded font-bold text-theme-subtext hover:bg-gray-700 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded font-bold bg-theme-accent text-white hover:opacity-90 transition shadow-lg shadow-black/20"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}