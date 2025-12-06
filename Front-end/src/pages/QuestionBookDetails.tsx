import { use, useContext, useEffect, useState } from "react";
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

export default function QuestionBookDetails() {
    const navigate = useNavigate();
    const systemContext = useContext(SystemContext);
    const attemptContext = useContext(AttemptContext);

    const [question_book, setQuestionBook] = useState<QuestionBook>();
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const { book_id } = useParams();

    useEffect(() => {
        const fetchData = async () => { 
            try {
                systemContext.setLoading(true);
                systemContext.setError(null);
                const question_book_response = await axios.get(`http://localhost:8080/question_book/id?question_book_id=${book_id}`, {
                    headers: {
                        'Authorization': `Bearer ${getTokenCookie()}`
                    }
                }).then(res => {
                    console.log("question_book");
                    console.log(res.data);
                    setQuestionBook(res.data);
                });
                const attempts_response = await axios.get(`http://localhost:8080/attempt/question_book_user?question_book_id=${book_id}`, {
                    headers: {
                        'Authorization': `Bearer ${getTokenCookie()}`
                    }
                }).then(res => {
                    console.log("attempts");
                    console.log(res.data);
                    setAttempts([...res.data]);
                });
                const questions_response = await axios.get(`http://localhost:8080/question/question_book?question_book_id=${book_id}`, {
                    headers: {
                        'Authorization': `Bearer ${getTokenCookie()}`
                    }
                }).then(res => {
                    console.log("questions");
                    console.log(res.data);
                    setQuestions([...res.data]);
                    var original_book_ids = [...new Set(res.data.map((q: Question) => q.original_question_book_id))];
                    console.log(original_book_ids);
                    original_book_ids.forEach(async (id) => {
                        const original_book_response = await axios.get(`http://localhost:8080/question_book/id?question_book_id=${id}`, {
                            headers: {
                                'Authorization': `Bearer ${getTokenCookie()}`
                            }
                        }).then(res => {
                            console.log("original_book");
                            console.log(res.data);
                            setQuestions(prevQuestions => {
                                return prevQuestions.map(q => {
                                    if (q.original_question_book_id === id) {
                                        return {
                                            ...q,
                                            original_question_book_model: res.data.model,
                                        };
                                    }
                                    return q;
                                });
                            });
                        });
                    });
                });
                attempts.map(async (attempt) => {
                    console.log("Fetching attempt questions for attempt id:", attempt.id);
                    const attempt_questions_response = await axios.get(`http://localhost:8080/attempt/attempted_questions?attempt_book_id=${attempt.id}`, {
                        headers: {
                            'Authorization': `Bearer ${getTokenCookie()}`
                        }
                    }).then(res => {
                        console.log("question_attempts");
                        console.log(res.data);
                        setAttempts(prevAttempts => {
                            return prevAttempts.map(a => {
                                if (a.id === attempt.id) {
                                    attempt.correct_answers = res.data.filter((q: AttemptQuestion) => q.user_answer == q.right_answer).length;
                                    attempt.total_questions = res.data.length;
                                    return {
                                        ...a,
                                        questions: res.data as AttemptQuestion[],
                                    };
                                }
                                return a;
                            });
                        });
                    });
                });

            } catch (err : any) {
                console.error(err);
                systemContext.setError(err?.response?.data?.message ?? 'Erro ao adquirir livro de questões');
            } finally {
                systemContext.setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (date: Date | null | undefined) => {
        if (!date) return "--";
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const handleNewAttempt = async () => {
        const attempt_response = await axios.post(`http://localhost:8080/attempt/new`, {
            question_book_id: question_book?.id
        }, {
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
        }).then(res => {
            
            console.log(res.data);
            attemptContext.setAttempt(res.data);
            localStorage.setItem("current_attempt_id", res.data.id.toString());
            localStorage.setItem("attempt_questions_index", "1");
            navigate(`/question_book/attempt/${res.data.id}/${res.data.questions_id[0]}`);
        });
    }

    const handleContinueAttempt = async (attempt : Attempt) => {
        attemptContext.setAttempt(attempt);
        console.log(attempt);
        localStorage.setItem("current_attempt_id", attempt.id.toString());
        localStorage.setItem("attempt_questions_index", "1");
        navigate(`/question_book/attempt/${attempt.id}/${attempt.questions_id[0]}`);
    }
    
    return (
        <div className="min-h-screen bg-[#1e1b1c] text-white select-none">
            <HomeNavBar/>
            <div className="mx-auto max-w-6xl p-8">

                {/* Título e informações gerais */}
                <div className="bg-white shadow-md rounded-lg p-7 mb-10">

                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold">{question_book != null ? question_book.model : ""}</h1>

                        {question_book != null ? question_book.r_generated : false && (
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                Aleatório
                            </span>
                        )}
                    </div>

                    <div className="text-gray-700 text-lg space-y-1">
                        {/*<p><strong>Criado por:</strong> {question_book.creator_name}</p>*/}
                        <p><strong>Data de criação:</strong> {formatDate(question_book?.creation_date)}</p>
                        <p><strong>Total de questões:</strong> {question_book?.questions_id.length}</p>
                    </div>

                </div>


                {/* Layout principal: Coluna esquerda (tentativas) e direita (questões) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* COLUNA ESQUERDA – TENTATIVAS */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold">Tentativas</h2>

                            <button
                                onClick={handleNewAttempt}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg"
                            >
                                Nova tentativa
                            </button>
                        </div>

                        <div className="space-y-4">
                            {attempts.length === 0 && (
                                <p className="text-gray-600">Nenhuma tentativa registrada ainda.</p>
                            )}

                            {attempts.map((attempt) => {
                                const isAttemptComplete = !!attempt.end_date;

                                return (
                                    <div
                                        key={attempt.id}
                                        className="p-4 border rounded-lg bg-gray-50"
                                    >
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">
                                                Tentativa #{attempt.id}
                                            </span>

                                            {isAttemptComplete ? (
                                                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                                                    Finalizada
                                                </span>
                                            ) : (
                                                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                                                    Em andamento
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p>
                                                <strong>Início:</strong> {formatDate(attempt.start_date)}
                                            </p>

                                            <p>
                                                <strong>Término:</strong> {formatDate(attempt.end_date)}
                                            </p>
                                            
                                            {isAttemptComplete && (
                                                <p>
                                                    <strong>Acertos:</strong> {attempt.correct_answers} de {attempt.total_questions}
                                                </p>
                                            )}
                                            <button
                                                onClick={() => {handleContinueAttempt(attempt)}}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                                            >
                                                Continuar tentativa
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* COLUNA DIREITA – QUESTÕES */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-5">Questões do caderno</h2>

                        <div className="space-y-3">
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    className="p-3 border rounded-lg bg-gray-50"
                                >
                                    <p className="font-semibold text-lg">
                                        #{q.number} – {q.original_question_book_model}
                                    </p>
                                    {/*
                                    <p className="text-gray-600 text-sm">
                                        Área: {q.area}
                                    </p>
                                    */}
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}