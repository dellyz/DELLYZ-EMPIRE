
import React from 'react';
import { ShoppingBag, Search, Menu, User, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
  onCategorySelect: (cat: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartToggle, onCategorySelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 hover:text-stone-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 
              onClick={() => onCategorySelect('All')}
              className="font-serif text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
            >
              DELLYZ <span className="text-stone-500 font-light italic">EMPIRE</span>
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {['All', 'Men', 'Women', 'Accessories', 'Footwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-widest"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-stone-600 hover:text-stone-900 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-stone-600 hover:text-stone-900 transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <button 
              onClick={onCartToggle}
              className="relative text-stone-600 hover:text-stone-900 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['All', 'Men', 'Women', 'Accessories', 'Footwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategorySelect(cat);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-4 text-base font-medium text-stone-700 hover:bg-stone-50 rounded-lg uppercase tracking-wider"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
