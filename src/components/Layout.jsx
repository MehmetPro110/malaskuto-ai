import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen grid-pattern relative flex flex-col w-full overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl md:text-4xl">view_in_ar</span>
            </Link>
            <Link to="/">
              <h2 className="text-xl font-extrabold leading-tight tracking-tight uppercase italic hover:text-primary transition-colors">Malaskuto</h2>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center gap-10 items-center">
            <Link className="hover:text-primary transition-colors text-sm font-semibold" to="/servers">SERVERS</Link>
            <Link className="hover:text-primary transition-colors text-sm font-semibold" to="/#">LOCATIONS</Link>
            <Link className="hover:text-primary transition-colors text-sm font-semibold" to="/#">SUPPORT</Link>
            <Link className="hover:text-primary transition-colors text-sm font-semibold" to="/checkout">BILLING</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold bg-border-dark px-4 py-2 rounded hover:bg-border-dark/70 transition-all text-white">SIGN IN</Link>
            <div className="hidden md:flex w-10 h-10 rounded-full bg-primary/20 items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div className="md:hidden">
              <span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-background-dark border-t border-primary/10 px-6 md:px-20 py-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-2xl">view_in_ar</span>
                <h2 className="text-lg font-extrabold tracking-tighter uppercase italic">Malaskuto</h2>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">Industry-leading gaming infrastructure for the next generation of online communities.</p>
            </div>

            <div className="flex gap-10 text-left">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company</span>
                <Link className="text-sm hover:text-primary transition-colors text-slate-500" to="#">About Us</Link>
                <Link className="text-sm hover:text-primary transition-colors text-slate-500" to="#">Privacy</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resources</span>
                <Link className="text-sm hover:text-primary transition-colors text-slate-500" to="#">Status</Link>
                <Link className="text-sm hover:text-primary transition-colors text-slate-500" to="#">Knowledgebase</Link>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-dark border border-border-dark flex items-center justify-center hover:border-primary cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm text-slate-300">share</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-neutral-dark border border-border-dark flex items-center justify-center hover:border-primary cursor-pointer transition-all">
                  <span className="material-symbols-outlined text-sm text-slate-300">chat</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 uppercase tracking-widest">© 2024 Malaskuto Infrastructure. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;