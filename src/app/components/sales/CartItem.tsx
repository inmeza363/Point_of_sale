"use client";

import React from "react";

interface CartItemProps {
  title: string;
  price: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  quantity,
  onIncrease,
  onDecrease
}) => {
  // Calcular el subtotal
  const numericPrice = parseFloat(price.replace(/[^\d.]/g, ""));
  const subtotal = numericPrice * quantity;

  // Formato de moneda para mostrar valores con comas y símbolo de peso
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-gray-500">
            {formatCurrency(numericPrice)} c/u
          </p>
        </div>
        <p className="font-medium text-sm">{formatCurrency(subtotal)}</p>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={onDecrease}
            className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-sm"
          >
            −
          </button>

          <span className="mx-3 text-sm font-medium">{quantity}</span>

          <button
            onClick={onIncrease}
            className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
