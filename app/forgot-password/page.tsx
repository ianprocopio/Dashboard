'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        
        <header className="text-center mb-10">
          <h1 className="text-2xl font-black text-emerald-600 tracking-tighter mb-1 uppercase">Procópio</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
            Recuperar Acesso
          </p>
        </header>

        {!enviado ? (
          /* Removido o space-y do form para as margens individuais funcionarem */
          <form onSubmit={handleRecover}>
            <p className="text-[11px] text-slate-500 text-center px-2 mb-6">
              Insira o e-mail da sua conta para receber as instruções de recuperação.
            </p>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">E-mail</label>
              <input 
                type="email" 
                placeholder="Digite seu e-mail"
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* DIV ESPAÇADORA: Isso força o botão para baixo sem erro */}
            <div className="h-12"></div>

            <button 
              type="submit"
              style={{ marginTop: '30px' }} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.97] uppercase text-sm tracking-widest flex items-center justify-center"
            >
              Enviar Instruções
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-4xl">📩</div>
            <h2 className="text-lg font-bold text-slate-800">E-mail enviado!</h2>
            <p className="text-xs text-slate-500">
              Verifique sua caixa de entrada e siga as instruções para criar uma nova senha.
            </p>
          </div>
        )}

        <footer className="mt-8 text-center border-t border-slate-50 pt-4">
          <Link href="/" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider transition">
            Voltar para o Login
          </Link>
        </footer>
      </div>
    </div>
  );
}