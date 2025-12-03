import React, { useContext, useState } from "react";
import axios from "axios";
import { setTokenCookie, getTokenCookie, removeTokenCookie } from "../services/Cookies.ts"
import cerebro from "../assets/brain.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../common/context/UserCotext.tsx";

type LoginForm = {
    email: string;
    password: string;
};

export default function LoginPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
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
          const resp = await axios.post('http://localhost:8080/auth/login', form);
          console.log('Login success', resp.data);
          setTokenCookie(resp.data.token, 1);

          const userResp = await axios.get("http://localhost:8080/api/data", {
            headers: {
                'Authorization': `Bearer ${getTokenCookie()}`
            }
          });
          context.setName(userResp.data.name);
          
          navigate('/home');
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

        {/* SEÇÃO ESQUERDA: Fundo Preto */}
        <div className="flex-1 bg-black flex flex-col p-8">

          {/* CONTAINER CENTRAL COM TÍTULO + ÍCONE */}
          <div className="flex items-center justify-center w-full h-full gap-6">

            {/* TÍTULO À ESQUERDA */}
            <h1
              className="text-4xl font-extrabold"
              style={{
                background: 'linear-gradient(45deg, #00FF7F, #00BFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PartiuVest
            </h1>

            {/* ÍCONE DO CÉREBRO À DIREITA */}
            <img 
              src={cerebro} 
              alt="Cérebro" 
              className="w-48 md:w-70 select-none"
            />

          </div>

        </div>

      {/* SEÇÃO DIREITA: Formulário de Login (Fundo Cinza) */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center min-w-[300px]">
        <div className="w-full max-w-sm p-8 space-y-6">
          
          {/* Campo E-mail */}
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-1"
              style={{
                fontSize: '1.2rem', 
                paddingBottom: '4px', 
              }}
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Campo Senha */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-500 pb-1"
              style={{
                fontSize: '1.2rem',
                paddingBottom: '4px',
              }}
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          
          {/* Espaçamento adicional antes dos botões */}
          <div className="pt-10"></div>

          {/* Botão Entrar (Verde-Água/Ciano) */}
          <button
            className="w-full py-3 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
            style={{
              background: 'linear-gradient(to bottom, #00FFC0, #00E0A0)',
              boxShadow: '0 4px 6px -1px rgba(0, 255, 192, 0.4), 0 2px 4px -2px rgba(0, 255, 192, 0.2)',
            }}
            onClick={handleSubmit}
          >
            Entrar
          </button>

          {/* Botão Criar Conta (Ciano/Azul Claro) */}
          <Link to="/register" className="">
          <button
            className="w-full py-3 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
            style={{
              background: 'linear-gradient(to bottom, #00BFFF, #0099D9)',
              boxShadow: '0 4px 6px -1px rgba(0, 191, 255, 0.4), 0 2px 4px -2px rgba(0, 191, 255, 0.2)',
            }}
          >
            
              Criar conta
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};