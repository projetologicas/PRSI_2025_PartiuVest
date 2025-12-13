import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { refreshUserContext, UserContext } from "../common/context/UserCotext";
import { SystemContext } from "../common/context/SystemContext";
import { removeTokenCookie, getTokenCookie } from "../services/Cookies";
import api from "../services/api";
import type {ShopItem} from "../types/ShopItem";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function PerfilPage() {
    const userContext = useContext(UserContext);
    const systemContext = useContext(SystemContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'AVATAR' | 'TITLE' | 'THEME'>('AVATAR');

    useEffect(() => {
        if (!userContext.name) {
            refreshUserContext(userContext);
        }
    }, []);

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

    const filteredItems = userContext.items?.filter(item => item.type === activeTab) || [];

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-gray-100 pb-10 font-sans">

            <header className="bg-[#2d2a2c] shadow-md p-4 mb-8">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/home" className="flex items-center gap-2 text-teal-400 font-bold hover:text-teal-300 transition">
                        <span>⬅ Voltar para Home</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-wider hidden md:block">MEU PERFIL</h1>
                    <button onClick={handleLogout} className="text-red-400 font-bold hover:text-red-300 text-sm border border-red-400 px-4 py-1 rounded hover:bg-red-400/10 transition">
                        Sair da Conta
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-1">
                    <div className="bg-[#2d2a2c] rounded-2xl p-6 shadow-xl border border-gray-700 sticky top-4 text-center">

                        <div className="relative inline-block mb-4">
                            <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-teal-400 to-purple-600">
                                <img
                                    src={userContext.currentAvatar || DEFAULT_AVATAR}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover bg-gray-800 border-4 border-[#2d2a2c]"
                                />
                            </div>

                            <span className="absolute bottom-2 right-2 bg-yellow-500 text-black font-bold w-10 h-10 flex items-center justify-center rounded-full border-4 border-[#2d2a2c]">
                                {Math.floor((userContext.xp || 0) / 1000) + 1}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1">{userContext.name}</h2>
                        {userContext.currentTitle && (
                            <span className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/30 mb-4">
                                {userContext.currentTitle}
                            </span>
                        )}

                        <div className="w-full h-px bg-gray-700 my-4"></div>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Saldo</p>
                                <p className="text-xl font-bold text-yellow-400 flex items-center gap-1">
                                    💰 {userContext.points}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">XP Total</p>
                                <p className="text-xl font-bold text-blue-400">{userContext.xp} XP</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Streak</p>
                                <p className="text-xl font-bold text-orange-400">🔥 {userContext.streak} dias</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Rank</p>
                                <p className="text-xl font-bold text-gray-300">{userContext.rank || "Novato"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-[#2d2a2c] rounded-2xl shadow-xl border border-gray-700 overflow-hidden min-h-[500px]">

                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                🎒 Inventário <span className="text-sm font-normal text-gray-500">({userContext.items?.length || 0} itens)</span>
                            </h3>
                            <Link to="/shop" className="text-teal-400 hover:text-teal-300 text-sm font-bold">
                                + Ir para Loja
                            </Link>
                        </div>

                        <div className="flex border-b border-gray-700 bg-black/20">
                            <button
                                onClick={() => setActiveTab('AVATAR')}
                                className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'AVATAR' ? 'text-teal-400 border-b-2 border-teal-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Avatares 👤
                            </button>
                            <button
                                onClick={() => setActiveTab('TITLE')}
                                className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'TITLE' ? 'text-purple-400 border-b-2 border-purple-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Títulos 👑
                            </button>
                            <button
                                onClick={() => setActiveTab('THEME')}
                                className={`flex-1 py-4 font-bold text-sm uppercase tracking-wide transition-colors ${activeTab === 'THEME' ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Temas 🎨
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredItems.length === 0 ? (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    <p className="text-lg mb-2">Nada por aqui...</p>
                                    <Link to="/shop" className="bg-teal-500 text-white px-4 py-2 rounded font-bold hover:bg-teal-600 transition">Visitar Loja</Link>
                                </div>
                            ) : (
                                filteredItems.map((item) => {
                                    let isEquipped = false;
                                    if (item.type === 'AVATAR') isEquipped = userContext.currentAvatar === item.image_url;
                                    if (item.type === 'TITLE') isEquipped = userContext.currentTitle === item.image_url;
                                    if (item.type === 'THEME') isEquipped = userContext.currentTheme === item.image_url;

                                    return (
                                        <div key={item.id} className={`bg-[#1f1b1d] rounded-xl p-4 border transition-all hover:scale-[1.02] ${isEquipped ? 'border-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.3)]' : 'border-gray-700 hover:border-gray-500'}`}>

                                            {/* Visual do Item */}
                                            <div className="h-24 flex items-center justify-center mb-4 bg-black/20 rounded-lg">
                                                {item.type === 'AVATAR' ? (
                                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-600" />
                                                ) : (
                                                    <span className="text-sm font-bold text-gray-300 px-2 text-center">
                                                        {item.image_url}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="font-bold text-white mb-1 truncate">{item.name}</h4>

                                            <button
                                                onClick={() => !isEquipped && handleEquip(item)}
                                                disabled={isEquipped}
                                                className={`w-full py-2 rounded font-bold text-sm mt-2 transition-colors ${
                                                    isEquipped
                                                        ? 'bg-transparent text-teal-400 border border-teal-400 cursor-default'
                                                        : 'bg-gray-700 hover:bg-teal-600 text-white'
                                                }`}
                                            >
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
        </div>
    );
}