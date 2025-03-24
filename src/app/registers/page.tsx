"use client";

import "../globals.css";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { CURRENT_USER } from "../../data/mock";

export default function Registers() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Topbar
          userName={CURRENT_USER.name}
          notificationsCount={2}
          onSearch={(query) => console.log("Búsqueda:", query)}
          onNotificationsClick={() => console.log("Notificaciones")}
          onProfileClick={() => console.log("Perfil")}
        />
        <div className="pt-20 h-[calc(100vh-4rem)] overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Cajas</h1>
          <p>Contenido de la página de Cajas</p>
        </div>
      </div>
    </main>
  );
}
