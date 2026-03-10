import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="flex-grow flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-neutral-dark/40 border border-border-dark rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
          <span className="material-symbols-outlined text-8xl">person_add</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Start <span className="text-primary italic">Hosting</span></h2>
          <p className="text-slate-400 text-sm mb-8">Create your account and deploy high-performance servers in seconds.</p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="firstName">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 text-sm">badge</span>
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                    placeholder="Admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="lastName">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500 text-sm">badge</span>
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                    placeholder="User"
                  />
                </div>
              </div>
            </div>

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
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 text-sm">lock</span>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 text-sm">lock_reset</span>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full bg-background-dark border border-border-dark rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-4 rounded-lg bg-primary text-background-dark font-black text-sm uppercase transition-all tracking-wider shadow-lg neon-glow hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;