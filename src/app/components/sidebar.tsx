import React from "react";
import "@/app/globals.css";
import Link from "next/link";
import Logo from "@/public/assets/logo.svg";
import {
  FaHome,
  FaShoppingCart,
  FaCashRegister,
  FaBoxes,
  FaShoppingBag,
  FaChartBar,
  FaMobile,
  FaCog
} from "react-icons/fa";

const menuItems = [
  { name: "Inicio", icon: <FaHome />, path: "/" },
  { name: "Ventas", icon: <FaShoppingCart />, path: "/Ventas" },
  { name: "Cajas", icon: <FaCashRegister />, path: "/cajas" },
  { name: "Inventarios", icon: <FaBoxes />, path: "/inventarios" },
  { name: "Compras", icon: <FaShoppingBag />, path: "/compras" },
  { name: "Reportes", icon: <FaChartBar />, path: "/reportes" },
  { name: "Servicios y Recargas", icon: <FaMobile />, path: "/servicios" },
  { name: "Configuración", icon: <FaCog />, path: "/configuracion" }
];

const Sidebar = () => {
  return (
    <div className="bg-tertiary-container-color h-full w-64 border-r border-primary-color">
      <div className="flex w-5xl p-4">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex flex-col mt-8">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div className="px-4 py-3 cursor-pointer flex items-center gap-2 relative transition-all duration-300 hover:bg-primary-container-color hover:text-primary-color hover:font-medium group">
              <div className="absolute left-0 top-0 w-1 h-full bg-primary-color scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="border-border-color border-b-1 "></div>
    </div>
  );
};
export default Sidebar;
