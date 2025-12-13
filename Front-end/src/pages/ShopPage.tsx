import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import { UserContext, refreshUserContext } from "../common/context/UserCotext";
import { SystemContext } from "../common/context/SystemContext";
import HomeNavBar from "../components/HomeNavBar";
import type { ShopItem } from "../types/ShopItem";

export default function ShopPage() {
    const userContext = useContext(UserContext);
    const systemContext = useContext(SystemContext);
    const [items, setItems] = useState<ShopItem[]>([]);

    const inventoryIds = userContext.items?.map((i) => i.id) || [];

    useEffect(() => {
        const fetchShop = async () => {
            try {
                systemContext.setLoading(true);
                const res = await api.get<ShopItem[]>("/shop", {
                    headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
                });
                setItems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                systemContext.setLoading(false);
            }
        };
        fetchShop();
    }, []);

    const handleBuy = async (item: ShopItem) => {
        if (!confirm(`Comprar "${item.name}" por ${item.price} pontos?`)) return;

        try {
            systemContext.setLoading(true);
            await api.post(`/shop/buy/${item.id}`, {}, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            alert(`Compra de "${item.name}" realizada!`);

            await refreshUserContext(userContext);

        } catch (err: any) {
            alert(err?.response?.data?.message || "Erro na compra.");
        } finally {
            systemContext.setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-white pb-10">
            <HomeNavBar />

            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="bg-[#2d2a2c] p-6 rounded-2xl shadow-lg mb-8 flex justify-between items-center border border-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-400">Loja Oficial</h1>
                        <p className="text-gray-400">Invista seus pontos em personalização!</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/50 px-6 py-3 rounded-xl">
                        <p className="text-xs text-yellow-500 font-bold uppercase">Saldo</p>
                        <p className="text-2xl font-bold text-yellow-400">💰 {userContext.points}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => {
                        const isOwned = inventoryIds.includes(item.id);

                        const canAfford = userContext.points >= item.price;

                        return (
                            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col">
                                <div className={`h-32 flex items-center justify-center ${
                                    item.type === 'AVATAR' ? 'bg-purple-600' :
                                        item.type === 'THEME' ? 'bg-blue-600' : 'bg-orange-500'
                                }`}>
                                    {item.type === 'AVATAR' ? (
                                        <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 object-cover translate-y-6" />
                                    ) : (
                                        <span className="text-5xl drop-shadow-lg">{item.type === 'THEME' ? '🎨' : '👑'}</span>
                                    )}
                                </div>

                                <div className="p-6 pt-10 flex-1 flex flex-col justify-between">
                                    <div className="text-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.type}</span>
                                        <h3 className="text-xl font-bold text-gray-800 mt-1">{item.name}</h3>
                                        {item.type === 'TITLE' && <p className="text-sm text-teal-600 font-bold mt-1">"{item.image_url}"</p>}
                                    </div>

                                    <div className="mt-6">
                                        {isOwned ? (
                                            <button disabled className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed">
                                                Adquirido ✅
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleBuy(item)}
                                                disabled={!canAfford}
                                                className={`w-full font-bold py-3 rounded-lg shadow transition-all ${
                                                    canAfford
                                                        ? "bg-teal-500 hover:bg-teal-600 text-white active:scale-95"
                                                        : "bg-red-100 text-red-400 cursor-not-allowed"
                                                }`}
                                            >
                                                Comprar por 💰{item.price}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}