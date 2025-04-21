import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  
  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    onPriceChange(value, maxValue);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    onPriceChange(minValue, value);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 text-sm">Price Range</span>
        <span className="text-blue-900 font-medium text-sm">
          ${minValue.toFixed(2)} - ${maxValue.toFixed(2)}
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-md">
        <div
          className="absolute h-2 bg-teal-500 rounded-md"
          style={{
            left: `${((minValue - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${100 - ((maxValue - minPrice) / (maxPrice - minPrice)) * 100}%`
          }}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;