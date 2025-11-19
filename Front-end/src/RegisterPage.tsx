import React, { useState } from "react";
import axios from "axios";


type RegisterForm = {
    email: string;
    password: string;
    nick: string;
};


export default function RegisterPage() {
    const [form, setForm] = useState<RegisterForm>({
        email: "",
        password: "",
        nick: "",
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);


        try {
            const resp = await axios.post("/api/auth/register", form);
            console.log("Conta criada:", resp.data);
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Erro ao cadastrar");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#1e1b1c] flex flex-col items-center pt-6">
            {/* Logo topo */}
            <div
                className="px-8 py-2 rounded-full shadow-xl text-3xl font-extrabold"
                style={{
                    background: "linear-gradient(90deg,#14e7b1,#0dd6b6)",
                    fontFamily: "monospace",
                }}
            >
                PartiuVest
            </div>

