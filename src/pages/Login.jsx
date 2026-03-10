import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex-grow flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-neutral-dark/40 border border-border-dark rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
          <span className="material-symbols-outlined text-8xl">lock</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Welcome <span className="text-primary italic">Back</span></h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to manage your active game servers.</p>

          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 text-sm">mail</span>
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="admin@community.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 text-sm">key</span>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full py-4 rounded-lg bg-primary text-background-dark font-black text-sm uppercase transition-all tracking-wider shadow-lg neon-glow hover:scale-[1.02]"
            >
              Sign In to Console
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">Deploy Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;