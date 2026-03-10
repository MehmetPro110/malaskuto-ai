import { useState } from 'react';
import { Link } from 'react-router-dom';

function Servers() {
  const [selectedGame, setSelectedGame] = useState('minecraft');

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <span className="material-symbols-outlined text-sm">flash_on</span>
          NVMe Storage & Global Low-Latency
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          CHOOSE YOUR <span className="text-primary italic">POWER</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Deploy high-performance infrastructure for Minecraft and GTA V in seconds. Dedicated resources, zero lag, total control.
        </p>
      </div>

      {/* Game Selector Toggle */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex p-1.5 bg-neutral-dark rounded-xl border border-border-dark shadow-2xl">
          <button
            onClick={() => setSelectedGame('minecraft')}
            className={`flex items-center gap-3 px-8 py-4 rounded-lg font-black text-sm uppercase transition-all ${
              selectedGame === 'minecraft'
                ? 'bg-primary text-background-dark shadow-lg neon-glow'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">pixel_journal</span>
            Minecraft
          </button>
          <button
            onClick={() => setSelectedGame('gta')}
            className={`flex items-center gap-3 px-8 py-4 rounded-lg font-black text-sm uppercase transition-all ${
              selectedGame === 'gta'
                ? 'bg-primary text-background-dark shadow-lg neon-glow'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">directions_car</span>
            GTA V
          </button>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="group relative bg-neutral-dark/40 border border-border-dark rounded-xl p-8 flex flex-col hover:border-primary/50 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">STARTER</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">$5.99</span>
              <span className="text-slate-400 font-bold">/mo</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Perfect for small community groups</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
              <span className="font-medium">4GB DDR4 RAM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">groups</span>
              <span className="font-medium">20 Player Slots</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">speed</span>
              <span className="font-medium">20GB NVMe SSD Storage</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="material-symbols-outlined text-xl">public</span>
              <span>Global Locations</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="material-symbols-outlined text-xl">shield</span>
              <span>Standard DDoS Protection</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full flex justify-center py-4 rounded-lg bg-border-dark hover:bg-primary hover:text-background-dark font-bold text-sm uppercase transition-all tracking-wider"
          >
            SELECT PLAN
          </Link>
        </div>

        {/* Pro Plan (Active) */}
        <div className="group relative bg-neutral-dark border-2 border-primary rounded-xl p-8 flex flex-col shadow-2xl neon-glow transform md:scale-105 z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
            Most Popular
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2 text-primary">PRO</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">$14.99</span>
              <span className="text-slate-400 font-bold">/mo</span>
            </div>
            <p className="text-sm text-slate-400 mt-2">Enhanced performance for growing servers</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
              <span className="font-bold">12GB DDR4 RAM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">all_inclusive</span>
              <span className="font-bold">Unlimited Player Slots</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">speed</span>
              <span className="font-bold">60GB NVMe SSD Storage</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">public</span>
              <span className="font-bold">Priority Global Nodes</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
              <span className="font-bold">24/7 Priority Support</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full flex justify-center py-4 rounded-lg bg-primary text-background-dark font-black text-sm uppercase transition-all tracking-wider shadow-lg"
          >
            GET STARTED
          </Link>
        </div>

        {/* Elite Plan */}
        <div className="group relative bg-neutral-dark/40 border border-border-dark rounded-xl p-8 flex flex-col hover:border-primary/50 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">ELITE</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">$29.99</span>
              <span className="text-slate-400 font-bold">/mo</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Professional infrastructure for networks</p>
          </div>
          <div className="space-y-4 mb-10 flex-grow">
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
              <span className="font-medium">32GB DDR4 RAM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">all_inclusive</span>
              <span className="font-medium">Unlimited Player Slots</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">speed</span>
              <span className="font-medium">150GB NVMe SSD Storage</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">dns</span>
              <span className="font-medium">Dedicated IP Address</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">hub</span>
              <span className="font-medium">Custom BungeeCord Setup</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full flex justify-center py-4 rounded-lg bg-border-dark hover:bg-primary hover:text-background-dark font-bold text-sm uppercase transition-all tracking-wider"
          >
            SELECT PLAN
          </Link>
        </div>
      </div>

      {/* Locations Showcase */}
      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center bg-neutral-dark/20 p-12 rounded-2xl border border-border-dark">
        <div>
          <h2 className="text-3xl font-black mb-6">GLOBAL <span className="text-primary italic">PRESENCE</span></h2>
          <p className="text-slate-400 mb-8">Reduce ping and ensure the best experience for your players with our strategically located data centers across the globe.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm font-bold">Los Angeles, USA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm font-bold">Frankfurt, DE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm font-bold">Singapore, SG</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm font-bold">London, UK</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden border border-border-dark h-64 bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-transparent to-primary/20 opacity-50"></div>
          {/* Placeholder for Map Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/30 text-9xl">public</span>
          </div>
          <div className="absolute bottom-4 left-4 bg-background-dark/80 px-4 py-2 rounded-lg border border-border-dark text-xs font-bold">
            12+ GLOBAL NODES ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servers;