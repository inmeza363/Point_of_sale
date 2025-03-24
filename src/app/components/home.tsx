import React from "react";
import { FaExclamationTriangle, FaArrowUp } from "react-icons/fa";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  increasePercent?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  increasePercent
}: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <div className="mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-4xl font-bold mb-1">{value}</p>
      <div className="text-sm text-gray-500">
        {increasePercent && (
          <span className="text-green-500 mr-1">+{increasePercent}%</span>
        )}
        <span>{description}</span>
      </div>
    </div>
  );
};

interface AlertItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
}

const AlertItem = ({
  icon,
  title,
  description,
  actionText
}: AlertItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 mb-4">
      <div className="text-lg mt-1">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button className="px-4 py-2 bg-white rounded-md text-sm">
        {actionText}
      </button>
    </div>
  );
};

const Home = () => {
  const userName = "Manuel";

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-medium">Métricas relevantes</h1>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Ventas hoy"
          value="$00.00"
          description="Ventas que ayer"
          increasePercent="16"
        />
        <MetricCard
          title="Productos vendidos hoy"
          value="104"
          description="productos que ayer"
          increasePercent="6"
        />
        <MetricCard
          title="Clientes atendidos hoy"
          value="43"
          description="clientes que ayer"
          increasePercent="2"
        />
        <MetricCard
          title="Productos bajos de inventario"
          value="30"
          description="3.2% del total del inventario"
        />
      </div>

      <div className="flex justify-end mb-6 text-tertiary-color">
        <button className="text-tertiary-color">Ver mis reportes</button>
      </div>

      {/* Panel de bienvenida */}
      <div className="border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">
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
          <AlertItem
            icon={<FaExclamationTriangle className="text-red-500" />}
            title="Bajo inventario: Tienes un inventario muy bajo en la tienda #8"
            description="Te damos sugerencias para surtir tu tienda"
            actionText="Revisar inventario"
          />

          <AlertItem
            icon={<FaArrowUp className="text-green-500" />}
            title="Ventas altas: Las ventas en bebidas subieron un 15%"
            description="Subieron tus ventas esta semana"
            actionText="Revisar ventas"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
