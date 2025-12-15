import { useState, useEffect } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";
import type { QuestionBook } from "../types/QuestionBook";

export default function AdminExams() {
    const [exams, setExams] = useState<QuestionBook[]>([]);
    const [jsonText, setJsonText] = useState("");
    const [status, setStatus] = useState({msg: '', type: ''});

    const fetchExams = async () => {
        try {
            const res = await api.get("/question_book/", { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            // Filtra para mostrar talvez apenas os oficiais (opcional) ou todos
            setExams(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchExams(); }, []);

    const handleUpload = async () => {
        try {
            let parsed = JSON.parse(jsonText);
            setStatus({ msg: "Enviando...", type: '' });
            await api.post("/admin/exams", parsed, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            setStatus({ msg: "✅ Importado!", type: 'success' });
            setJsonText("");
            fetchExams();
        } catch (error: any) {
            setStatus({ msg: "❌ Erro: " + (error.response?.data?.message || "JSON Inválido"), type: 'error' });
        }
    };

    const handleDelete = async (id: number) => {
        if(!confirm("Tem certeza? Isso apagará todas as tentativas associadas.")) return;
        try {
            await api.delete(`/question_book/${id}`, { headers: { Authorization: `Bearer ${getTokenCookie()}` } });
            fetchExams();
        } catch (e) {
            alert("Erro ao deletar.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COLUNA ESQUERDA: UPLOAD */}
                <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
                    <h2 className="text-xl font-bold text-purple-400 mb-4">Importar JSON</h2>
                    <textarea
                        className="w-full h-64 bg-gray-900 border border-gray-600 rounded p-3 text-xs font-mono text-green-400 outline-none resize-none mb-4"
                        placeholder='{ "title": "...", "questions": [...] }'
                        value={jsonText}
                        onChange={e => setJsonText(e.target.value)}
                    />
                    <button onClick={handleUpload} className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded font-bold text-white transition">
                        IMPORTAR
                    </button>
                    {status.msg && <p className={`mt-2 text-center font-bold ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{status.msg}</p>}
                </div>

                {/* COLUNA DIREITA: LISTA */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white">Provas no Sistema</h2>
                    {exams.map(exam => (
                        <div key={exam.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center hover:border-purple-500 transition">
                            <div>
                                <h3 className="font-bold text-lg">{exam.model}</h3>
                                <div className="text-sm text-gray-400 flex gap-4">
                                    <span>📅 {new Date(exam.creation_date).toLocaleDateString()}</span>
                                    <span>📝 {exam.questions_id ? exam.questions_id.length : 0} Questões</span>
                                    {exam.r_generated ?
                                        <span className="text-yellow-500 text-xs border border-yellow-500 px-1 rounded">Gerado</span> :
                                        <span className="text-purple-400 text-xs border border-purple-500 px-1 rounded">Oficial</span>
                                    }
                                </div>
                            </div>
                            <button onClick={() => handleDelete(exam.id)} className="bg-red-900/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded font-bold text-sm transition">
                                Excluir
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}