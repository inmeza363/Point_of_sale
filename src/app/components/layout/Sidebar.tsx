"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  className?: string;
  logoUrl?: string;
}

const menuItems: MenuItem[] = [
  { name: "Inicio", icon: <FaHome />, path: "/" },
  { name: "Ventas", icon: <FaShoppingCart />, path: "/sales" },
  { name: "Cajas", icon: <FaCashRegister />, path: "/registers" },
  { name: "Inventarios", icon: <FaBoxes />, path: "/inventory" },
  { name: "Compras", icon: <FaShoppingBag />, path: "/purchases" },
  { name: "Reportes", icon: <FaChartBar />, path: "/reports" },
  { name: "Servicios y recargas", icon: <FaMobile />, path: "/services" },
  { name: "Configuración", icon: <FaCog />, path: "/settings" }
];

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  logoUrl = "/Logo.svg"
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-[#EEECF9] h-full w-64 flex flex-col z-50 ${className}`}
    >
      <div className="flex p-6 items-center justify-center">
        <Link href="/">
          <img src="/Logo.svg" alt="Logo" className="h-16" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`
                    px-4 py-3 flex items-center gap-3 rounded-lg
                    ${
                      isActive
                        ? "bg-[#DDDAF3] text-black font-medium"
                        : "text-gray-700 hover:bg-[#DDDAF3] hover:text-black"
                    }
                  `}
                >
                  <div className="text-gray-700 w-6">{item.icon}</div>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-gray-200 mx-4 py-4">
        <div className="text-xs text-gray-500 text-center">
          Abarroteck v1.0.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
