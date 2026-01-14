
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import FashionStylist from './components/FashionStylist';
import CheckoutFlow from './components/CheckoutFlow';
import { PRODUCTS } from './constants';
import { Product, CartItem, BillingDetails } from './types';
import { ShoppingBag, ChevronRight, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dellyz-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Persistence (Simulating a database session)
  useEffect(() => {
    localStorage.setItem('dellyz-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const startCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (details: BillingDetails) => {
    // Mimic backend order submission
    setTimeout(() => {
      setCartItems([]);
      setIsCheckoutView(false);
      setOrderComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setOrderComplete(false), 7000);
    }, 2000);
  };

  if (isCheckoutView) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
          onCartToggle={() => setIsCartOpen(true)}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            setIsCheckoutView(false);
          }}
        />
        <CheckoutFlow 
          items={cartItems} 
          onBack={() => setIsCheckoutView(false)} 
          onComplete={handleOrderComplete}
        />
        <FashionStylist />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
        onCartToggle={() => setIsCartOpen(true)}
        onCategorySelect={setSelectedCategory}
      />

      <main className="flex-1">
        {/* Order Success Hero */}
        {orderComplete && (
          <div className="bg-stone-900 py-16 text-white text-center animate-in slide-in-from-top duration-700">
            <div className="max-w-2xl mx-auto px-4">
              <CheckCircle2 className="mx-auto mb-6 text-emerald-400" size={48} />
              <h2 className="text-4xl font-serif font-bold mb-4 italic">Success, Your Majesty.</h2>
              <p className="text-stone-400 text-sm uppercase tracking-[0.2em] leading-relaxed">
                Your order has been received by the Empire. A confirmation has been sent to your email. Your pieces are being prepared for dispatch.
              </p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {selectedCategory === 'All' && !orderComplete && (
          <section className="relative h-[85vh] w-full bg-stone-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              alt="Luxury Fashion"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-xs font-bold uppercase tracking-[0.5em] mb-6 animate-in fade-in slide-in-from-bottom duration-700">Spring / Summer 2024</h2>
              <h1 className="font-serif text-6xl md:text-9xl text-white italic font-bold tracking-tighter mb-10 max-w-5xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                Empire States <br className="hidden md:block"/> of Mind
              </h1>
              <div className="flex space-x-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                <button 
                  onClick={() => setSelectedCategory('Women')}
                  className="bg-white text-stone-900 px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors shadow-2xl"
                >
                  Women's
                </button>
                <button 
                  onClick={() => setSelectedCategory('Men')}
                  className="bg-transparent text-white border border-white/40 px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white/10 backdrop-blur-sm transition-colors"
                >
                  Men's
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-4xl font-serif font-bold tracking-tight mb-3">
                {selectedCategory === 'All' ? 'Curated Masterpieces' : `${selectedCategory}`}
              </h2>
              <div className="h-1 w-12 bg-stone-900 mb-4" />
              <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase font-bold">Exclusively crafted for the vanguard</p>
            </div>
            
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              <span className="cursor-pointer hover:text-stone-900" onClick={() => setSelectedCategory('All')}>Empire</span>
              <ChevronRight size={12} />
              <span className="text-stone-900 underline underline-offset-8 decoration-stone-200">{selectedCategory}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-stone-50 border-t border-stone-200 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <h2 className="font-serif text-4xl font-bold tracking-tighter">DELLYZ <span className="text-stone-400 italic font-light">EMPIRE</span></h2>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                The definitive destination for luxury fashion. Since 1994, Dellyz Empire has defined global style through an uncompromising eye for elegance and a commitment to artisanal craftsmanship.
              </p>
              <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-[0.2em]">
                <a href="#" className="hover:text-stone-400 transition-colors">Vogue Portfolio</a>
                <a href="#" className="hover:text-stone-400 transition-colors">Paris Boutique</a>
                <a href="#" className="hover:text-stone-400 transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-stone-400">Collections</h4>
              <ul className="space-y-6 text-xs font-medium text-stone-900">
                {['Men', 'Women', 'Accessories', 'Footwear'].map(cat => (
                  <li key={cat}>
                    <button onClick={() => setSelectedCategory(cat)} className="hover:translate-x-2 transition-transform duration-300">
                      {cat} Selection
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-stone-400">Legal & Privacy</h4>
              <ul className="space-y-6 text-xs font-medium text-stone-900">
                <li><a href="#" className="hover:opacity-60">Terms of Service</a></li>
                <li><a href="#" className="hover:opacity-60">Privacy Policy</a></li>
                <li><a href="#" className="hover:opacity-60">Cookie Settings</a></li>
                <li><a href="#" className="hover:opacity-60">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={startCheckout}
      />

      <FashionStylist />
    </div>
  );
};

export default App;
