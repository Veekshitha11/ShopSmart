import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          ShopSmart
        </Link>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        <nav className={`absolute md:relative top-16 left-0 w-full md:w-auto md:flex md:items-center bg-blue-800 md:bg-transparent z-10 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
          <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0">
            <li className="mb-2 md:mb-0 md:mr-6">
              <Link to="/" className="hover:text-teal-300 transition-colors py-1 block" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="mb-2 md:mb-0 md:mr-6">
              <Link to="/products" className="hover:text-teal-300 transition-colors py-1 block" onClick={() => setIsMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <Link to="/cart" className="relative flex items-center hover:text-teal-300 transition-colors py-1" onClick={() => setIsMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-400 text-blue-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;