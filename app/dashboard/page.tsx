'use client'; 
import { useState, useEffect } from 'react';
import ApostaForm from '../components/ApostaForm';
import Link from 'next/link';

interface Aposta {
  id: number;
  jogo: string;
  stake: number;
  estrategia: string;
  resultado: 'Green' | 'Red';
}

export default function Home() {
  const [bancaBase, setBancaBase] = useState(1250);
  const [nomeUsuario, setNomeUsuario] = useState('Usuário');
  const [apostas, setApostas] = useState<Aposta[]>([]);
  const [estrategias, setEstrategias] = useState(['Lay 0x0', 'Lay 0x1', 'Over 0.5 HT']);
  const [novaEst, setNovaEst] = useState('');
  const [isEditingBanca, setIsEditingBanca] = useState(false);
  const [filtroEstrategia, setFiltroEstrategia] = useState('Todas');

  // Modais
  const [showModal, setShowModal] = useState(false);
  const [showModalLimpar, setShowModalLimpar] = useState(false); // NOVO: Modal Excluir Tudo
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('usuario_nome');
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
    const sApostas = localStorage.getItem('betflow_apostas');
    const sEst = localStorage.getItem('betflow_estrategias');
    const sBanca = localStorage.getItem('betflow_banca_base');
    if (sApostas) setApostas(JSON.parse(sApostas));
    if (sEst) setEstrategias(JSON.parse(sEst));
    if (sBanca) setBancaBase(Number(sBanca));
  }, []);

  useEffect(() => {
    localStorage.setItem('betflow_apostas', JSON.stringify(apostas));
    localStorage.setItem('betflow_estrategias', JSON.stringify(estrategias));
    localStorage.setItem('betflow_banca_base', bancaBase.toString());
  }, [apostas, estrategias, bancaBase]);

  const lucroTotal = apostas.reduce((acc, curr) => 
    curr.resultado === 'Green' ? acc + curr.stake : acc - curr.stake, 0);

  const apostasFiltradas = filtroEstrategia === 'Todas' 
    ? apostas 
    : apostas.filter(a => a.estrategia === filtroEstrategia);

  const adicionarEstrategia = () => {
    if (novaEst && !estrategias.includes(novaEst)) {
      setEstrategias([...estrategias, novaEst]);
      setNovaEst('');
    }
  };

  const deletarEstrategia = (est: string) => {
    setEstrategias(estrategias.filter(e => e !== est));
  };

  const adicionarAposta = (nome: string, vStake: number, est: string, res: 'Green' | 'Red') => {
    const nova: Aposta = { id: Date.now(), jogo: nome, stake: vStake, estrategia: est, resultado: res };
    setApostas([nova, ...apostas]);
  };

  const confirmarExclusaoUnica = () => {
    if (idParaExcluir !== null) {
      setApostas(apostas.filter(a => a.id !== idParaExcluir));
      setShowModal(false);
      setIdParaExcluir(null);
    }
  };

  const confirmarLimparTudo = () => {
    setApostas([]);
    localStorage.removeItem('betflow_apostas');
    setShowModalLimpar(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Header Centralizado */}
      <header className="w-full bg-white border-b border-slate-200 py-3 shadow-sm mb-6">
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Bem-vindo,</span>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight whitespace-nowrap">{nomeUsuario}</h2>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <h1 className="text-xl font-black text-emerald-600 tracking-tighter uppercase italic"></h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 pb-8">
        
        {/* Modal Excluir Única */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm mx-4 text-center border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-2 uppercase tracking-tighter">Excluir Aposta?</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Esta ação afetará a tua banca e estatísticas.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 uppercase text-[10px]">Cancelar</button>
                <button onClick={confirmarExclusaoUnica} className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg shadow-red-200 uppercase text-[10px]">Confirmar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Excluir TUDO (Substitui o Alert) */}
        {showModalLimpar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-sm mx-4 text-center border border-slate-100">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter italic">Limpar Histórico?</h3>
              <p className="text-xs text-slate-500 mb-8 font-bold uppercase tracking-wider">Você perderá todos os dados registrados até agora. Deseja continuar?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowModalLimpar(false)} className="flex-1 py-4 rounded-2xl font-black bg-slate-100 text-slate-500 uppercase text-[10px] tracking-widest hover:bg-slate-200 transition">Não</button>
                <button onClick={confirmarLimparTudo} className="flex-1 py-4 rounded-2xl font-black bg-red-500 text-white shadow-xl shadow-red-200 uppercase text-[10px] tracking-widest hover:bg-red-600 transition">Sim, Excluir</button>
              </div>
            </div>
          </div>
        )}

        <header className="mb-8 border-b pb-4 text-center">
          <h2 className="text-3xl font-bold italic text-emerald-600 uppercase">Frieza + Gestão + Estudo</h2>
        </header>

        {/* Grid de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-emerald-500">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Banca Inicial</p>
            {isEditingBanca ? (
              <input type="number" className="w-full font-bold border rounded px-1 text-center outline-none focus:ring-1 focus:ring-emerald-500" value={bancaBase} onChange={(e) => setBancaBase(Number(e.target.value))} onBlur={() => setIsEditingBanca(false)} autoFocus />
            ) : (
              <p className="text-xl font-bold cursor-pointer hover:text-emerald-500 transition" onClick={() => setIsEditingBanca(true)}>R$ {bancaBase.toFixed(2)} ✏️</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-blue-500">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Saldo Atual</p>
            <p className="text-xl font-bold">R$ {(bancaBase + lucroTotal).toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-amber-500">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Lucro Líquido</p>
            <p className={`text-xl font-bold ${lucroTotal >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>R$ {lucroTotal.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-purple-500">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Win Rate</p>
            <p className="text-xl font-bold">{apostas.length > 0 ? ((apostas.filter(a => a.resultado === 'Green').length / apostas.length) * 100).toFixed(1) : 0}%</p>
          </div>
        </div>

        <ApostaForm onAdicionar={adicionarAposta} estrategias={estrategias} />

        {/* Gerenciador de Estratégias */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">Minhas Estratégias</h3>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Nova Estratégia..." className="flex-1 p-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500" value={novaEst} onChange={(e) => setNovaEst(e.target.value)} />
            <button onClick={adicionarEstrategia} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 transition">+</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {estrategias.map(est => (
              <span key={est} className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 border border-slate-200">
                {est}
                <button onClick={() => deletarEstrategia(est)} className="text-red-400 hover:text-red-600 font-bold transition">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Tabela de Histórico */}
        {apostas.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Histórico</h3>
                <select value={filtroEstrategia} onChange={(e) => setFiltroEstrategia(e.target.value)} className="text-[10px] font-bold bg-slate-100 border-none rounded-lg px-2 py-1 outline-none text-slate-600 focus:ring-1 focus:ring-emerald-500 transition cursor-pointer">
                  <option value="Todas">Todas Estratégias</option>
                  {estrategias.map(est => <option key={est} value={est}>{est}</option>)}
                </select>
              </div>
              <button onClick={() => setShowModalLimpar(true)} className="text-[10px] font-black text-red-500 hover:text-red-700 underline uppercase transition tracking-tighter">Excluir Tudo</button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-white text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Evento / Estratégia</th>
                    <th className="p-4 text-center">Stake</th>
                    <th className="p-4 text-center">Resultado</th>
                    <th className="p-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apostasFiltradas.length > 0 ? (
                    apostasFiltradas.map((aposta) => (
                      <tr key={aposta.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <div className="font-bold text-xs uppercase text-slate-700">{aposta.jogo}</div>
                          <div className="text-[10px] text-slate-400 font-bold">{aposta.estrategia}</div>
                        </td>
                        <td className="p-4 text-center text-sm font-mono font-bold text-slate-600">R$ {aposta.stake.toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${aposta.resultado === 'Green' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{aposta.resultado}</span>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => { setIdParaExcluir(aposta.id); setShowModal(true); }} className="text-[10px] font-black text-red-400 hover:text-red-600 underline uppercase transition">Excluir</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="p-8 text-center text-xs text-slate-400 italic font-bold">Nenhuma entrada encontrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}