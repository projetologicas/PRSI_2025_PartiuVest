import type { AttemptQuestion } from "../types/AttemptQuestion.ts";

interface QuestionNavigatorProps {
    questions: AttemptQuestion[];
    currentQuestionId: number;
    onNavigate: (questionId: number, index: number) => void;
    onFinish: () => void;
    readOnly?: boolean;
}

export default function QuestionNavigator({ questions, currentQuestionId, onNavigate, onFinish, readOnly = false }: QuestionNavigatorProps) {

    const total = questions.length;
    const answered = questions.filter(q => q.user_answer !== null).length;
    const progress = Math.round((answered / total) * 100);

    return (
        <div className="w-full md:w-80 bg-theme-card border border-theme-border rounded-xl shadow-lg p-6 flex flex-col gap-6 h-fit transition-colors duration-300">

            {/* BARRA DE PROGRESSO */}
            <div>
                <h3 className="text-xl font-bold text-theme-text mb-2">Questões</h3>
                <div className="w-full bg-theme-bg rounded-full h-2.5 border border-theme-border">
                    <div
                        className="bg-theme-accent h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-right text-xs text-theme-subtext mt-1 font-mono">{progress}% Respondido</p>
            </div>

            {/* GRID DE QUESTÕES */}
            <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                    const isCurrent = q.id === Number(currentQuestionId);
                    const isAnswered = q.user_answer !== null;

                    // Lógica de Cores
                    let bgClass = "bg-theme-bg text-theme-subtext hover:bg-theme-border"; // Padrão (Não respondida)

                    if (readOnly) {
                        // MODO CORREÇÃO
                        const isCorrect = q.user_answer === q.right_answer; // Assumindo que right_answer vem preenchido no readOnly

                        if (isCorrect) {
                            bgClass = "bg-green-500 text-white border-green-600"; // Acertou
                        } else if (isAnswered) {
                            bgClass = "bg-red-500 text-white border-red-600"; // Errou
                        } else {
                            bgClass = "bg-gray-700 text-gray-400 border-gray-600"; // Não respondeu (neutro escuro)
                        }

                    } else {
                        // MODO PROVA
                        if (isAnswered) {
                            bgClass = "bg-theme-accent/20 text-theme-accent border border-theme-accent/50"; // Respondida
                        }
                    }

                    // Destaque da Questão Atual
                    if (isCurrent) {
                        bgClass = "bg-theme-text text-theme-bg shadow-md ring-2 ring-theme-accent scale-110 z-10 font-bold";
                    }

                    return (
                        <button
                            key={q.id}
                            onClick={() => onNavigate(q.id, index + 1)}
                            className={`w-10 h-10 rounded-lg font-mono text-sm transition-all flex items-center justify-center border border-transparent ${bgClass}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            {/* LEGENDA */}
            <div className="flex flex-wrap gap-3 text-[10px] text-theme-subtext uppercase font-bold tracking-wider">
                {!readOnly ? (
                    <>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-theme-accent/50 rounded-full"></div> Respondida</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-theme-bg border border-theme-subtext rounded-full"></div> Pendente</div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Acerto</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Erro</div>
                    </>
                )}
            </div>

            <hr className="border-theme-border" />

            {/* BOTÃO FINALIZAR (SÓ SE NÃO FOR READONLY) */}
            {!readOnly && (
                <button
                    onClick={() => {
                        if (confirm("Tem certeza que deseja entregar a prova?")) {
                            onFinish();
                        }
                    }}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg transition-all uppercase tracking-wide hover:shadow-red-500/20 active:scale-95"
                >
                    Entregar Prova
                </button>
            )}

            {readOnly && (
                <div className="text-center p-2 bg-theme-bg rounded border border-theme-border text-theme-subtext text-xs uppercase font-bold">
                    Modo Correção (Apenas Leitura)
                </div>
            )}
        </div>
    );
}