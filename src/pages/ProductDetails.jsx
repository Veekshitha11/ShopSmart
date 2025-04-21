import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl">Loading product details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <p className="text-xl">Error: {error}</p>
          <p className="mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
          <p className="text-xl">Product not found</p>
          <Link to="/products" className="inline-block mt-4 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 py-8">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-900">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="ml-1 text-gray-600 hover:text-blue-900 md:ml-2">Products</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2 font-medium truncate">{product.title}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
            <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase text-teal-600 text-sm font-semibold tracking-wide mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating?.rate.toFixed(1)} ({product.rating?.count} reviews)
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-blue-900">${product.price.toFixed(2)}</span>
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-3 text-gray-600">Qty:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleAddToCart}
                className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold flex-1 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex-1 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;