"use client";

import React, { useState, useRef, useEffect } from "react";
import CartItem from "./CartItem";
import { jsPDF } from "jspdf";
import {
  FaMoneyBill,
  FaShoppingCart,
  FaPrint,
  FaCalculator,
  FaTimes,
  FaChevronRight,
  FaChevronLeft,
  FaTrashAlt
} from "react-icons/fa";

interface CartProduct {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

interface ShoppingCartProps {
  products: CartProduct[];
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  products,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout
}) => {
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [showCheckoutStep, setShowCheckoutStep] = useState<
    "products" | "payment" | "change" | "ticketQuestion" | "ticket"
  >("products");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [buttonOffset, setButtonOffset] = useState("0px");
  const cartRef = useRef<HTMLDivElement>(null);

  // Actualizar offset del botón cuando el carrito cambia de visibilidad
  useEffect(() => {
    if (isCartVisible && cartRef.current) {
      setButtonOffset(`${cartRef.current.offsetWidth}px`);
    } else {
      setButtonOffset("0px");
    }

    // También actualizar cuando la ventana cambia de tamaño
    const handleResize = () => {
      if (isCartVisible && cartRef.current) {
        setButtonOffset(`${cartRef.current.offsetWidth}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCartVisible]);

  // Formato de moneda para mostrar valores con comas y símbolo de peso
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calcular el total
  const total = products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
    return sum + price * product.quantity;
  }, 0);

  // Calcular el cambio
  const paymentNumeric = parseFloat(paymentAmount) || 0;
  const change = paymentNumeric - total;

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  // Manejar evento de tecla Enter en el input de pago
  const handlePaymentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && paymentNumeric >= total) {
      handleSubmitPayment();
    }
  };

  const handleSubmitPayment = () => {
    if (paymentNumeric >= total) {
      setShowCheckoutStep("change");
    }
  };

  // Regresar a la pantalla de pago para editar el monto
  const handleEditPayment = () => {
    setShowCheckoutStep("payment");
  };

  const handleStartCheckout = () => {
    if (products.length > 0) {
      setShowCheckoutStep("payment");
    }
  };

  const handlePrintTicket = () => {
    setShowCheckoutStep("ticket");
  };

  const handleCloseTicket = () => {
    setShowCheckoutStep("products");
    setPaymentAmount("");
    onCheckout();
  };

  const handleCompleteCheckout = () => {
    setShowCheckoutStep("ticketQuestion");
  };

  const handleDeclineTicket = () => {
    setShowCheckoutStep("products");
    setPaymentAmount("");
    onCheckout();
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Generar un ID de ticket
  const ticketId = `TICKET-${Math.floor(Math.random() * 10000)}`;

  // Función para generar e imprimir el PDF
  const generateAndPrintPdf = () => {
    setIsGeneratingPdf(true);

    try {
      // Crear un nuevo documento PDF con ancho máximo de 420px
      // Convertir 420px a mm (1px ≈ 0.264583mm)
      const pxToMm = 0.264583;
      const maxWidthInMm = 420 * pxToMm;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [maxWidthInMm, maxWidthInMm * 1.5] // Ancho de 420px y altura proporcional
      });

      // Establecer el color de fondo blanco para todo el documento
      doc.setFillColor(255, 255, 255);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "F"
      );

      // Configurar el documento - Encabezado
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = pageWidth / 2;

      // ABARROTECK - Título principal
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("ABARROTECK", centerX, 15, { align: "center" });

      // Subtítulo
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Tu tienda de confianza", centerX, 20, { align: "center" });

      // RFC
      doc.setFontSize(8);
      doc.text("RFC: ABC123456XYZ", centerX, 25, { align: "center" });

      // Información del ticket
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Columna izquierda
      const leftCol = 10;
      let y = 35;

      doc.text("Ticket:", leftCol, y);
      doc.text("Fecha:", leftCol, y + 5);
      doc.text("Cajero:", leftCol, y + 10);

      // Columna derecha (alineada a la derecha)
      const rightCol = pageWidth - 10;

      doc.text(ticketId, rightCol, y, { align: "right" });
      doc.text(getCurrentDate(), rightCol, y + 5, { align: "right" });
      doc.text("Usuario Demo", rightCol, y + 10, { align: "right" });

      // Línea separadora
      y += 15;
      doc.setDrawColor(220, 220, 220);
      doc.line(leftCol, y, rightCol, y);

      // Detalle de productos - título
      y += 7;
      doc.setFont("helvetica", "bold");
      doc.text("Detalle de productos", leftCol, y);

      // Encabezados de tabla
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Producto", leftCol, y);

      // Posiciones de las columnas
      const cantCol = leftCol + 55;
      const precioCol = cantCol + 15;

      doc.text("Cant.", cantCol, y, { align: "center" });
      doc.text("Precio", precioCol, y, { align: "right" });

      // Línea separadora de encabezados
      y += 2;
      doc.line(leftCol, y, rightCol, y);

      // Productos
      y += 5;
      doc.setFontSize(9);

      products.forEach((product) => {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
        const subtotal = price * product.quantity;

        // Limitar largo del título
        let title = product.title;
        if (title.length > 25) {
          title = title.substring(0, 22) + "...";
        }

        doc.text(title, leftCol, y);
        doc.text(product.quantity.toString(), cantCol, y, { align: "center" });
        doc.text(formatCurrency(price).replace("MXN", "$"), precioCol, y, {
          align: "right"
        });
        doc.text(formatCurrency(subtotal).replace("MXN", "$"), rightCol, y, {
          align: "right"
        });

        y += 5;
      });

      // Línea separadora
      doc.line(leftCol, y, rightCol, y);
      y += 5;

      // Totales
      doc.setFontSize(9);

      // Subtotal
      doc.text("Subtotal:", cantCol, y);
      doc.text(formatCurrency(total).replace("MXN", "$"), rightCol, y, {
        align: "right"
      });

      // IVA
      y += 5;
      doc.text("IVA (16%):", cantCol, y);
      doc.text(formatCurrency(total * 0.16).replace("MXN", "$"), rightCol, y, {
        align: "right"
      });

      // Total
      y += 5;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Total:", cantCol, y);
      doc.text(formatCurrency(total).replace("MXN", "$"), rightCol, y, {
        align: "right"
      });

      // Línea separadora
      y += 2;
      doc.line(cantCol - 10, y, rightCol, y);
      y += 5;

      // Información de pago
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Pago:", cantCol, y);
      doc.text(
        formatCurrency(paymentNumeric).replace("MXN", "$"),
        rightCol,
        y,
        {
          align: "right"
        }
      );

      // Cambio
      y += 5;
      doc.text("Cambio:", cantCol, y);
      doc.text(formatCurrency(change).replace("MXN", "$"), rightCol, y, {
        align: "right"
      });

      // Pie de página
      const footerY = doc.internal.pageSize.getHeight() - 20;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("GRACIAS POR SU COMPRA", centerX, footerY, { align: "center" });
      doc.setFontSize(8);
      doc.text("www.abarroteck.com", centerX, footerY + 5, { align: "center" });
      doc.text("Tel: (55) 1234-5678", centerX, footerY + 10, {
        align: "center"
      });

      // Guardar o mostrar el PDF
      doc.save("ticket.pdf");

      // Simular que la impresión fue exitosa
      setTimeout(() => {
        setIsGeneratingPdf(false);
        handleCloseTicket();
      }, 2000);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      setIsGeneratingPdf(false);
      alert("Error al generar el ticket. Intente nuevamente.");
    }
  };

  // Si estamos mostrando el ticket, generarlo automáticamente
  useEffect(() => {
    if (showCheckoutStep === "ticket") {
      generateAndPrintPdf();
    }
  }, [showCheckoutStep]);

  // Función para vaciar el carrito
  const handleClearCart = () => {
    if (products.length > 0) {
      if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        // Implementar la misma funcionalidad que onCheckout pero sin procesar pago
        onCheckout();
        // Regresar a la vista de productos en caso de estar en otra vista
        setShowCheckoutStep("products");
        setPaymentAmount("");
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Contenedor principal del carrito con animación */}
      <div
        ref={cartRef}
        className="absolute top-0 right-0 h-full flex flex-col bg-white shadow-xl transition-all duration-300 ease-in-out max-w-md w-full pointer-events-auto"
        style={{
          transform: isCartVisible ? "translateX(0)" : "translateX(100%)",
          opacity: isCartVisible ? 1 : 0
        }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-primary-color" />
              <h2 className="text-lg font-bold">Carrito de compras</h2>
            </div>
            {products.length > 0 && (
              <button
                onClick={handleClearCart}
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                title="Vaciar carrito"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 my-8 flex flex-col items-center">
              <FaShoppingCart className="text-gray-300 text-5xl mb-3" />
              <p>No hay productos en el carrito</p>
            </div>
          ) : (
            products.map((product) => (
              <CartItem
                key={product.id}
                title={product.title}
                price={product.price}
                quantity={product.quantity}
                onIncrease={() => onIncreaseQuantity(product.id)}
                onDecrease={() => onDecreaseQuantity(product.id)}
              />
            ))
          )}
        </div>

        <div className="p-4 pt-3 bg-gray-50 border-t border-gray-200">
          {products.length > 0 && (
            <>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
              </div>

              {showCheckoutStep === "payment" && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <label
                      htmlFor="paymentAmount"
                      className="text-sm text-gray-600"
                    >
                      Pagó con:
                    </label>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        id="paymentAmount"
                        type="text"
                        value={paymentAmount}
                        onChange={handlePaymentChange}
                        onKeyDown={handlePaymentKeyDown}
                        className="pl-7 pr-3 py-2 w-full border border-gray-200 rounded focus:outline-none focus:border-primary-500"
                        placeholder="0.00"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitPayment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mb-2 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={paymentNumeric < total}
                  >
                    <FaCalculator />
                    <span>Calcular cambio</span>
                  </button>
                </div>
              )}

              {showCheckoutStep === "change" && (
                <div className="mb-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <button
                    onClick={handleEditPayment}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Pago:</span>
                    <span className="font-medium">
                      {formatCurrency(paymentNumeric)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-green-200">
                    <span className="font-bold">Cambio:</span>
                    <span className="font-bold text-green-700">
                      {formatCurrency(change)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleEditPayment}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaChevronLeft />
                      <span>Editar pago</span>
                    </button>

                    <button
                      onClick={handleCompleteCheckout}
                      className="flex-1 bg-[#4050C8] hover:bg-[#3545b0] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <FaMoneyBill />
                      <span>Continuar</span>
                    </button>
                  </div>
                </div>
              )}

              {showCheckoutStep === "ticketQuestion" && (
                <div className="mb-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-center mb-3 font-medium">
                    ¿Desea imprimir ticket de compra?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrintTicket}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <FaPrint />
                      <span>Sí</span>
                    </button>
                    <button
                      onClick={handleDeclineTicket}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      <span>No</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex gap-2">
            {showCheckoutStep === "products" && (
              <button
                onClick={handleStartCheckout}
                className="w-full bg-[#4050C8] hover:bg-[#3545b0] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={products.length === 0}
              >
                <FaMoneyBill />
                <span>Cobrar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Botón/pestaña para alternar visibilidad del carrito */}
      <div
        className="fixed top-1/2 -translate-y-1/2 right-0 z-55 pointer-events-auto transition-transform duration-300 ease-in-out"
        style={{
          transform: isCartVisible
            ? `translateX(-${buttonOffset})`
            : "translateX(0)"
        }}
      >
        <button
          onClick={toggleCartVisibility}
          className="bg-[#4050C8] hover:bg-[#3545b0] text-white h-36 w-12 rounded-l-lg shadow-lg flex flex-col items-center justify-center transition-colors"
        >
          <div className="rotate-90 flex items-center justify-center whitespace-nowrap">
            <FaShoppingCart className="mr-2 transform -rotate-90" />
            <span className="font-medium">Carrito</span>
            {isCartVisible ? (
              <FaChevronRight className="ml-2" />
            ) : (
              <FaChevronLeft className="ml-2" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
