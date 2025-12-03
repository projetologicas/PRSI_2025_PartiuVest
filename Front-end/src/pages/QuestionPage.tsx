import { useState } from "react";
import axios from "axios";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    title: string;
    description: string;
    options: Option[];
}

export default function QuestionPage() {
    const [selected, setSelected] = useState<string | null>(null);

    // MOCK — depois você troca por uma requisição Axios
    const question: Question = {
        id: 1,
        title: "1 - Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien.",
        options: [
            { id: "A", text: "Lorem ipsum" },
            { id: "B", text: "Lorem ipsum" },
            { id: "C", text: "Lorem ipsum" },
            { id: "D", text: "Lorem ipsum" },
            { id: "E", text: "Lorem ipsum" },
        ],
    };

    const handleNext = async () => {
        await axios.post("http://localhost:8080/responder", {
            questionId: question.id,
            answer: selected,
        });

        // futura navegação
    };

    return (
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
                    <h2 className="text-4xl font-[pixel] mb-6">{question.title}</h2>

                    {question.description.split("\n").map((line, i) => (
                        <p key={i} className="text-xl font-[pixel] mb-4">
                            {line}
                        </p>
                    ))}

                    <div className="mt-6">
                        {question.options.map((op) => (
                            <label
                                key={op.id}
                                className="flex items-center gap-3 mb-3 cursor-pointer font-[pixel] text-xl"
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value={op.id}
                                    checked={selected === op.id}
                                    onChange={() => setSelected(op.id)}
                                    className="w-6 h-6"
                                />
                                <span>{op.id} - {op.text}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Botões */}
                <div className="flex justify-between mt-10 px-4">
                    <button className="bg-[#8BC4B2] text-black font-[pixel] text-3xl rounded-full px-10 py-3 shadow-xl">
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
    );
}

/*
useEffect(() => {
  axios.get("http://localhost:8080/questoes/1")
    .then(res => setQuestion(res.data));
}, []);

axios.post("http://localhost:8080/responder", {
  questionId,
  answer
});
 */