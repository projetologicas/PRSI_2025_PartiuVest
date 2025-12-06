import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { QuestionBook } from "../types/QuestionBook";
import { getTokenCookie } from "../services/Cookies";
import { SystemContext } from "../common/context/SystemContext";
import HomeNavBar from "../components/HomeNavBar";

export default function Vestibulares() {
    const [lista, setLista] = useState<QuestionBook[]>([]);
    const navigate = useNavigate();
    const systemContext = useContext(SystemContext);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                systemContext.setLoading(true);
                systemContext.setError(null);
                await axios.get("http://localhost:8080/question_book/", {
                    headers: {
                        'Authorization': `Bearer ${getTokenCookie()}`
                    }
                }).then(res => {
                    console.log(res)
                    setLista(res.data);
                });
            } catch (err : any) {
                console.error(err);
                systemContext.setError(err?.response?.data?.message ?? 'Erro ao adquirir livros de questões');
            } finally {
                systemContext.setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNewQuestionBook = async () => {
        await axios.post("http://localhost:8080/question_book/new", {},{
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
        }).then(res => {
            console.log(res)
            setLista([...lista, res.data]);
        });
    }

    return (
        <div className="min-h-screen bg-[#1f1b1d] text-black pb-10">

            <HomeNavBar/>

            {/* Conteúdo */}
            <div className="bg-[#dcdcdc] mx-4 mt-6 rounded-lg shadow-lg px-10 py-10">
                <div className="text-3xl font-bold space-y-6">

                    <button
                        onClick={handleNewQuestionBook}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg text-lg"
                    >
                        Gerar Caderno de Questões Aleatório
                    </button>

                    {lista.map((vest) => {
                        const creationDate = new Date(vest.creation_date).toLocaleDateString("pt-BR");

                        const isCompleted = false;

                        return (
                            <div
                                key={vest.id}
                                className="cursor-pointer hover:opacity-75 p-4 bg-white rounded-lg shadow flex flex-col gap-2 transition"
                                onClick={() => navigate(`/question_book/details/${vest.id}`)}
                            >
                                {/* Cabeçalho: título + badges */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-semibold">{vest.model}</span>

                                    {/* Indicador: Gerado aleatoriamente */}
                                    {vest.r_generated && (
                                        <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                                            Aleatório
                                        </span>
                                    )}

                                    {/* Indicador: Concluído */}
                                    {isCompleted && (
                                        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded-full">
                                            Concluído
                                        </span>
                                    )}
                                </div>

                                {/* Informações */}
                                <div className="text-base text-gray-700 flex flex-col gap-1">
                                    <span>Questões: {vest.questions_id.length}</span>
                                    <span>Criado em: {creationDate}</span>
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
