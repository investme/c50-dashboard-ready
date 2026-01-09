import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
const COLORS = ['#A8E6CF','#379683','#34D399','#86EFAC','#D1FAE5'];
export default function C50LiveDashboard(){
  const [growth, setGrowth] = useState([
    { month: 'Jan', aum: 5000000 },{ month: 'Feb', aum: 5200000 },{ month: 'Mar', aum: 5400000 },{ month: 'Apr', aum: 5600000 },{ month: 'May', aum: 5800000 },{ month: 'Jun', aum: 6000000 },{ month: 'Jul', aum: 6200000 },{ month: 'Aug', aum: 6400000 },{ month: 'Sep', aum: 6600000 },{ month: 'Oct', aum: 6800000 }
  ]);
  const allocation = [{ name: 'BTC', value: 30 },{ name: 'ETH', value: 25 },{ name: 'DeFi', value: 20 },{ name: 'AI Tokens', value: 15 },{ name: 'Other', value: 10 }];
  useEffect(()=>{
    const int = setInterval(()=>{
      setGrowth(prev=>{
        const last = prev[prev.length-1];
        const change = (Math.random()*0.04 - 0.01);
        const nextAum = Math.round(last.aum * (1+change));
        const nextDate = new Date().toLocaleDateString();
        const next = [...prev.slice(1), { month: nextDate, aum: nextAum }];
        return next;
      });
    }, 3000);
    return ()=>clearInterval(int);
  },[]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAF7] to-[#E9F7EE] text-slate-800 flex">
      <aside className="w-72 bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] border-r border-slate-100 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6"><img src="/c50-logo.svg" alt="C50" className="w-12 h-12 rounded-full shadow"/><div><div className="text-lg font-bold text-slate-900">C50</div><div className="text-xs text-slate-600">Organic Growth. Real Impact.</div></div></div>
        <nav className="flex-1"><ul className="space-y-2 text-slate-700"><li className="px-3 py-2 rounded hover:bg-white hover:shadow">Dashboard</li><li className="px-3 py-2 rounded hover:bg-white hover:shadow">Portfolio</li><li className="px-3 py-2 rounded hover:bg-white hover:shadow">Reports</li><li className="px-3 py-2 rounded hover:bg-white hover:shadow">Governance</li><li className="px-3 py-2 rounded hover:bg-white hover:shadow">Bots</li></ul></nav>
        <div className="mt-6"><button className="w-full bg-[#379683] hover:bg-[#2e7d67] text-white py-2 rounded">Connect Wallet</button></div>
        <footer className="mt-6 text-xs text-slate-500">© 2025 C50 • www.C50.ai</footer>
      </aside>
      <main className="flex-1 p-8"><header className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-slate-900">Dashboard</h1><div className="text-sm text-slate-600">Live Organic Growth Simulation</div></header>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"><div className="p-4 bg-white border rounded shadow-sm"><div className="text-xs text-slate-500">AUM</div><div className="text-xl font-semibold text-slate-900">$25,000,000</div></div><div className="p-4 bg-white border rounded shadow-sm"><div className="text-xs text-slate-500">Subscribers</div><div className="text-xl font-semibold text-slate-900">5,000</div></div><div className="p-4 bg-white border rounded shadow-sm"><div className="text-xs text-slate-500">Yield</div><div className="text-xl font-semibold text-slate-900">12%</div></div><div className="p-4 bg-white border rounded shadow-sm"><div className="text-xs text-slate-500">Treasury</div><div className="text-xl font-semibold text-slate-900">$10,500,000</div></div></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="col-span-2 bg-white border rounded p-4 shadow-sm"><div className="flex items-center justify-between mb-3"><div className="font-semibold text-slate-800">AUM Growth</div><div className="text-xs text-slate-500">Dynamic Simulation</div></div><div style={{ width: '100%', height: 260 }} className="mt-2"><ResponsiveContainer><LineChart data={growth}><CartesianGrid strokeDasharray="3 3" stroke="#eee"/><XAxis dataKey="month" stroke="#666"/><YAxis stroke="#666" tickFormatter={(v)=>`$${(v/1000000).toFixed(1)}M`}/><Tooltip formatter={(v)=>`$${v.toLocaleString()}`} /><Line type="monotone" dataKey="aum" stroke="#379683" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div></div><div className="bg-white border rounded p-4 shadow-sm"><div className="font-semibold text-slate-800 mb-3">Portfolio Composition</div><div style={{ width: '100%', height: 260 }}><ResponsiveContainer><PieChart><Pie data={allocation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{allocation.map((entry, idx) => (<Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />))}</Pie><Tooltip /><Legend verticalAlign="bottom" height={36} /></PieChart></ResponsiveContainer></div></div></div></main></div>);
}
