import { useEffect, useState, useContext } from "react";
import HomeNavBar from "../components/HomeNavBar";
import { getXpLeaderboard, getStreakLeaderboard, type Page } from "../services/api";
import type {User} from "../types/User";
import { UserContext } from "../common/context/UserCotext";

type RankingType = 'XP' | 'STREAK';

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
            setPage(0); // Volta para a primeira página
        }
    };

    const renderRankBadge = (index: number, actualPage: number) => {
        const globalPosition = (actualPage * 10) + index + 1;

        if (globalPosition === 1) return <span className="text-3xl">🥇</span>;
        if (globalPosition === 2) return <span className="text-3xl">🥈</span>;
        if (globalPosition === 3) return <span className="text-3xl">🥉</span>;

        return <span className="font-bold text-gray-600 text-xl">#{globalPosition}</span>;
    };

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-black pb-10 select-none">
            <HomeNavBar />

            {/* Container Principal */}
            <div className="bg-[#dcdcdc] mx-4 md:mx-auto mt-6 rounded-lg shadow-lg px-6 py-10 max-w-6xl min-h-[600px]">

                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600" style={{ fontFamily: "monospace" }}>
                        HALL DA FAMA
                    </h1>
                    <p className="text-gray-600 text-lg font-semibold">Quem são os mestres do vestibular?</p>
                </div>

                {/* Botões de Alternância (Tabs) */}
                <div className="flex justify-center gap-6 mb-8">
                    <button
                        onClick={() => handleTabChange('XP')}
                        className={`px-8 py-3 rounded-full font-bold text-xl transition-all shadow-md border-2 border-transparent ${
                            rankingType === 'XP'
                                ? 'bg-blue-600 text-white scale-105'
                                : 'bg-white text-gray-500 hover:border-blue-400'
                        }`}
                        style={{ fontFamily: "monospace" }}
                    >
                        ⚡ Ranking XP
                    </button>
                    <button
                        onClick={() => handleTabChange('STREAK')}
                        className={`px-8 py-3 rounded-full font-bold text-xl transition-all shadow-md border-2 border-transparent ${
                            rankingType === 'STREAK'
                                ? 'bg-orange-500 text-white scale-105'
                                : 'bg-white text-gray-500 hover:border-orange-400'
                        }`}
                        style={{ fontFamily: "monospace" }}
                    >
                        🔥 Ranking Streak
                    </button>
                </div>

                {/* Tabela de Classificação */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-xl font-bold text-gray-400 animate-pulse">
                            Carregando lendas...
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {/* Cabeçalho da Tabela */}
                            <div className="grid grid-cols-12 bg-gray-200 p-4 font-bold text-gray-700 border-b-2 border-gray-300">
                                <div className="col-span-2 text-center">Pos.</div>
                                <div className="col-span-7 pl-4">Aluno</div>
                                <div className="col-span-3 text-right pr-6">
                                    {rankingType === 'XP' ? 'XP Total' : 'Dias Seguidos'}
                                </div>
                            </div>

                            {/* Lista de Usuários */}
                            {data?.content.map((user, index) => {
                                const isMe = user.email === userContext.email;
                                return (
                                    <div
                                        key={user.id}
                                        className={`grid grid-cols-12 p-4 items-center border-b last:border-0 transition-colors ${
                                            isMe ? 'bg-blue-100' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {/* Posição / Medalha */}
                                        <div className="col-span-2 text-center flex justify-center items-center">
                                            {renderRankBadge(index, page)}
                                        </div>

                                        {/* Nome e Avatar */}
                                        <div className="col-span-7 flex items-center gap-4 pl-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-sm ${
                                                isMe ? 'bg-blue-500' : 'bg-gray-400'
                                            }`}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-lg leading-tight ${isMe ? 'font-bold text-blue-700' : 'font-semibold text-gray-800'}`}>
                                                    {user.name} {isMe && '(Você)'}
                                                </span>
                                                <span className="text-xs text-gray-500 font-mono">
                                                    Membro desde {new Date(user.sign_date).getFullYear()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Pontuação */}
                                        <div className="col-span-3 text-right pr-6 font-mono font-bold text-2xl text-gray-800">
                                            {rankingType === 'XP'
                                                ? <span className="text-blue-600">{user.xp} XP</span>
                                                : <span className="text-orange-500">{user.streak} 🔥</span>
                                            }
                                        </div>
                                    </div>
                                );
                            })}

                            {data?.content.length === 0 && (
                                <div className="p-10 text-center text-gray-500">
                                    Nenhum aluno no ranking ainda. Seja o primeiro!
                                </div>
                            )}
                        </div>
                    )}

                    {/* Paginação */}
                    <div className="p-4 bg-gray-100 flex justify-between items-center border-t border-gray-300">
                        <button
                            disabled={page === 0 || loading}
                            onClick={() => setPage(p => p - 1)}
                            className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-600 shadow-sm"
                        >
                            Anterior
                        </button>

                        <span className="text-gray-700 font-bold font-mono">
                            Página {page + 1} de {data?.totalPages || 1}
                        </span>

                        <button
                            disabled={!data || data.last || loading}
                            onClick={() => setPage(p => p + 1)}
                            className="px-6 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-gray-600 shadow-sm"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}