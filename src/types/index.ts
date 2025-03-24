import React from "react";

// Tipos para productos
export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image?: string;
}

// Tipos para el carrito de compras
export interface CartItem extends Product {
  quantity: number;
}

// Tipos para las métricas
export interface Metric {
  title: string;
  value: string;
  description: string;
  increasePercent?: string;
  icon?: React.ReactNode;
}

// Tipos para las alertas
export interface Alert {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  onAction?: () => void;
  severity: "info" | "warning" | "error" | "success";
}

// Tipos para el usuario
export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

// Tipos para categorías
export type Category = string;
