import React, { useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";

export default function AdminJsonUpload() {
    const [jsonText, setJsonText] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateJson = () => {
        try {
            const parsed = JSON.parse(jsonText);

            if (!parsed || typeof parsed !== "object") {
                setError("O JSON precisa ser um objeto válido.");
                return null;
            }

            // Validação básica opcional — você pode expandir depois
            if (!parsed.titulo || !parsed.questoes) {
                setError("O JSON precisa conter: titulo, questoes.");
                return null;
            }

            setError("");
            return parsed;
        } catch (e) {
            setError("JSON inválido. Corrija antes de enviar.");
            return null;
        }
    };

    const handleSubmit = async () => {
        setSuccess("");
        const parsed = validateJson();
        if (!parsed) return;

        try {
            // Exemplo de envio ao backend
            const response = await fetch("/api/admin/cadastrar-json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar");

            setSuccess("Cadastro realizado com sucesso!");
        } catch (err) {
            setError("Erro ao enviar ao servidor.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#e0e0e0] flex flex-col items-center pt-12 pb-20 font-sans">
            {/* Logo */}
            <div className="text-4xl font-extrabold text-[#27e0c5] bg-[#222] px-6 py-2 rounded-full shadow-md mb-12">
                PartiuVest
            </div>

            {/* Caixa branca */}
            {/*<Card className="w-[80%] max-w-4xl bg-white rounded-3xl shadow-lg p-6">
                <CardContent>*/}
          <textarea
              className="w-full h-72 p-4 border rounded-xl text-lg outline-none resize-none"
              placeholder="Cole aqui o JSON"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
          />

                    {error && <p className="text-red-600 mt-3 font-semibold">{error}</p>}
                    {success && <p className="text-green-600 mt-3 font-semibold">{success}</p>}
                {/*</CardContent>
            </Card>

            {/* Botão 
            <Button
                onClick={handleSubmit}
                className="mt-10 text-2xl font-extrabold px-12 py-5 rounded-full shadow-md bg-[#1fe4c2] hover:scale-105 transition-all"
            >
                Cadastrar
            </Button>*/}
        </div>
    );
}
