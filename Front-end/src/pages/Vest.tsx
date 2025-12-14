import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QuestionBook } from "../types/QuestionBook";
import { getTokenCookie } from "../services/Cookies";
import { SystemContext } from "../common/context/SystemContext";
import HomeNavBar from "../components/HomeNavBar";
import api from "../services/api";

export default function Vestibulares() {
    const [lista, setLista] = useState<QuestionBook[]>([]);
    const navigate = useNavigate();
    const systemContext = useContext(SystemContext);

    // Estados do Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [amount, setAmount] = useState(30);

    const availableYears = lista.filter(b => !b.r_generated);

    const fetchVestibulares = async () => {
        try {
            // O backend agora retorna: Oficiais + Meus Personalizados
            const res = await api.get<QuestionBook[]>("/question_book/", {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            const sortedList = res.data.sort((a, b) =>
                new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()
            );

            setLista(sortedList);
        } catch (err: any) {
            console.error(err);
            systemContext.setError(err?.response?.data?.message ?? 'Erro ao buscar simulados.');
        }
    };

    useEffect(() => {
        systemContext.setLoading(true);
        fetchVestibulares().finally(() => systemContext.setLoading(false));
    }, []);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!confirm("Tem certeza que deseja excluir este simulado?")) return;

        try {
            await api.delete(`/question_book/${id}`, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            await fetchVestibulares(); // Recarrega a lista
        } catch (error: any) {
            console.error("Erro ao deletar", error);
            // Mostra mensagem amigável caso o backend negue (403/500)
            alert(error?.response?.data?.message || "Erro ao excluir. Verifique se você tem permissão.");
        }
    };

    const handleNewQuestionBook = async () => {
        try {
            await api.post("/question_book/new", {}, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            await fetchVestibulares();
        } catch (error) {
            console.error("Erro ao gerar", error);
        }
    }

    const handleCreateCustom = async () => {
        try {
            await api.post("/question_book/new/custom", {
                amount: amount,
                yearsIds: selectedYears
            }, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            setShowModal(false);
            setSelectedYears([]);
            await fetchVestibulares();
        } catch (error) {
            console.error("Erro ao criar", error);
            alert("Erro ao criar simulado.");
        }
    };

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text pb-10 transition-colors duration-300 font-sans">
            <HomeNavBar/>

            <div className="mx-auto mt-8 max-w-7xl px-4">

                <div className="bg-theme-card rounded-xl shadow-lg p-8 border border-theme-border mb-8">
                    <h1 className="text-3xl font-bold mb-6 text-theme-text">Meus Simulados & Vestibulares</h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleNewQuestionBook}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-4 rounded-xl text-lg flex-1 shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Gerar simulado aleatório
                        </button>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-theme-accent hover:opacity-90 text-white font-bold px-6 py-4 rounded-xl text-lg flex-1 shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Criar simulado personalizado
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {lista.length === 0 && (
                        <p className="text-center text-theme-subtext py-10">Nenhum simulado encontrado.</p>
                    )}

                    {lista.map((vest) => {
                        const creationDate = new Date(vest.creation_date).toLocaleDateString("pt-BR");
                        const questionsCount = vest.questions_id ? vest.questions_id.length : 0;
                        const isCustom = vest.r_generated;

                        return (
                            <div
                                key={vest.id}
                                className={`group relative cursor-pointer p-6 rounded-xl shadow-sm border transition-all hover:scale-[1.01] hover:shadow-md
                                    ${isCustom ? 'bg-theme-card border-theme-border hover:border-theme-accent' : 'bg-theme-card border-l-4 border-l-theme-accent border-theme-border'}
                                `}
                                onClick={() => navigate(`/question_book/details/${vest.id}`)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-xl font-bold text-theme-text">{vest.model}</span>
                                            {isCustom ? (
                                                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-500 px-2 py-1 rounded uppercase tracking-wider border border-blue-500/20">
                                                    Personalizado
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold bg-theme-accent/10 text-theme-accent px-2 py-1 rounded uppercase tracking-wider border border-theme-accent/20">
                                                    Oficial
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-theme-subtext font-medium flex gap-4 mt-1">
                                            <span>📚 {questionsCount} Questões</span>
                                            <span>📅 {creationDate}</span>
                                        </div>
                                    </div>

                                    {/* Botão Delete (Visível apenas em Personalizados) */}
                                    {isCustom && (
                                        <button
                                            onClick={(e) => handleDelete(e, vest.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 text-theme-subtext hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                                            title="Excluir Simulado"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ... Modal Code (Mantenha o mesmo modal do código anterior) ... */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-theme-card p-8 rounded-2xl w-full max-w-md shadow-2xl border border-theme-border relative">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-theme-text">Novo Simulado</h2>
                            <button onClick={() => setShowModal(false)} className="text-theme-subtext hover:text-theme-text">✕</button>
                        </div>

                        <label className="block mb-2 font-bold text-theme-text text-sm uppercase">Quantidade</label>
                        <select
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            className="w-full p-3 bg-theme-bg border border-theme-border rounded-xl mb-6 text-theme-text focus:border-theme-accent outline-none"
                        >
                            <option value={10}>10 Questões</option>
                            <option value={30}>30 Questões</option>
                            <option value={60}>60 Questões</option>
                            <option value={90}>90 Questões</option>
                        </select>

                        <label className="block mb-2 font-bold text-theme-text text-sm uppercase">Fontes / Vestibulares</label>
                        <div className="flex flex-col gap-2 mb-8 max-h-48 overflow-y-auto p-2 bg-theme-bg rounded-xl border border-theme-border custom-scrollbar">
                            {availableYears.map(yearBook => (
                                <label key={yearBook.id} className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${
                                    selectedYears.includes(yearBook.id) ? 'bg-theme-accent/10 border-theme-accent' : 'border-transparent hover:bg-theme-card'
                                }`}>
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-theme-accent"
                                        checked={selectedYears.includes(yearBook.id)}
                                        onChange={e => {
                                            if(e.target.checked) setSelectedYears([...selectedYears, yearBook.id]);
                                            else setSelectedYears(selectedYears.filter(id => id !== yearBook.id));
                                        }}
                                    />
                                    <span className={`text-sm ${selectedYears.includes(yearBook.id) ? 'font-bold text-theme-text' : 'text-theme-subtext'}`}>
                                        {yearBook.model}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 bg-theme-bg hover:bg-theme-border text-theme-subtext rounded-xl font-bold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateCustom}
                                disabled={selectedYears.length === 0}
                                className="flex-1 py-3 bg-theme-accent hover:opacity-90 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg"
                            >
                                Gerar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}