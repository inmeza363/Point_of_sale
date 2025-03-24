"use client";

import React, { useState, useEffect } from "react";
import ProductSearch from "./ProductSearch";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";
import { MOCK_PRODUCTS, CATEGORIES } from "../../../data/mock";
import { Product } from "../../../types";
import { FaShoppingCart } from "react-icons/fa";

interface CartProduct {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

const SalesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [showCartIndicator, setShowCartIndicator] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Actualizar el contador del carrito cuando cambien los productos
  useEffect(() => {
    const count = cartProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    // Si el contador aumentó, mostrar el indicador
    if (count > cartItemCount) {
      setShowCartIndicator(true);
      const timer = setTimeout(() => {
        setShowCartIndicator(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    setCartItemCount(count);
  }, [cartProducts, cartItemCount]);

  // Filtra productos por categoría y búsqueda
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Añadir producto al carrito
  const addToCart = (product: Product) => {
    setCartProducts((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Incrementar cantidad
  const increaseQuantity = (id: string) => {
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementar cantidad
  const decreaseQuantity = (id: string) => {
    setCartProducts((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => !(item.id === id && item.quantity === 1))
    );
  };

  // Procesar el pago
  const handleCheckout = () => {
    if (cartProducts.length === 0) return;

    // En una aplicación real, aquí se conectaría con una API para:
    // 1. Registrar la venta en la base de datos
    // 2. Actualizar el inventario
    // 3. Generar un ID de transacción
    // 4. Posiblemente conectar con una impresora térmica

    // Simulamos una transacción exitosa
    alert("¡Venta realizada con éxito!");

    // Limpiamos el carrito
    setCartProducts([]);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Indicador de producto agregado al carrito */}
      {showCartIndicator && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-scaleIn">
          <FaShoppingCart className="mr-2" />
          <span className="font-medium">Producto agregado al carrito</span>
        </div>
      )}

      {/* Vista principal de productos a pantalla completa */}
      <div className="w-full h-full p-6 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Barra de búsqueda */}
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onFavoritesClick={() => console.log("Favoritos")}
          />

          {/* Pestañas de categorías */}
          <div className="my-4">
            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Cuadrícula de productos */}
          <div className="overflow-y-auto scrollbar-hide flex-grow pr-2">
            <div
              className={`grid ${
                activeCategory === "Todos"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                  : "grid-cols-2 md:grid-cols-3"
              } gap-3`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carrito de compras con z-index superpuesto */}
      <ShoppingCart
        products={cartProducts}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default SalesPage;
