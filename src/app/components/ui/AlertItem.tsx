"use client";

import React from "react";
import { Alert } from "../../../types";

interface AlertItemProps {
  alert: Alert;
  className?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, className = "" }) => {
  const { icon, title, description, actionText, onAction, severity } = alert;

  const getBgColor = () => {
    switch (severity) {
      case "error":
        return "bg-red-50";
      case "warning":
        return "bg-amber-50";
      case "success":
        return "bg-green-50";
      case "info":
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg ${getBgColor()} mb-4 ${className}`}
    >
      <div className="text-lg mt-1">{icon}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        className="px-4 py-2 bg-white rounded-md text-sm hover:bg-gray-50 transition-colors"
        onClick={() => onAction?.()}
        aria-label={actionText}
      >
        {actionText}
      </button>
    </div>
  );
};

export default AlertItem;
