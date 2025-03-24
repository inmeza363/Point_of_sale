"use client";

import React from "react";
import { FaSearch, FaHeart } from "react-icons/fa";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFavoritesClick: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  onFavoritesClick
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por nombre o código de barras"
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg"
        />
      </div>

      <button
        onClick={onFavoritesClick}
        className="p-3 bg-blue-100 rounded-lg text-blue-500"
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default ProductSearch;
