import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 md:px-20 py-16 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">99.9% Uptime Guaranteed</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 italic uppercase">
              Dominate <br /><span className="text-primary italic">Your Realm</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Experience ultra-low latency, enterprise-grade hardware, and seamless performance for Minecraft, GTA, and ARK. Built for players, scaled for professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/servers" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-background-dark text-lg font-black uppercase tracking-wider neon-glow hover:scale-105 transition-transform">
                Deploy Server
              </Link>
              <Link to="/servers" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border border-primary/30 bg-primary/5 text-primary text-lg font-bold hover:bg-primary/10 transition-all">
                View Plans
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 aspect-video shadow-2xl shadow-primary/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9iaHwCTY9uU77QLjHxUmDhbe2okQMV-ey-kIGvI4S5S3AL1IenREuafWUxYwdO06VETSQnaKVEgRRrgx3ZTun4BVjeF0sWG2v-NnUFMR1EImDt49HhjOQKfGU45TFkseqM0kUZzcDMbmGsbYceX3EnJo5yiR888Vlda2ukc1ZeglEPWQ-g5bPzqOmDNVHZpjYx0BgBvcCzPSIuUmtHn2oCxLYH_2-VFOQ__nsFItQOgKqYMaHUkA9HGLAM5gypkvJpgqClQRHiQ")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
          </div>
        </div>
      </section>

      {/* Game Selection */}
      <section className="px-6 md:px-20 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic border-l-4 border-primary pl-4">Choose Your Battlefield</h2>
            <p className="text-slate-400">Optimized configurations for the world's most popular games.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Minecraft */}
            <Link to="/servers" className="group relative flex flex-col gap-4 p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">grid_view</span>
              </div>
              <div className="w-full aspect-square rounded-xl bg-cover bg-center mb-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAogjEx9JGz9R7ZPMGKSSF6FxEaPxeGDsizKmlVBik4B3-hQjniRTX_xIO7nOZPiLMH8sDenOh9vNV16qODMn25NzQZsP9j-HkrOal5UUDp4aStqDYyEPSfBu_b_IVxhhEkLhPUioxAvRCA5rFiZ2BdOncAhyVHfI6et5A3qKjStxd30V8YrTx5a8ok6sYBZtp4f90-bJAavjbbxpiCL7U5THlH6mNhWtGOnOaYtmZCmR9F8USPtffYy8q1NB9by184hE1dhmBcyg")' }}></div>
              <div className="z-10">
                <h3 className="text-2xl font-black italic uppercase">Minecraft</h3>
                <p className="text-slate-400 text-sm mb-4">Unlimited plugins, Modpack support, NVMe SSDs.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">From $5.00/mo</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* GTA V */}
            <Link to="/servers" className="group relative flex flex-col gap-4 p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">directions_car</span>
              </div>
              <div className="w-full aspect-square rounded-xl bg-cover bg-center mb-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJuSLMIGWmqMq3tbNLXIf6Ljyruph0aunVK0lf4LwaGYWM6WXIyKzbKJvaPgeIuENfhrxEkliOEWMWkdI2LcSBuyW-R7oj50OLfrpVOmIPg_8PlMt4ViBj8R47bF8R0NG7dzv4zcIpkMRrU1C_0X-025vDcL5iduozIJsf4l-MoYT2jFBgDxC7LlVvJkk_YbNd7p2Vhao3aaoYPchxtykHtCJ6h2Tw-WNiQgufqYAEaXLO103-036SMxuX7zeLoet1oqsB5DBUtA")' }}></div>
              <div className="z-10">
                <h3 className="text-2xl font-black italic uppercase">Grand Theft Auto V</h3>
                <p className="text-slate-400 text-sm mb-4">FiveM/RedM ready, dedicated IP included.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">From $12.00/mo</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* ARK */}
            <Link to="/servers" className="group relative flex flex-col gap-4 p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl">eco</span>
              </div>
              <div className="w-full aspect-square rounded-xl bg-cover bg-center mb-2" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4uctWRUgShxTwasZ2EtI5tpSoo12fNgTdaxH_nAq3L7uunWAkE40_hdjleoWbgWMmm47GnlaRSPOLNcIMReZP5Aygs-0CODJRdO5DTSoGwbsRtJnNUr4RxhnuQWWDwLa0l82Imd59g9XtOKy9R6jlsV8EdW4VYFNTsL-4PDKQk6qXuCSttBUnywq8FQgriKDkXnseGxPr4J3tLNrxcZtpDXoRW6zWH8M_5fzOQK0O0TO1PKkrNDNFJbWjS1oOTTZHUW4kzsaSCA")' }}></div>
              <div className="z-10">
                <h3 className="text-2xl font-black italic uppercase">ARK: Survival</h3>
                <p className="text-slate-400 text-sm mb-4">High CPU clock speeds, cross-play support.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">From $15.00/mo</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4">Unrivaled Infrastructure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Built on enterprise hardware and connected to global tier-1 networks to ensure your game never stops.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 text-primary/5">
                <span className="material-symbols-outlined text-9xl">bolt</span>
              </div>
              <div className="bg-primary/10 size-14 rounded-lg flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
              </div>
              <h3 className="text-xl font-black italic uppercase mb-3">Instant Setup</h3>
              <p className="text-slate-400 leading-relaxed">Your server is deployed automatically within seconds of your order. No waiting, just gaming.</p>
            </div>

            <div className="glass-panel p-10 rounded-2xl relative overflow-hidden group border-primary/30 shadow-lg shadow-primary/5">
              <div className="absolute -bottom-10 -right-10 text-primary/5">
                <span className="material-symbols-outlined text-9xl">shield</span>
              </div>
              <div className="bg-primary size-14 rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-background-dark text-3xl">shield</span>
              </div>
              <h3 className="text-xl font-black italic uppercase mb-3">Enterprise DDoS</h3>
              <p className="text-slate-400 leading-relaxed">Multi-terabit DDoS mitigation keeps your server online during even the largest attacks.</p>
            </div>

            <div className="glass-panel p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 text-primary/5">
                <span className="material-symbols-outlined text-9xl">support_agent</span>
              </div>
              <div className="bg-primary/10 size-14 rounded-lg flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
              </div>
              <h3 className="text-xl font-black italic uppercase mb-3">24/7 Proactive Support</h3>
              <p className="text-slate-400 leading-relaxed">Our experts are available around the clock to assist with any technical issues or mods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="border-y border-primary/10 py-12 bg-background-dark/50">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-primary text-4xl font-black italic">15k+</p>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mt-1">Servers Hosted</p>
          </div>
          <div className="text-center">
            <p className="text-primary text-4xl font-black italic">42ms</p>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mt-1">Avg Latency</p>
          </div>
          <div className="text-center">
            <p className="text-primary text-4xl font-black italic">99%</p>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mt-1">Positive Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-primary text-4xl font-black italic">12</p>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mt-1">Global Locations</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-5xl mx-auto glass-panel p-12 md:p-20 rounded-[2rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Ready to Scale Your Community?</h2>
            <p className="text-slate-400 text-lg max-w-xl">Join thousands of admins who trust Malaskuto for their premium gaming infrastructure. Get started in minutes.</p>
            <div className="mt-4">
              <Link to="/servers" className="flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-16 px-10 bg-primary text-background-dark text-xl font-black uppercase tracking-wider neon-glow hover:scale-105 transition-all">
                Start My Free Trial
              </Link>
              <p className="text-slate-500 text-sm mt-4 italic">No credit card required for initial setup</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;