// pages/Products.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import PriceRangeSlider from '../components/PriceRangeSlider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        
        // Set initial min and max price
        const prices = data.map(product => product.price);
        setMinMaxPrice({
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        });
        setPriceRange({
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, sortBy, priceRange, searchQuery, products]);
  
  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (by id)
        filtered.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(filtered);
  };
  
  const getUniqueCategories = () => {
    const categories = products.map(product => product.category);
    return ['all', ...new Set(categories)];
  };
  
  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl">Loading products...</p>
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
  
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">All Products</h1>
      
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Filters</h2>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getUniqueCategories().map((category, index) => (
                  <option key={index} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range Slider */}
            <PriceRangeSlider
              minPrice={minMaxPrice.min}
              maxPrice={minMaxPrice.max}
              onPriceChange={handlePriceChange}
            />
            
            {/* Sort By */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <p className="text-lg text-gray-600">No products found with the selected filters.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('default');
                  setPriceRange(minMaxPrice);
                  setSearchQuery('');
                }}
                className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">{filteredProducts.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;