
import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="px-6 py-6 flex items-center justify-between border-b border-stone-100">
            <h2 className="text-xl font-serif font-bold italic tracking-tight">Shopping Bag</h2>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-900">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-stone-400">
                {/* Fixed: ShoppingBag component was missing its import from lucide-react */}
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="text-sm">Your bag is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="text-stone-900 font-bold border-b-2 border-stone-900 pb-1 text-sm uppercase tracking-widest"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex space-x-4">
                    <div className="h-24 w-18 flex-shrink-0 overflow-hidden rounded-sm bg-stone-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-stone-900">{item.name}</h3>
                          <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 uppercase tracking-tighter">{item.subCategory}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-3 border border-stone-200 rounded px-2 py-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-stone-500 hover:text-stone-900">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-stone-500 hover:text-stone-900">
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-bold">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-stone-100 px-6 py-8 space-y-4 bg-stone-50">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-stone-200 pt-4">
                <span>Total</span>
                <span>${subtotal + shipping}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-stone-800 transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
