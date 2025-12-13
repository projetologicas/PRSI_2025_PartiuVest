import type {AttemptQuestion} from "../types/AttemptQuestion.ts";

interface QuestionNavigatorProps {
    questions: AttemptQuestion[];
    currentQuestionId: number;
    onNavigate: (questionId: number, index: number) => void;
    onFinish: () => void;
}

export default function QuestionNavigator({ questions, currentQuestionId, onNavigate, onFinish }: QuestionNavigatorProps) {

    const total = questions.length;
    const answered = questions.filter(q => q.user_answer !== null).length;
    const progress = Math.round((answered / total) * 100);

    return (
        <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 h-fit">

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Questões</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-teal-400 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">{progress}% Concluído</p>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                    const isCurrent = q.id === Number(currentQuestionId);
                    const isAnswered = q.user_answer !== null;

                    let bgClass = "bg-gray-200 text-gray-600 hover:bg-gray-300"; // Padrão
                    if (isAnswered) bgClass = "bg-green-100 text-green-700 border border-green-300"; // Respondida
                    if (isCurrent) bgClass = "bg-blue-600 text-white shadow-md scale-110"; // Atual (Prioridade sobre as outras)

                    return (
                        <button
                            key={q.id}
                            onClick={() => onNavigate(q.id, index + 1)}
                            className={`w-10 h-10 rounded-lg font-bold text-sm transition-all flex items-center justify-center ${bgClass}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div> Respondida</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-200 rounded"></div> Pendente</div>
            </div>

            <hr className="border-gray-200" />

            <button
                onClick={() => {
                    if (confirm("Tem certeza que deseja finalizar o simulado? Questões em branco serão consideradas erradas.")) {
                        onFinish();
                    }
                }}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow transition-colors uppercase tracking-wide"
            >
                Entregar Prova
            </button>
        </div>
    );
}