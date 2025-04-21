import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">ShopSmart</h2>
            <p className="text-gray-300">Your one-stop shop for quality products</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/" className="text-gray-300 hover:text-teal-300 transition-colors">Home</a></li>
              <li className="mb-2"><a href="/products" className="text-gray-300 hover:text-teal-300 transition-colors">Products</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-teal-300 transition-colors">Cart</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-300 mb-2">Email: support@shopsmart.com</p>
            <p className="text-gray-300">Phone: (555) 123-4567</p>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;