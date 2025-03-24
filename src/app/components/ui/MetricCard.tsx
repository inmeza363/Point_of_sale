"use client";

import React from "react";
import { FaChartLine } from "react-icons/fa";
import { Metric } from "../../../types";

interface MetricCardProps {
  metric: Metric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className = "" }) => {
  const { title, value, description, increasePercent, icon } = metric;

  // Formato de moneda para mostrar valores con comas y símbolo de peso
  const formatValue = (value: string): string => {
    // Verificar si el valor parece ser monetario (si contiene un número que podría ser dinero)
    if (
      title.toLowerCase().includes("venta") &&
      !isNaN(parseFloat(value.replace(/[^\d.-]/g, "")))
    ) {
      const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericValue);
    }

    // Si no es monetario, devolver el valor como está
    return value;
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 flex flex-col shadow-sm ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon && (
          <div className="p-2 rounded-full bg-primary-color">{icon}</div>
        )}
      </div>

      <p className="text-4xl font-bold mb-1">{formatValue(value)}</p>

      <div className="text-sm text-gray-500 flex items-center">
        {increasePercent && (
          <>
            <FaChartLine className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">
              +{increasePercent}%{" "}
            </span>
          </>
        )}
        <span>{description}</span>
      </div>
    </div>
  );
};

export default MetricCard;
