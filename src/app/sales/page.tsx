"use client";

import "../globals.css";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { SalesPage } from "../components/sales";
import { CURRENT_USER } from "../../data/mock";

export default function Sales() {
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
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
          <SalesPage />
        </div>
      </div>
    </main>
  );
}
