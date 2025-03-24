"use client";

import React from "react";
import MetricCard from "../ui/MetricCard";
import AlertItem from "../ui/AlertItem";
import { MOCK_METRICS, MOCK_ALERTS, CURRENT_USER } from "../../../data/mock";

interface HomePageProps {
  className?: string;
}

const HomePage: React.FC<HomePageProps> = ({ className = "" }) => {
  const userName = CURRENT_USER.name;

  return (
    <div className={`p-6 w-full max-w-6xl mx-auto ${className}`}>
      <section aria-labelledby="metrics-heading" className="mb-8">
        <h1 id="metrics-heading" className="text-lg font-medium mb-6">
          Métricas relevantes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {MOCK_METRICS.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        <div className="flex justify-end">
          <button className="text-tertiary-color hover:underline cursor-pointer">
            Ver mis reportes
          </button>
        </div>
      </section>

      <div
        aria-labelledby="welcome-heading"
        className="border-border rounded-lg p-8 mb-8 bg-white"
      >
        <h2
          id="welcome-heading"
          className="text-3xl font-bold text-center mb-4"
        >
          Bienvenido de nuevo, {userName}
        </h2>

        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-8">
          Soy Abarroteck AI, tu asistente de Inteligencia Artificial. Te ayudo a
          detectar tendencias, analizar datos de tu tienda, y sugerir mejoras
          del negocio. Pregúntame lo que quieras.
        </p>

        <h3 className="font-medium mb-4 text-center">
          Aquí están las cosas a las que sugiero que pongas atención:
        </h3>

        <div className="max-w-3xl mx-auto">
          {MOCK_ALERTS.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
