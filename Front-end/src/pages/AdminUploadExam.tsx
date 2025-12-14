import { useState } from "react";
import api from "../services/api";
import { getTokenCookie } from "../services/Cookies";
import HomeNavBarADM from "../components/HomeNavBarADM";

export default function AdminUploadExam() {
    const [jsonText, setJsonText] = useState("");
    const [status, setStatus] = useState<{msg: string, type: 'success' | 'error' | ''}>({msg: '', type: ''});

    const handleSubmit = async () => {
        try {
            setStatus({ msg: "Validando JSON...", type: '' });

            // 1. Validação local do JSON
            let parsed;
            try {
                parsed = JSON.parse(jsonText);
            } catch (e) {
                setStatus({ msg: "❌ JSON Inválido! Verifique vírgulas e aspas.", type: 'error' });
                return;
            }

            // 2. Validação básica de estrutura
            if(!parsed.title || !parsed.questions || !Array.isArray(parsed.questions)) {
                setStatus({ msg: "❌ JSON incompleto. Precisa de 'title' e array 'questions'.", type: 'error' });
                return;
            }

            setStatus({ msg: "Enviando para o servidor...", type: '' });

            // 3. Envio para o Backend
            await api.post("/admin/exams", parsed, {
                headers: { Authorization: `Bearer ${getTokenCookie()}` }
            });

            setStatus({ msg: "✅ Simulado e Questões importados com sucesso!", type: 'success' });
            setJsonText(""); // Limpa o campo

        } catch (error: any) {
            console.error(error);
            setStatus({ msg: "❌ Erro no servidor: " + (error.response?.data?.message || "Tente novamente."), type: 'error' });
        }
    };

    const exampleJson = `{
  "title": "FUVEST 2024",
  "description": "Prova Oficial",
  "questions": [
    {
      "statement": "Qual a cor do céu?",
      "answer": "A",
      "optionA": "Azul",
      "optionB": "Verde",
      "optionC": "Roxo",
      "optionD": "Amarelo",
      "optionE": "Preto",
      "explanation": "Dispersão de Rayleigh"
    }
  ]
}`;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
            <HomeNavBarADM />

            <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl mt-4">
                <div className="flex justify-between items-end mb-4 border-b border-gray-700 pb-2">
                    <h2 className="text-2xl font-bold text-purple-400">Importar Simulado (JSON)</h2>
                    <button
                        onClick={() => setJsonText(exampleJson)}
                        className="text-xs text-gray-400 hover:text-white underline"
                    >
                        Carregar Exemplo
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Área de Texto */}
                    <div className="md:col-span-2">
                         <textarea
                             className="w-full h-96 bg-[#1a1b1e] border border-gray-600 rounded p-4 font-mono text-sm text-green-400 focus:ring-2 ring-purple-500 outline-none resize-none shadow-inner"
                             placeholder='Cole seu JSON aqui...'
                             value={jsonText}
                             onChange={(e) => setJsonText(e.target.value)}
                         />
                    </div>

                    {/* Instruções Lateral */}
                    <div className="text-sm text-gray-400 bg-black/20 p-4 rounded h-fit">
                        <p className="font-bold text-white mb-2">Instruções:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>O JSON deve ser um objeto único.</li>
                            <li>O campo <code>questions</code> é uma lista.</li>
                            <li>Campos obrigatórios: <code>statement</code>, <code>answer</code> (Letra), <code>optionA</code>...<code>optionE</code>.</li>
                        </ul>

                        <div className="mt-6 pt-4 border-t border-gray-700">
                             <span className={`font-bold block text-lg mb-4 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {status.msg}
                            </span>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded transition shadow-lg hover:shadow-purple-500/20"
                            >
                                PROCESSAR JSON
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}