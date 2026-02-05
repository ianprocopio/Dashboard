'use client';
import { useState } from 'react';

export default function ApostaForm({ onAdicionar, estrategias }: any) {
  const [jogo, setJogo] = useState('');
  const [stake, setStake] = useState('50');
  const [estSel, setEstSel] = useState(estrategias[0] || '');

  const registrar = (status: 'Green' | 'Red') => {
    if (!jogo.trim() || !stake) return;
    onAdicionar(jogo, parseFloat(stake), estSel || estrategias[0], status);
    setJogo('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Evento</label>
          <input type="text" className="w-full p-2 border rounded-lg text-sm" value={jogo} onChange={(e) => setJogo(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Stake</label>
          <input type="number" className="w-full p-2 border rounded-lg text-sm" value={stake} onChange={(e) => setStake(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Estratégia</label>
          <select className="w-full p-2 border rounded-lg text-sm" value={estSel} onChange={(e) => setEstSel(e.target.value)}>
            {estrategias.map((e: string) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => registrar('Green')} className="bg-emerald-600 text-white py-3 rounded-xl font-bold text-xs">REGISTRAR GREEN</button>
        <button onClick={() => registrar('Red')} className="bg-red-600 text-white py-3 rounded-xl font-bold text-xs">REGISTRAR RED</button>
      </div>
    </div>
  );
}