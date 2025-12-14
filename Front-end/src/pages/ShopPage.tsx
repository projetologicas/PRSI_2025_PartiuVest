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

    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState(5000); // Valor inicial alto para mostrar tudo

    const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
    const [modalStatus, setModalStatus] = useState<{show: boolean, msg: string, type: 'success' | 'error'}>({show: false, msg: '', type: 'success'});

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

    const confirmPurchase = async () => {
        if (!selectedItem) return;

        try {
            systemContext.setLoading(true);
            await api.post(`/shop/buy/${selectedItem.id}`, {}, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            setSelectedItem(null);
            setModalStatus({ show: true, msg: `Compra de "${selectedItem.name}" realizada com sucesso!`, type: 'success' });

            await refreshUserContext(userContext);

        } catch (err: any) {
            setSelectedItem(null);
            setModalStatus({ show: true, msg: err?.response?.data?.message || "Erro na compra.", type: 'error' });
        } finally {
            systemContext.setLoading(false);
        }
    };

    const filteredGlobal = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = item.price <= maxPrice;
        return matchesSearch && matchesPrice;
    });

    const avatars = filteredGlobal.filter(i => i.type === 'AVATAR');
    const titles = filteredGlobal.filter(i => i.type === 'TITLE');
    const themes = filteredGlobal.filter(i => i.type === 'THEME');

    const ShopSection = ({ title, itemsList }: { title: string, itemsList: ShopItem[] }) => (
        <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-theme-text mb-4 pl-4 border-l-4 border-theme-accent flex items-center gap-2">
                {title} <span className="text-sm font-normal text-theme-subtext">({itemsList.length})</span>
            </h2>

            {itemsList.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-theme-subtext bg-theme-card/30 rounded-xl border border-dashed border-theme-border">
                    Nenhum item encontrado com esses filtros.
                </div>
            ) : (
                <div className="flex overflow-x-auto pb-8 gap-6 px-2 scrollbar-thin scrollbar-thumb-theme-accent scrollbar-track-transparent">
                    {itemsList.map(item => {
                        const isOwned = inventoryIds.includes(item.id);
                        const canAfford = userContext.points >= item.price;

                        return (
                            <div
                                key={item.id}
                                onClick={() => !isOwned && canAfford && setSelectedItem(item)}
                                className={`flex-shrink-0 w-60 bg-theme-card rounded-xl overflow-hidden shadow-lg border border-theme-border group relative transition-all duration-300 ${
                                    isOwned ? 'opacity-60 cursor-default' :
                                        !canAfford ? 'cursor-not-allowed' :
                                            'cursor-pointer hover:shadow-theme-accent/40 hover:scale-105'
                                }`}
                            >
                                <div className="transition-all duration-300 group-hover:brightness-[0.25] group-hover:blur-[1px]">

                                    <div className={`h-40 flex items-center justify-center relative overflow-hidden ${
                                        item.type === 'AVATAR' ? 'bg-gradient-to-br from-gray-800 to-black' :
                                            item.type === 'THEME' ? 'bg-gradient-to-br from-blue-900 to-gray-900' :
                                                'bg-gradient-to-br from-purple-900 to-gray-900'
                                    }`}>
                                        {item.type === 'AVATAR' ? (
                                            <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-full border-4 border-theme-card shadow-xl object-cover z-10" />
                                        ) : (
                                            <span className="text-5xl drop-shadow-lg z-10">{item.type === 'THEME' ? '🎨' : '👑'}</span>
                                        )}
                                    </div>

                                    {/* Info do Item */}
                                    <div className="p-4 bg-theme-card h-full">
                                        <h3 className="font-bold text-theme-text truncate text-lg">{item.name}</h3>
                                        {item.type === 'TITLE' && <p className="text-xs text-theme-accent mt-1 truncate">"{item.image_url}"</p>}

                                        <div className="mt-4 flex justify-between items-center">
                                            {isOwned ? (
                                                <span className="text-green-500 font-bold text-xs uppercase flex items-center gap-1">
                                                    ✅ Seu
                                                </span>
                                            ) : (
                                                <span className={`font-bold text-lg flex items-center gap-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    💰 {item.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {!isOwned && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        {canAfford ? (
                                            <>
                                                <span className="text-4xl mb-2 drop-shadow-lg">🛒</span>
                                                <span className="text-white font-black text-xl uppercase tracking-widest drop-shadow-md border-b-2 border-theme-accent pb-1">
                                                    COMPRAR
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-4xl mb-2 grayscale">🔒</span>
                                                <span className="text-red-400 font-bold text-sm uppercase tracking-wider bg-black/80 px-3 py-1 rounded">
                                                    Saldo Insuficiente
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}

                                {isOwned && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <span className="text-green-400 font-bold text-lg bg-black/60 px-4 py-2 rounded-full border border-green-500">
                                            Já Adquirido
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text pb-20 transition-colors duration-300 font-sans">
            <HomeNavBar />

            <div className="relative bg-theme-card border-b border-theme-border py-10 mb-8 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                            <span className="text-theme-accent">Loja</span> de Itens
                        </h1>
                        <p className="text-theme-subtext text-lg">Personalize seu perfil com suas conquistas.</p>
                    </div>

                    <div className="bg-theme-bg border border-theme-border px-8 py-3 rounded-2xl shadow-inner flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] text-theme-subtext font-bold uppercase tracking-wider">Seu Saldo Atual</p>
                            <p className="text-3xl font-bold text-yellow-500 flex items-center gap-2">
                                💰 {userContext.points}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-10">
                <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 items-center">

                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-theme-subtext uppercase mb-2">Buscar Item</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Ex: Tema Matrix, Coroa..."
                                className="w-full bg-theme-bg border border-theme-border text-theme-text pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-theme-accent transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-theme-subtext uppercase">Preço Máximo</label>
                            <span className="text-xs font-bold text-theme-accent">💰 {maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full h-2 bg-theme-bg rounded-lg appearance-none cursor-pointer accent-theme-accent"
                        />
                        <div className="flex justify-between text-[10px] text-theme-subtext mt-1">
                            <span>0</span>
                            <span>5000+</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <ShopSection title="Avatares" itemsList={avatars} />
                <ShopSection title="Temas Visuais" itemsList={themes} />
                <ShopSection title="Títulos Honorários" itemsList={titles} />
            </div>

            {selectedItem && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-theme-card border border-theme-border w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
                        <h3 className="text-xl font-bold text-theme-text mb-4 text-center">Confirmar Compra</h3>

                        <div className="flex flex-col items-center mb-6 bg-theme-bg p-4 rounded-xl border border-theme-border">
                            {selectedItem.type === 'AVATAR' && <img src={selectedItem.image_url} className="w-20 h-20 rounded-full mb-3 shadow-lg" />}
                            <p className="font-bold text-lg text-theme-text">{selectedItem.name}</p>
                            <p className="text-yellow-500 font-bold text-2xl mt-1">💰 {selectedItem.price}</p>
                        </div>

                        <p className="text-theme-subtext text-center mb-6 text-sm">
                            Deseja confirmar a compra deste item? <br/>
                            <span className="text-xs opacity-70">Seu saldo após a compra: {userContext.points - selectedItem.price}</span>
                        </p>

                        <div className="flex gap-3">
                            <button onClick={() => setSelectedItem(null)} className="flex-1 py-3 rounded-lg font-bold bg-theme-bg text-theme-subtext hover:bg-gray-700 transition">
                                Cancelar
                            </button>
                            <button
                                onClick={confirmPurchase}
                                className="flex-1 py-3 rounded-lg font-bold text-white bg-theme-accent hover:opacity-90 transition shadow-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalStatus.show && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className={`bg-theme-card border-l-8 w-full max-w-sm rounded-r-xl p-8 shadow-2xl animate-bounce-in ${modalStatus.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
                        <h3 className={`text-2xl font-bold mb-2 ${modalStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {modalStatus.type === 'success' ? 'Sucesso!' : 'Erro!'}
                        </h3>
                        <p className="text-theme-text font-medium mb-6">{modalStatus.msg}</p>
                        <button
                            onClick={() => setModalStatus({ ...modalStatus, show: false })}
                            className="w-full py-2 bg-theme-bg border border-theme-border rounded font-bold hover:bg-theme-accent hover:text-white transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}