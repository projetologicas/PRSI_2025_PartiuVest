import React, { useState } from "react";
import axios from "axios";


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
            const resp = await axios.post('/api/auth/login', form);
// resp.data -> token or user
            console.log('Login success', resp.data);
// redirect or save token...
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message ?? 'Erro ao autenticar');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e1b1c]">
            <div className="w-[1000px] h-[620px] relative flex shadow-2xl">
                {/* Left visual */}
                <div className="flex-1 relative bg-[#1b1819] p-8 flex items-center justify-center overflow-hidden">
                    {/* background brain image - put your exported png/svg in public/brain-bg.png */}
                    <img
                        src="/brain-bg.png"
                        alt="brain"
                        className="absolute right-0 h-[480px] opacity-95 select-none pointer-events-none"
                        style={{ transform: 'translateX(10%)' }}
                    />


                    <div className="relative z-10 flex flex-col items-start gap-6 ml-6">
                        }