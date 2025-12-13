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

    // Filtra apenas os cadernos "Originais"
    const availableYears = lista.filter(b => !b.r_generated);

    // --- FUNÇÃO DE CARREGAMENTO ---
    const fetchVestibulares = async () => {
        try {
            const res = await api.get<QuestionBook[]>("/question_book/", {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            // Ordena: Mais recentes primeiro
            const sortedList = res.data.sort((a, b) =>
                new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()
            );

            setLista(sortedList);
        } catch (err: any) {
            console.error(err);
            systemContext.setError(err?.response?.data?.message ?? 'Erro ao adquirir livros de questões');
        }
    };

    // useEffect chama a função ao abrir a página
    useEffect(() => {
        systemContext.setLoading(true);
        fetchVestibulares().finally(() => systemContext.setLoading(false));
    }, []);

    // --- NOVA FUNÇÃO: DELETAR ---
    const handleDelete = async (e: React.MouseEvent, id: number) => {
        // Importante: Impede que o clique propague para o onClick do card (que navegaria para a página)
        e.stopPropagation();

        if (!confirm("Tem certeza que deseja excluir este simulado? O histórico de tentativas dele será perdido.")) {
            return;
        }

        try {
            await api.delete(`/question_book/${id}`, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            // Recarrega a lista para remover o item visualmente
            await fetchVestibulares();

        } catch (error) {
            console.error("Erro ao deletar", error);
            alert("Erro ao excluir. Verifique se é um caderno permitido.");
        }
    };

    const handleNewQuestionBook = async () => {
        try {
            await api.post("/question_book/new", {}, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            await fetchVestibulares();
        } catch (error) {
            console.error("Erro ao gerar aleatório", error);
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
            console.error("Erro ao criar customizado", error);
            alert("Erro ao criar simulado. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-black pb-10">

            <HomeNavBar/>

            {/* Conteúdo */}
            <div className="bg-[#dcdcdc] mx-4 mt-6 rounded-lg shadow-lg px-10 py-10 max-w-7xl md:mx-auto">
                <div className="text-3xl font-bold space-y-6">

                    {/* Área de Botões */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <button
                            onClick={handleNewQuestionBook}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg text-lg flex-1 shadow-md transition-all active:scale-95"
                        >
                            🎲 Gerar Aleatório (Padrão)
                        </button>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg text-lg flex-1 shadow-md transition-all active:scale-95"
                        >
                            ⚙️ Criar Personalizado
                        </button>
                    </div>

                    {/* Lista de Cadernos */}
                    <div className="grid gap-4">
                        {lista.map((vest) => {
                            const creationDate = new Date(vest.creation_date).toLocaleDateString("pt-BR");
                            const questionsCount = vest.questions_id ? vest.questions_id.length : 0;

                            return (
                                <div
                                    key={vest.id}
                                    className="group relative cursor-pointer hover:bg-gray-50 p-6 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-2 transition-all"
                                    onClick={() => navigate(`/question_book/details/${vest.id}`)}
                                >
                                    {/* Header do Card com Flexbox para separar Título da Lixeira */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-xl font-bold text-gray-800">{vest.model}</span>

                                            {vest.r_generated && (
                                                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Aleatório
                                                </span>
                                            )}
                                        </div>

                                        {/* BOTÃO DE DELETE (SÓ APARECE SE FOR GERADO) */}
                                        {vest.r_generated && (
                                            <button
                                                onClick={(e) => handleDelete(e, vest.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                                                title="Excluir Simulado"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-sm text-gray-500 flex flex-col gap-1 font-medium">
                                        <span>📚 {questionsCount} Questões</span>
                                        <span>📅 Criado em: {creationDate}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* --- MODAL DE CONFIGURAÇÃO --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Configurar Simulado</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
                        </div>

                        {/* Seleção de Quantidade */}
                        <label className="block mb-2 font-bold text-gray-700">Quantidade de Questões:</label>
                        <select
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl mb-6 text-lg focus:border-teal-500 focus:ring-0 outline-none bg-white"
                        >
                            <option value={10}>10 Questões (Rápido)</option>
                            <option value={30}>30 Questões (Treino)</option>
                            <option value={60}>60 Questões (Intenso)</option>
                            <option value={90}>90 Questões (Simulado Real)</option>
                        </select>

                        {/* Seleção de Anos */}
                        <label className="block mb-2 font-bold text-gray-700">Fontes das Questões:</label>
                        <div className="flex flex-col gap-2 mb-8 max-h-48 overflow-y-auto border-2 border-gray-200 p-3 rounded-xl bg-gray-50 custom-scrollbar">
                            {availableYears.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Nenhum ano base disponível.</p>
                            ) : (
                                availableYears.map(yearBook => (
                                    <label key={yearBook.id} className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-colors border ${
                                        selectedYears.includes(yearBook.id) ? 'bg-teal-50 border-teal-200' : 'hover:bg-gray-200 border-transparent'
                                    }`}>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-teal-600 cursor-pointer"
                                            checked={selectedYears.includes(yearBook.id)}
                                            onChange={e => {
                                                if(e.target.checked) setSelectedYears([...selectedYears, yearBook.id]);
                                                else setSelectedYears(selectedYears.filter(id => id !== yearBook.id));
                                            }}
                                        />
                                        <span className={`text-lg ${selectedYears.includes(yearBook.id) ? 'font-bold text-teal-800' : 'text-gray-700'}`}>
                                            {yearBook.model}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>

                        {/* Botões do Modal */}
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateCustom}
                                disabled={selectedYears.length === 0}
                                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
                            >
                                Gerar Simulado
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}