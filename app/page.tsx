'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/dist/client/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        
        <header className="text-center mb-10">
          <h1 className="text-2xl font-black text-emerald-600 tracking-tighter mb-1 uppercase">Procópio</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Frieza + Gestão + Estudo
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">E-mail</label>
            <input 
              type="email" 
              placeholder="Digite seu e-mail"
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Botão Corrigido: Altura fixa manda, py removido, flex adicionado */}
          <button 
            type="submit"
            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-[30px] rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 active:scale-[0.97] uppercase text-sm tracking-widest flex items-center justify-center"
          >
            Acessar Dashboard
          </button>
        </form>

        <footer className="mt-8 text-center border-t border-slate-50 pt-4 flex flex-col gap-3">
          <Link 
            href="/register" 
            className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider transition-all duration-300"
          >
            Não tem conta? Criar conta agora
          </Link>

          <button className="text-[10px] font-bold text-slate-400 hover:text-emerald-600 uppercase tracking-wider transition-colors duration-300">
           <Link href="/forgot-password">Esqueceu a senha?</Link> Solicite ao suporte
          </button>
        </footer>
      </div>
    </div>
  );
}