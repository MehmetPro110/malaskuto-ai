import { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Checkout Form */}
      <div className="flex-1">
        <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Secure <span className="text-primary italic">Checkout</span></h2>

        <form className="space-y-8">
          {/* Payment Method Toggle */}
          <div className="bg-neutral-dark/40 border border-border-dark rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-slate-300">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-border-dark bg-background-dark text-slate-400 hover:border-primary/50'}`}
              >
                <span className="material-symbols-outlined text-3xl">credit_card</span>
                <span className="text-sm font-bold">Credit Card</span>
              </div>
              <div
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${paymentMethod === 'paypal' ? 'border-primary bg-primary/10 text-primary' : 'border-border-dark bg-background-dark text-slate-400 hover:border-primary/50'}`}
              >
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                <span className="text-sm font-bold">PayPal</span>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <div className="bg-neutral-dark/40 border border-border-dark rounded-xl p-6 space-y-5">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-slate-300">Billing Information</h3>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="cardNumber">Card Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500 text-sm">credit_card</span>
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                  placeholder="123"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="address">Billing Address</label>
              <input
                type="text"
                id="address"
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                placeholder="123 Gaming Street, City, Country"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-neutral-dark border-2 border-primary/20 rounded-xl p-8 sticky top-24 shadow-2xl neon-glow">
          <h3 className="text-xl font-black mb-6 uppercase italic text-primary border-b border-primary/20 pb-4">Order Summary</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">Minecraft Pro Server</p>
                <p className="text-xs text-slate-400 mt-1">12GB RAM, NVMe Storage</p>
              </div>
              <span className="font-bold text-white">$14.99</span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">Dedicated IP</p>
                <p className="text-xs text-slate-400 mt-1">Optional Add-on</p>
              </div>
              <span className="font-bold text-white">$3.00</span>
            </div>
          </div>

          <div className="border-t border-border-dark pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Subtotal</span>
              <span className="text-white font-medium">$17.99</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Taxes (Est.)</span>
              <span className="text-white font-medium">$1.80</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-dark">
              <span className="text-lg font-bold uppercase text-white">Total Due</span>
              <span className="text-2xl font-black text-primary">$19.79</span>
            </div>
            <p className="text-right text-xs text-slate-500 mt-1">Billed monthly</p>
          </div>

          <button
            type="button"
            className="w-full py-4 rounded-lg bg-primary text-background-dark font-black text-sm uppercase transition-all tracking-wider shadow-lg neon-glow hover:scale-[1.02]"
          >
            Complete Order
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="material-symbols-outlined text-sm">lock</span>
            Secure 256-bit SSL Encryption
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;