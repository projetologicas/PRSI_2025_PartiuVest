import { useEffect, useState, useContext } from "react";
import HomeNavBar from "../components/HomeNavBar";
import { getXpLeaderboard, getStreakLeaderboard, type Page } from "../services/api";
import type { User } from "../types/User";
import { UserContext } from "../common/context/UserCotext";

type RankingType = 'XP' | 'STREAK';

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default function Leaderboard() {
    const userContext = useContext(UserContext);
    const [rankingType, setRankingType] = useState<RankingType>('XP');
    const [data, setData] = useState<Page<User> | null>(null);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [rankingType, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let result;
            if (rankingType === 'XP') {
                result = await getXpLeaderboard(page, 10);
            } else {
                result = await getStreakLeaderboard(page, 10);
            }
            setData(result);
        } catch (error) {
            console.error("Erro ao buscar ranking", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (type: RankingType) => {
        if (type !== rankingType) {
            setRankingType(type);
            setPage(0);
        }
    };

    const renderRankBadge = (index: number, actualPage: number) => {
        const globalPosition = (actualPage * 10) + index + 1;

        if (globalPosition === 1) return <span className="text-3xl drop-shadow-md">🥇</span>;
        if (globalPosition === 2) return <span className="text-3xl drop-shadow-md">🥈</span>;
        if (globalPosition === 3) return <span className="text-3xl drop-shadow-md">🥉</span>;

        return <span className="font-bold text-theme-subtext text-xl">#{globalPosition}</span>;
    };

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text pb-10 select-none transition-colors duration-300 font-sans">
            <HomeNavBar />

            {/* Container Principal */}
            <div className="max-w-6xl mx-auto mt-8 px-4">

                <div className="bg-theme-card rounded-2xl shadow-2xl border border-theme-border p-8 min-h-[600px] transition-colors duration-300">

                    {/* Cabeçalho */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent tracking-tight font-mono">
                            HALL DA FAMA
                        </h1>
                        <div className="h-1 w-24 bg-theme-accent mx-auto rounded-full mt-4"></div>
                    </div>

                    {/* Botões de Alternância (Tabs) */}
                    <div className="flex justify-center gap-6 mb-8">
                        <button
                            onClick={() => handleTabChange('XP')}
                            className={`px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg border border-transparent ${
                                rankingType === 'XP'
                                    ? 'bg-blue-600 text-white scale-105 shadow-blue-500/30'
                                    : 'bg-theme-bg text-theme-subtext hover:border-blue-400 hover:text-theme-text'
                            }`}
                        >
                            ⚡ Ranking XP
                        </button>
                        <button
                            onClick={() => handleTabChange('STREAK')}
                            className={`px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg border border-transparent ${
                                rankingType === 'STREAK'
                                    ? 'bg-orange-500 text-white scale-105 shadow-orange-500/30'
                                    : 'bg-theme-bg text-theme-subtext hover:border-orange-400 hover:text-theme-text'
                            }`}
                        >
                            🔥 Ranking Streak
                        </button>
                    </div>

                    {/* Tabela de Classificação */}
                    <div className="bg-theme-bg rounded-xl shadow-inner border border-theme-border overflow-hidden">
                        {loading ? (
                            <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-4 border-theme-accent border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xl font-bold text-theme-subtext">Carregando lendas...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {/* Cabeçalho da Tabela */}
                                <div className="grid grid-cols-12 bg-black/10 dark:bg-white/5 p-4 font-bold text-theme-subtext border-b border-theme-border text-sm uppercase tracking-wider">
                                    <div className="col-span-2 text-center">Rank</div>
                                    <div className="col-span-7 pl-4">Aluno</div>
                                    <div className="col-span-3 text-right pr-6">
                                        {rankingType === 'XP' ? 'TOTAL XP' : 'STREAK'}
                                    </div>
                                </div>

                                {/* Lista de Usuários */}
                                {data?.content.map((user, index) => {
                                    const isMe = user.email === userContext.email;
                                    return (
                                        <div
                                            key={user.id}
                                            className={`grid grid-cols-12 p-4 items-center border-b border-theme-border last:border-0 transition-colors ${
                                                isMe
                                                    ? 'bg-blue-500/10 border-l-4 border-l-blue-500'
                                                    : 'hover:bg-theme-card'
                                            }`}
                                        >
                                            {/* Posição */}
                                            <div className="col-span-2 text-center flex justify-center items-center">
                                                {renderRankBadge(index, page)}
                                            </div>

                                            {/* Nome e Avatar */}
                                            <div className="col-span-7 flex items-center gap-4 pl-4">
                                                {/* 2. Abordagem atualizada igual a Dados.tsx:
                                                    - Usa DEFAULT_AVATAR se user.currentAvatarUrl for nulo
                                                    - Mantém o estilo de borda/gradiente
                                                */}
                                                <div className={`w-12 h-12 p-0.5 rounded-full flex items-center justify-center shadow-md ${
                                                    isMe ? 'bg-gradient-to-tr from-blue-500 to-teal-400' : 'bg-gray-500'
                                                }`}>
                                                    <img
                                                        src={userContext.currentAvatar || DEFAULT_AVATAR}
                                                        className="w-full h-full rounded-full object-cover bg-theme-bg border-2 border-theme-card"
                                                        alt="Avatar"
                                                    />
                                                </div>

                                                <div className="flex flex-col items-start gap-1">
                                                    <span className={`text-lg leading-tight truncate ${isMe ? 'font-bold text-blue-500' : 'font-semibold text-theme-text'}`}>
                                                        {user.name} {isMe && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded ml-2">VOCÊ</span>}
                                                    </span>

                                                    {/* 3. Estilo do Título igual ao Dados.tsx (Tag Style)
                                                        Adaptado o tamanho (py-0.5) para caber na lista
                                                    */}
                                                    {userContext.currentTitle && (
                                                        <span className="bg-theme-bg border border-theme-border text-theme-accent px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                                            {userContext.currentTitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Pontuação */}
                                            <div className="col-span-3 text-right pr-6 font-mono font-bold text-2xl">
                                                {rankingType === 'XP'
                                                    ? <span className="text-blue-500 drop-shadow-sm">{user.xp} XP</span>
                                                    : <span className="text-orange-500 drop-shadow-sm">{user.streak} 🔥</span>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}

                                {data?.content.length === 0 && (
                                    <div className="p-16 text-center text-theme-subtext">
                                        Nenhum aluno no ranking ainda.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Paginação */}
                        <div className="p-4 bg-black/5 dark:bg-white/5 flex justify-between items-center border-t border-theme-border">
                            <button
                                disabled={page === 0 || loading}
                                onClick={() => setPage(p => p - 1)}
                                className="px-6 py-2 bg-theme-card border border-theme-border rounded hover:bg-theme-bg disabled:opacity-50 disabled:cursor-not-allowed font-bold text-theme-text shadow-sm transition-colors"
                            >
                                Anterior
                            </button>

                            <span className="text-theme-text font-bold font-mono">
                                Página {page + 1} de {data?.totalPages || 1}
                            </span>

                            <button
                                disabled={!data || data.last || loading}
                                onClick={() => setPage(p => p + 1)}
                                className="px-6 py-2 bg-theme-card border border-theme-border rounded hover:bg-theme-bg disabled:opacity-50 disabled:cursor-not-allowed font-bold text-theme-text shadow-sm transition-colors"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}