import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import type { Question } from "../types/Question";
import type { AttemptQuestion } from "../types/AttemptQuestion";
import HomeNavBar from "../components/HomeNavBar";
import QuestionNavigator from "../components/QuestionNavigator";
import { UserContext, refreshUserContext } from "../common/context/UserCotext";

export default function QuestionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { book_id, question_id } = useParams();
    const userContext = useContext(UserContext);

    const isReadOnly = location.state?.readOnly || false;

    const [selected, setSelected] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);

    const [attemptQuestions, setAttemptQuestions] = useState<AttemptQuestion[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            const resQuestion = await api.get<Question>(`/attempt/question?attempt_question_id=${question_id}`, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            setQuestion(resQuestion.data);

            const resAttemptQ = await api.get<AttemptQuestion>(`/attempt/attempt_question?attempt_question_id=${question_id}`, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            setSelected(resAttemptQ.data.user_answer);
        } catch (error) {
            console.error("Erro ao carregar questão", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttemptStatus = async () => {
        try {
            const res = await api.get<AttemptQuestion[]>(`/attempt/attempted_questions?attempt_book_id=${book_id}`, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });
            const sorted = res.data.sort((a, b) => a.id - b.id);
            setAttemptQuestions(sorted);
        } catch (error) {
            console.error("Erro ao carregar status da prova", error);
        }
    };

    useEffect(() => {
        fetchQuestion();
        fetchAttemptStatus();
    }, [question_id]);

    const saveAnswer = async () => {
        // SEGURANÇA NO FRONT: Se for ReadOnly, não tenta salvar nada
        if (isReadOnly || !selected) return;

        await api.post(`/attempt/question_commit`, {
            id: question_id,
            attempt_id: book_id,
            user_answer: selected
        }, {
            headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
        });

        fetchAttemptStatus();
    };


    const handleNavigation = async (direction: 'next' | 'prev') => {
        await saveAnswer();

        const currentIndex = attemptQuestions.findIndex(q => q.id === Number(question_id));

        if (currentIndex === -1) return;

        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < attemptQuestions.length) {
            const nextQ = attemptQuestions[nextIndex];
            localStorage.setItem("attempt_questions_index", (nextIndex + 1).toString());
            // Repassa o state readOnly para a próxima página
            navigate(`/question_book/attempt/${book_id}/${nextQ.id}`, { state: { readOnly: isReadOnly } });
        }
    };

    const handleJumpToQuestion = async (targetId: number, index: number) => {
        await saveAnswer();
        localStorage.setItem("attempt_questions_index", index.toString());
        // Repassa o state readOnly ao pular de questão
        navigate(`/question_book/attempt/${book_id}/${targetId}`, { state: { readOnly: isReadOnly } });
    };

    const handleFinishAttempt = async () => {
        // Se estiver vendo a correção, o botão de finalizar apenas sai da tela
        if (isReadOnly) {
            navigate(`/question_book/${book_id}`); // Volta para os detalhes do caderno
            return;
        }

        await saveAnswer();

        try {
            const res = await api.post(`/attempt/finish`, { id: book_id }, {
                headers: { 'Authorization': `Bearer ${getTokenCookie()}` }
            });

            console.log("Prova finalizada:", res.data);

            await refreshUserContext(userContext);

            navigate(`/home`);
            alert(`Prova Finalizada! Você ganhou XP e Pontos.`);

        } catch (error) {
            console.error("Erro ao finalizar prova", error);
            alert("Erro ao finalizar. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1b1c] pb-10">
            <HomeNavBar />

            <div className="max-w-7xl mx-auto pt-10 px-4 flex flex-col md:flex-row gap-8">

                <div className="flex-1">
                    <div className="bg-[#D9D9D9] p-6 md:p-10 rounded-2xl shadow-md min-h-[600px] flex flex-col relative">

                        {loading && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl z-10">
                                <span className="text-xl font-bold text-teal-600 animate-pulse">Carregando questão...</span>
                            </div>
                        )}

                        <div className="w-full flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-[pixel] text-[#25DDB2] bg-black px-6 py-2 rounded-full shadow-lg">
                                Questão {attemptQuestions.findIndex(q => q.id === Number(question_id)) + 1}
                            </h1>
                            <span className="text-gray-500 font-bold text-lg">#{question?.number}</span>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-inner mb-6">
                            {question?.title.split("\n").map((line, i) => (
                                <p key={i} className="text-lg md:text-xl font-[pixel] mb-4 leading-relaxed text-gray-800">
                                    {line}
                                </p>
                            ))}
                        </div>

                        <div className="flex-1 space-y-3">
                            {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                                const text = question?.[`enum_${letter.toLowerCase()}` as keyof Question];

                                const isUserSelected = selected === letter;
                                // Nota: Verifique se o backend retorna "answer" ou "right_answer" dentro do objeto question
                                const isCorrectAnswer = question?.answer === letter;

                                // Lógica de Classes CSS
                                let borderClass = "border-transparent";
                                let bgClass = "bg-white hover:bg-gray-50";
                                let iconBgClass = "bg-gray-300";

                                if (isReadOnly) {
                                    // MODO CORREÇÃO
                                    bgClass = "bg-white"; // Remove hover padrão

                                    if (isCorrectAnswer) {
                                        // Gabarito (Verde) - Aparece sempre, mesmo se o usuário errou
                                        borderClass = "border-green-500";
                                        bgClass = "bg-green-100";
                                        iconBgClass = "bg-green-500";
                                    } else if (isUserSelected && !isCorrectAnswer) {
                                        // Erro do Usuário (Vermelho)
                                        borderClass = "border-red-500";
                                        bgClass = "bg-red-100";
                                        iconBgClass = "bg-red-500";
                                    }
                                } else {
                                    // MODO PROVA (Normal)
                                    if (isUserSelected) {
                                        borderClass = "border-teal-400 shadow-md";
                                        bgClass = "bg-teal-100";
                                        iconBgClass = "bg-teal-500";
                                    }
                                }

                                return (
                                    <label
                                        key={letter}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all border-2 
                                            ${borderClass} ${bgClass} ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-colors ${iconBgClass}`}>
                                            <input
                                                type="radio"
                                                name="option"
                                                value={letter}
                                                checked={isUserSelected}
                                                disabled={isReadOnly} // Bloqueia o input
                                                onChange={() => !isReadOnly && setSelected(letter)} // Só muda se não for ReadOnly
                                                className="hidden"
                                            />
                                            {letter}
                                        </div>
                                        <span className="text-lg font-[pixel] text-gray-800">{text}</span>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="flex justify-between mt-10">
                            <button
                                onClick={() => handleNavigation('prev')}
                                disabled={attemptQuestions.findIndex(q => q.id === Number(question_id)) === 0}
                                className="bg-[#8BC4B2] hover:bg-[#7ab09f] disabled:opacity-50 disabled:cursor-not-allowed text-black font-[pixel] text-xl md:text-2xl rounded-full px-8 py-3 shadow-xl transition-transform active:scale-95">
                                Anterior
                            </button>

                            <button
                                onClick={() => handleNavigation('next')}
                                disabled={attemptQuestions.findIndex(q => q.id === Number(question_id)) === attemptQuestions.length - 1}
                                className="bg-[#25DDB2] hover:bg-[#1fc49d] disabled:opacity-50 disabled:cursor-not-allowed text-black font-[pixel] text-xl md:text-2xl rounded-full px-8 py-3 shadow-xl transition-transform active:scale-95"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <QuestionNavigator
                        questions={attemptQuestions}
                        currentQuestionId={Number(question_id)}
                        onNavigate={handleJumpToQuestion}
                        onFinish={handleFinishAttempt}
                    />
                </div>

            </div>
        </div>
    );
}