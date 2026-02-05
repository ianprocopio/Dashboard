'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estados para os Modais
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null); // Limpa erros anteriores

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { data: { full_name: nome } }
      });

      if (error) throw error;

      localStorage.setItem('usuario_nome', nome); 
      setShowSuccessModal(true);

    } catch (error: any) {
      // Em vez de alert(), salvamos a mensagem para o modal de erro
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      {/* MODAL DE SUCESSO (Verde) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm mx-4 text-center border border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter italic">Conta Criada!</h3>
            <p className="text-xs text-slate-500 mb-8 font-bold uppercase tracking-wider leading-relaxed">Verifique seu e-mail para confirmar o acesso à <span className="text-emerald-600 font-black">Procópio</span>.</p>
            <button onClick={() => router.push('/dashboard')} className="w-full py-4 rounded-2xl font-black bg-emerald-600 text-white shadow-xl shadow-emerald-200 uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition active:scale-95">Ir para o Dashboard</button>
          </div>
        </div>
      )}

      {/* MODAL DE ERRO (Vermelho - Substitui o alert do rate limit) */}
      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm mx-4 text-center border border-slate-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter italic">Opa, algo deu errado</h3>
            <p className="text-xs text-slate-500 mb-8 font-bold uppercase tracking-wider leading-relaxed">{errorMsg === 'email rate limit exceeded' ? 'Muitas tentativas! Aguarde um pouco antes de tentar novamente.' : errorMsg}</p>
            <button onClick={() => setErrorMsg(null)} className="w-full py-4 rounded-2xl font-black bg-slate-800 text-white shadow-xl shadow-slate-200 uppercase text-[10px] tracking-widest hover:bg-slate-900 transition active:scale-95">Entendi</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        <header className="text-center mb-10">
          <h1 className="text-2xl font-black text-emerald-600 tracking-tighter mb-1 uppercase">Procópio</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Frieza + Gestão + Estudo</p>
        </header>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nome Completo</label>
            <input type="text" placeholder="Como quer ser chamado?" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Senha</label>
            <input type="password" placeholder="Crie sua senha" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={loading} />
          </div>

          <button type="submit" disabled={loading} className={`w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-[20px] rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 active:scale-[0.97] uppercase text-sm tracking-widest flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'CRIANDO CONTA...' : 'CRIAR MINHA CONTA'}
          </button>
        </form>

        <footer className="mt-8 text-center border-t border-slate-50 pt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Já tem conta? <Link href="/" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-all duration-300 font-black">Faça Login aqui</Link></p>
        </footer>
      </div>
    </div>
  );
} 