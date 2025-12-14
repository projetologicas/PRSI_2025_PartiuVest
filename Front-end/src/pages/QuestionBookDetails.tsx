import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SystemContext } from "../common/context/SystemContext";
import axios from "axios";
import { getTokenCookie } from "../services/Cookies";
import type { QuestionBook } from "../types/QuestionBook";
import type { Attempt } from "../types/Attempt";
import type { Question } from "../types/Question";
import type { AttemptQuestion } from "../types/AttemptQuestion";
import HomeNavBar from "../components/HomeNavBar";
import { AttemptContext } from "../common/context/AttemptContext";
import { UserContext } from "../common/context/UserCotext";

export default function QuestionBookDetails() {
    const navigate = useNavigate();
    const systemContext = useContext(SystemContext);
    const attemptContext = useContext(AttemptContext);
    const userContext = useContext(UserContext); // Para verificação de permissão

    const [question_book, setQuestionBook] = useState<QuestionBook>();
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const { book_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                systemContext.setLoading(true);
                systemContext.setError(null);
                const headers = { 'Authorization': `Bearer ${getTokenCookie()}` };

                // 1. Busca Dados Principais em Paralelo
                const [bookRes, attemptsRes, questionsRes] = await Promise.all([
                    axios.get(`http://localhost:8080/question_book/id?question_book_id=${book_id}`, { headers }),
                    axios.get(`http://localhost:8080/attempt/question_book_user?question_book_id=${book_id}`, { headers }),
                    axios.get(`http://localhost:8080/question/question_book?question_book_id=${book_id}`, { headers })
                ]);

                setQuestionBook(bookRes.data);

                // --- VERIFICAÇÃO DE PERMISSÃO (Simulado Personalizado) ---
                // Se for gerado (custom) e o email do criador não bater com o usuário logado
                // Nota: Assumimos que o backend envia 'user_email' ou similar. Se não enviar, essa checagem pode falhar silenciosamente ou deve ser removida.
                if (bookRes.data.r_generated && bookRes.data.user_email && bookRes.data.user_email !== userContext.email) {
                    alert("Você não tem permissão para acessar este caderno personalizado.");
                    navigate('/home');
                    return;
                }

                // 2. Processa Questões (Busca modelos originais)
                let loadedQuestions = questionsRes.data;
                const originalBookIds = [...new Set(loadedQuestions.map((q: any) => q.original_question_book_id))];

                if (originalBookIds.length > 0) {
                    const bookModels = await Promise.all(
                        originalBookIds.map((id) =>
                            axios.get(`http://localhost:8080/question_book/id?question_book_id=${id}`, { headers })
                                .then(res => ({ id, model: res.data.model }))
                        )
                    );

                    loadedQuestions = loadedQuestions.map((q: any) => {
                        const found = bookModels.find(b => b.id === q.original_question_book_id);
                        return found ? { ...q, original_question_book_model: found.model } : q;
                    });
                }
                setQuestions(loadedQuestions);

                // 3. Processa Tentativas (Busca detalhes de cada tentativa)
                // Substituindo o map(async) incorreto por Promise.all
                const detailedAttempts = await Promise.all(
                    attemptsRes.data.map(async (attempt: Attempt) => {
                        try {
                            const detailRes = await axios.get(`http://localhost:8080/attempt/attempted_questions?attempt_book_id=${attempt.id}`, { headers });
                            const attemptQs = detailRes.data as AttemptQuestion[];

                            // Calcula estatísticas
                            const correctCount = attemptQs.filter(q => q.user_answer === q.right_answer).length;

                            return {
                                ...attempt,
                                correct_answers: correctCount,
                                total_questions: attemptQs.length,
                                questions: attemptQs
                            };
                        } catch (e) {
                            console.error(`Erro ao carregar detalhes da tentativa ${attempt.id}`, e);
                            return attempt;
                        }
                    })
                );

                // Ordena por ID decrescente
                setAttempts(detailedAttempts.sort((a, b) => b.id - a.id));

            } catch (err: any) {
                console.error(err);
                systemContext.setError(err?.response?.data?.message ?? 'Erro ao carregar dados do caderno.');
            } finally {
                systemContext.setLoading(false);
            }
        };

        if (book_id) fetchData();
    }, [book_id]);

    const formatDate = (date: Date | null | undefined) => {
        if (!date) return "--";
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const handleNewAttempt = async () => {
        try {
            systemContext.setLoading(true);
            const res = await axios.post(`http://localhost:8080/attempt/new`,
                { question_book_id: question_book?.id },
                { headers: { 'Authorization': `Bearer ${getTokenCookie()}` } }
            );

            attemptContext.setAttempt(res.data);
            localStorage.setItem("current_attempt_id", res.data.id.toString());
            // Usa questions_id (lista de IDs) ou questions (lista de objetos)
            const firstId = res.data.questions_id ? res.data.questions_id[0] : res.data.questions[0].id;

            navigate(`/question_book/attempt/${res.data.id}/${firstId}`);
        } catch (error) {
            console.error(error);
            alert("Erro ao iniciar nova tentativa.");
        } finally {
            systemContext.setLoading(false);
        }
    }

    const handleContinueAttempt = (attempt: Attempt) => {
        attemptContext.setAttempt(attempt);
        localStorage.setItem("current_attempt_id", attempt.id.toString());

        // Tenta ir para a primeira não respondida
        let nextQ = attempt.questions_id?.[0];
        if (attempt.questions) {
            const pending = attempt.questions.find(q => !q.user_answer);
            if (pending) nextQ = pending.id;
        }

        navigate(`/question_book/attempt/${attempt.id}/${nextQ}`);
    }

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text select-none pb-10 transition-colors duration-300">
            <HomeNavBar/>
            <div className="mx-auto max-w-6xl p-8">

                {/* HEADER DO CADERNO */}
                <div className="bg-theme-card shadow-md rounded-lg p-7 mb-10 border border-theme-border">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold text-theme-text">{question_book?.model || "Carregando..."}</h1>
                        {question_book?.r_generated && (
                            <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Personalizado
                            </span>
                        )}
                    </div>
                    <div className="text-theme-subtext text-lg space-y-1">
                        <p><strong>Data de criação:</strong> {formatDate(question_book?.creation_date)}</p>
                        <p><strong>Total de questões:</strong> {questions.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* COLUNA ESQUERDA – TENTATIVAS */}
                    <div className="bg-theme-card shadow-md rounded-lg p-6 border border-theme-border">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold text-theme-text">Tentativas</h2>
                            <button onClick={handleNewAttempt} className="bg-theme-accent hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg transition shadow-md">
                                Nova tentativa
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {attempts.length === 0 && <p className="text-theme-subtext italic">Nenhuma tentativa iniciada.</p>}

                            {attempts.map((attempt) => {
                                const isFinished = !!attempt.end_date;
                                return (
                                    <div key={attempt.id} className="p-4 border border-theme-border rounded-lg bg-theme-bg transition hover:border-theme-subtext">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-theme-text">Tentativa #{attempt.id}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${isFinished ? 'bg-green-600' : 'bg-blue-500'}`}>
                                                {isFinished ? 'Finalizada' : 'Em Andamento'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-theme-subtext mb-3 space-y-1">
                                            <p>Início: {formatDate(attempt.start_date)}</p>
                                            {isFinished && (
                                                <>
                                                    <p>Fim: {formatDate(attempt.end_date)}</p>
                                                    <p className="font-bold text-theme-text">Acertos: {attempt.correct_answers} / {attempt.total_questions}</p>
                                                </>
                                            )}
                                        </div>
                                        {isFinished ? (
                                            <button
                                                onClick={() => {
                                                    const firstQ = attempt.questions?.[0]?.id || attempt.questions_id?.[0];
                                                    navigate(`/question_book/attempt/${attempt.id}/${firstQ}`, { state: { readOnly: true } });
                                                }}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
                                            >
                                                Ver Correção
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleContinueAttempt(attempt)}
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
                                            >
                                                Continuar
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* COLUNA DIREITA – QUESTÕES */}
                    <div className="bg-theme-card shadow-md rounded-lg p-6 border border-theme-border">
                        <h2 className="text-2xl font-bold mb-5 text-theme-text">Conteúdo da Prova</h2>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {questions.map((q, idx) => (
                                <div key={q.id} className="p-3 border border-theme-border rounded bg-theme-bg flex justify-between items-center">
                                    <span className="font-bold text-theme-subtext">#{idx + 1}</span>
                                    <span className="text-sm text-theme-text truncate max-w-[250px]">{q.original_question_book_model || "Questão Geral"}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}