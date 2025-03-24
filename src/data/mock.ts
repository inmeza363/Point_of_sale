import { Product, User, Alert, Metric } from "../types";
import {
  FaExclamationTriangle,
  FaArrowUp,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
  FaBoxOpen
} from "react-icons/fa";
import React from "react";

// Categorías
export const CATEGORIES: string[] = [
  "Todos",
  "Lácteos",
  "Refrescos",
  "Enlatados",
  "Frutas",
  "Verduras",
  "Tabaco"
];

// Productos
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Leche Deslactosada",
    category: "Lácteos",
    price: "$25.50"
  },
  { id: "2", title: "Yogurt Natural", category: "Lácteos", price: "$15.00" },
  { id: "3", title: "Queso Fresco", category: "Lácteos", price: "$45.00" },
  { id: "4", title: "Crema Ácida", category: "Lácteos", price: "$22.00" },
  { id: "5", title: "Mantequilla", category: "Lácteos", price: "$35.00" },
  { id: "6", title: "Refresco Cola", category: "Refrescos", price: "$18.00" },
  { id: "7", title: "Agua Mineral", category: "Refrescos", price: "$12.50" },
  {
    id: "8",
    title: "Refresco Naranja",
    category: "Refrescos",
    price: "$18.00"
  },
  { id: "9", title: "Refresco Lima", category: "Refrescos", price: "$18.00" },
  { id: "10", title: "Agua Natural", category: "Refrescos", price: "$10.00" },
  { id: "11", title: "Atún en Agua", category: "Enlatados", price: "$22.00" },
  {
    id: "12",
    title: "Frijoles Refritos",
    category: "Enlatados",
    price: "$16.50"
  },
  { id: "13", title: "Chícharos", category: "Enlatados", price: "$14.00" },
  { id: "14", title: "Sardinas", category: "Enlatados", price: "$25.00" },
  { id: "15", title: "Elote", category: "Enlatados", price: "$18.00" },
  { id: "16", title: "Manzanas", category: "Frutas", price: "$35.00" },
  { id: "17", title: "Plátanos", category: "Frutas", price: "$20.00" },
  { id: "18", title: "Naranjas", category: "Frutas", price: "$25.00" },
  { id: "19", title: "Peras", category: "Frutas", price: "$32.00" },
  { id: "20", title: "Uvas", category: "Frutas", price: "$45.00" },
  { id: "21", title: "Jitomate", category: "Verduras", price: "$18.50" },
  { id: "22", title: "Cebolla", category: "Verduras", price: "$14.00" },
  { id: "23", title: "Zanahoria", category: "Verduras", price: "$12.00" },
  { id: "24", title: "Papa", category: "Verduras", price: "$28.00" },
  { id: "25", title: "Chile", category: "Verduras", price: "$8.00" },
  { id: "26", title: "Cigarros", category: "Tabaco", price: "$65.00" },
  { id: "27", title: "Encendedor", category: "Tabaco", price: "$25.00" },
  { id: "28", title: "Cerillos", category: "Tabaco", price: "$8.00" },
  { id: "29", title: "Pipa", category: "Tabaco", price: "$120.00" },
  { id: "30", title: "Tabaco Suelto", category: "Tabaco", price: "$85.00" }
];

// Usuario actual
export const CURRENT_USER: User = {
  id: "1",
  name: "Manuel",
  role: "Administrador"
};

// Función auxiliar para crear los iconos
const createIcon = (
  IconComponent: React.ComponentType<any>,
  className: string
) => {
  return React.createElement(IconComponent, { className });
};

// Alertas
export const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    icon: createIcon(FaExclamationTriangle, "text-red-500"),
    title: "Bajo inventario: Tienes un inventario muy bajo en la tienda #8",
    description: "Te damos sugerencias para surtir tu tienda",
    actionText: "Revisar inventario",
    severity: "warning"
  },
  {
    id: "2",
    icon: createIcon(FaArrowUp, "text-green-500"),
    title: "Ventas altas: Las ventas en bebidas subieron un 15%",
    description: "Subieron tus ventas esta semana",
    actionText: "Revisar ventas",
    severity: "success"
  }
];

// Métricas
export const MOCK_METRICS: Metric[] = [
  {
    title: "Ventas hoy",
    value: "13000.00",
    description: "Ventas que ayer",
    increasePercent: "16",
    icon: createIcon(FaShoppingCart, "text-white")
  },
  {
    title: "Productos vendidos hoy",
    value: "104",
    description: " Productos que ayer",
    increasePercent: "6",
    icon: createIcon(FaMoneyBillWave, "text-white")
  },
  {
    title: "Clientes atendidos hoy",
    value: "43",
    description: "clientes que ayer",
    increasePercent: "2",
    icon: createIcon(FaUsers, "text-white")
  },
  {
    title: "Productos bajos de inventario",
    value: "30",
    description: "3.2% del total del inventario",
    icon: createIcon(FaBoxOpen, "text-white")
  }
];
