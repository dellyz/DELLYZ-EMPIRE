
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-stone-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-4 right-4 bg-white py-3 flex items-center justify-center space-x-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
        >
          <Plus size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Add to Cart</span>
        </button>
      </div>
      
      <div className="mt-4 flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-stone-900">${product.price}</p>
        </div>
        <p className="text-xs text-stone-500 uppercase tracking-tighter">{product.subCategory}</p>
      </div>
    </div>
  );
};

export default ProductCard;
