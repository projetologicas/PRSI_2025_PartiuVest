import React, { useState } from "react";
import axios from "axios";
import { setTokenCookie, getTokenCookie, removeTokenCookie } from "./services/Cookies.ts"
import cerebro from "./assets/cerebro.png";

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Example axios POST. Configure baseURL globally or replace with absolute URL
            const resp = await axios.post('http://localhost:8080/auth/login', form);
            // resp.data -> token or user
            console.log('Login success', resp.data);
            setTokenCookie(resp.data.token, 1);
            console.log(resp.data.token)
            // redirect or save token...
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message ?? 'Erro ao autenticar');
        } finally {
            setLoading(false);
        }
    };

   return (
    // Fundo do site é preto (h-screen w-full)
    <div className="flex h-screen w-full font-sans">
      
      {/* SEÇÃO ESQUERDA: Fundo Preto, Logo e Ícone do Cérebro */}
      <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* ÍCONE DO CÉREBRO (SVG com gradiente) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <img src={cerebro} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            </img>
        </div>

        {/* Logo/Nome do Aplicativo */}
        <h1
          className="text-4xl font-extrabold z-10"
          style={{
            // Gradiente para PartiuVest
            background: 'linear-gradient(45deg, #00FF7F, #00BFFF)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative', 
          }}
        >
          PartiuVest
        </h1>
      </div>

      {/* SEÇÃO DIREITA: Formulário de Login (Fundo Cinza) */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center min-w-[300px]">
        <div className="w-full max-w-sm p-8 space-y-6">
          
          {/* Campo E-mail */}
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-1"
              style={{
                fontSize: '1.2rem', 
                paddingBottom: '4px', 
              }}
            />
          </div>

          {/* Campo Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-1"
              style={{
                fontSize: '1.2rem',
                paddingBottom: '4px',
              }}
            />
          </div>
          
          {/* Espaçamento adicional antes dos botões */}
          <div className="pt-10"></div>

          {/* Botão Entrar (Verde-Água/Ciano) */}
          <button
            className="w-full py-3 text-white font-semibold rounded-lg transition duration-200"
            style={{
              background: 'linear-gradient(to bottom, #00FFC0, #00E0A0)',
              boxShadow: '0 4px 6px -1px rgba(0, 255, 192, 0.4), 0 2px 4px -2px rgba(0, 255, 192, 0.2)',
            }}
          >
            Entrar
          </button>

          {/* Botão Criar Conta (Ciano/Azul Claro) */}
          <button
            className="w-full py-3 text-white font-semibold rounded-lg transition duration-200"
            style={{
              background: 'linear-gradient(to bottom, #00BFFF, #0099D9)',
              boxShadow: '0 4px 6px -1px rgba(0, 191, 255, 0.4), 0 2px 4px -2px rgba(0, 191, 255, 0.2)',
            }}
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
};