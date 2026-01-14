
import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { CartItem, BillingDetails } from '../types';

interface CheckoutFlowProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (details: BillingDetails) => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ items, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BillingDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors uppercase text-xs font-bold tracking-widest"
      >
        <ArrowLeft size={16} />
        <span>Back to Shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Forms */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-px mx-2 ${step > s ? 'bg-stone-900' : 'bg-stone-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif font-bold mb-8">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Full Name</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="John Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Street Address</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="123 Luxury Ave" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="Paris" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Zip Code</label>
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="75001" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif font-bold mb-8">Secure Payment</h2>
                <div className="bg-stone-900 p-8 rounded-xl text-white mb-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <CreditCard size={32} />
                      <span className="text-xs uppercase tracking-widest opacity-60">Dellyz Empire Platinum</span>
                    </div>
                    <p className="text-xl tracking-[0.2em] mb-8 font-mono">
                      {formData.cardNumber ? formData.cardNumber.replace(/\d(?=\d{4})/g, "*") : "**** **** **** ****"}
                    </p>
                    <div className="flex justify-between uppercase text-[10px] tracking-widest opacity-60">
                      <span>{formData.fullName || 'Card Holder'}</span>
                      <span>{formData.expiry || 'MM/YY'}</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Card Number</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">Expiry Date</label>
                    <input required name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 font-bold">CVV</label>
                    <input required name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-900" placeholder="000" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif font-bold mb-8">Review Order</h2>
                <div className="space-y-6">
                  <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Delivery To</h4>
                      <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest font-bold text-stone-900 border-b border-stone-900">Edit</button>
                    </div>
                    <p className="text-sm font-medium">{formData.fullName}</p>
                    <p className="text-sm text-stone-500">{formData.address}, {formData.city} {formData.zipCode}</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Payment Method</h4>
                      <button onClick={() => setStep(2)} className="text-[10px] uppercase tracking-widest font-bold text-stone-900 border-b border-stone-900">Edit</button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard size={18} />
                      <p className="text-sm font-medium">Card ending in {formData.cardNumber.slice(-4)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-stone-900 text-white py-5 font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl flex items-center justify-center space-x-3"
            >
              <span>{step === 3 ? 'Confirm Order' : 'Continue'}</span>
              <Lock size={16} className="opacity-40" />
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-stone-100 rounded-sm p-8 sticky top-32 shadow-sm">
            <h3 className="text-lg font-serif font-bold mb-8">Order Summary</h3>
            
            <div className="max-h-64 overflow-y-auto mb-8 space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="h-16 w-12 flex-shrink-0 bg-stone-100">
                    <img src={item.image} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold truncate">{item.name}</h5>
                    <p className="text-[10px] text-stone-400 uppercase tracking-tighter">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-8 space-y-4">
              <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-stone-200 pt-6">
                <span className="font-serif italic">Grand Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-3 text-stone-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Secure SSL Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
