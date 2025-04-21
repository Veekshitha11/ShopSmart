import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
          <img 
            src={product.image} 
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 h-12 overflow-hidden">{product.title}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full text-sm transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;