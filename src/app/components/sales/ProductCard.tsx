"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlus, FaCheck } from "react-icons/fa";

interface ProductCardProps {
  title: string;
  category: string;
  price: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  price,
  onAddToCart
}) => {
  const [isAdded, setIsAdded] = useState(false);

  // Formato de moneda para mostrar valores con comas y símbolo de peso
  const formatCurrency = (priceString: string): string => {
    const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ""));
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericPrice);
  };

  const handleAddToCart = () => {
    onAddToCart();
    setIsAdded(true);

    // Restablecer el estado después de una animación
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      {/* Icono de confirmación de producto agregado */}
      {isAdded && (
        <div className="absolute top-2 right-2 z-10 animate-scaleIn">
          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
            <FaCheck size={12} />
          </div>
        </div>
      )}

      <div className="h-32 bg-gray-200 flex items-center justify-center">
        {/* Placeholder de imagen con formas geométricas */}
        <div className="flex flex-col items-center scale-75">
          <div className="w-12 h-12 bg-gray-400 rounded-full mb-1"></div>
          <div className="w-12 h-12 bg-gray-400 mb-1"></div>
          <div className="relative w-12 h-12">
            <div className="absolute border-l-[20px] border-r-[20px] border-b-[30px] border-b-gray-400 border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-gray-500">{category}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium text-sm">{formatCurrency(price)}</p>
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              isAdded
                ? "bg-green-100 text-green-600"
                : "bg-[#d5f0fe] text-[#1e88e5] hover:bg-[#c2e8fc]"
            }`}
            aria-label="Añadir al carrito"
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <FaCheck size={10} className="mr-1" /> Agregado
              </>
            ) : (
              <>
                <FaPlus size={10} className="mr-1" /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
