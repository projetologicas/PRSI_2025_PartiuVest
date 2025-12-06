import { use, useEffect, useState } from "react";
import axios from "axios";
import { getTokenCookie } from "../services/Cookies";
import { useNavigate, useParams } from "react-router-dom";
import type { Question } from "../types/Question";
import HomeNavBar from "../components/HomeNavBar";

export default function QuestionPage() {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<string | null>(null);
    const { book_id, question_id } = useParams();

    const [question, setQuestion] = useState<Question | null>(null);

    const fetchQuestion = async () => {
            await axios.get(`http://localhost:8080/attempt/question?attempt_question_id=${question_id}`, {
                headers: {
                    'Authorization': `Bearer ${getTokenCookie()}`
                }
            }).then(res => {
                setQuestion(res.data);
            });
            await axios.get(`http://localhost:8080/attempt/attempt_question?attempt_question_id=${question_id}`, {
                headers: {
                    'Authorization': `Bearer ${getTokenCookie()}`
                }
            }).then(res => {
                setSelected(res.data.user_answer);
            });
        };
    
    useEffect(() => {
        const attemptId = localStorage.getItem("attempt_questions_index");
        localStorage.setItem("attempt_questions_index", (parseInt(attemptId || "1")).toString());
        fetchQuestion();
    }, []);


    const handleNext = async () => {
        await axios.post(`http://localhost:8080/attempt/question_commit`, {
            id : question_id,
            attempt_id : book_id,
            user_answer : selected
        }, {
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
        }).then(res => {
            console.log("Answer submitted:", res.data);
            const attemptId = localStorage.getItem("attempt_questions_index");
            localStorage.setItem("attempt_questions_index", (parseInt(attemptId || "1") + 1).toString());
            navigate("/question_book/attempt/" + book_id + "/" + (parseInt(attemptId || "0") + 1));
            fetchQuestion();
            setSelected(null);
        });
    };

    const handleBefore = async () => {
        const attemptId = localStorage.getItem("attempt_questions_index");
        if (parseInt(attemptId || "1") <= 1) {
            return;
        }
        localStorage.setItem("attempt_questions_index", (parseInt(attemptId || "2") - 1).toString());
        navigate("/question_book/attempt/" + book_id + "/" + (parseInt(attemptId || "2") - 1));
        fetchQuestion();
    }

    return (
        <>
            <HomeNavBar/>
            <div className="w-full min-h-screen bg-[#221F20] flex justify-center pt-10">
                <div className="w-[90%] bg-[#D9D9D9] p-10">

                    {/* Logo */}
                    <div className="w-full flex justify-center mb-8">
                        <h1 className="text-4xl font-[pixel] text-[#25DDB2] bg-black px-8 py-2 rounded-full shadow-lg">
                            PartiuVest
                        </h1>
                    </div>

                    {/* Área branca */}
                    <div className="bg-white rounded-2xl p-10 shadow-md">
                        <h2 className="text-4xl font-[pixel] mb-6">{question?.number}.</h2>

                        {question?.title.split("\n").map((line, i) => (
                            <p key={i} className="text-xl font-[pixel] mb-4">
                                {line}
                            </p>
                        ))}

                        <div className="mt-6">
                            <label
                                key={"A"}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={question?.enum_a}
                                    checked={selected === "A"}
                                    onChange={() => setSelected("A")}
                                    className="w-6 h-6"
                                />
                                <span>{question?.enum_a}</span>
                            </label>
                            <label
                                key={"B"}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={question?.enum_b}
                                    checked={selected === "B"}
                                    onChange={() => setSelected("B")}
                                    className="w-6 h-6"
                                />
                                <span>{question?.enum_b}</span>
                            </label>
                            <label
                                key={"C"}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={question?.enum_c}
                                    checked={selected === "C"}
                                    onChange={() => setSelected("C")}
                                    className="w-6 h-6"
                                />
                                <span>{question?.enum_c}</span>
                            </label>
                            <label
                                key={"D"}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={question?.enum_d}
                                    checked={selected === "D"}
                                    onChange={() => setSelected("D")}
                                    className="w-6 h-6"
                                />
                                <span>{question?.enum_d}</span>
                            </label>
                            <label
                                key={"E"}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={question?.enum_e}
                                    checked={selected === "E"}
                                    onChange={() => setSelected("E")}
                                    className="w-6 h-6"
                                />
                                <span>{question?.enum_e}</span>
                            </label>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between mt-10 px-4">
                        <button 
                            onClick={handleBefore}
                            className="bg-[#8BC4B2] text-black font-[pixel] text-3xl rounded-full px-10 py-3 shadow-xl">
                            Anterior
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#25DDB2] text-black font-[pixel] text-3xl rounded-full px-10 py-3 shadow-xl"
                        >
                            Próximo
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}