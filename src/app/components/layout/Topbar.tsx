"use client";

import React, { useState, useCallback } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { SearchBar } from "../ui/SearchBar";

interface TopbarProps {
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  notificationsCount?: number;
  userName?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  onSearch,
  onNotificationsClick,
  onProfileClick,
  notificationsCount = 0,
  userName
}) => {
  const handleSearch = useCallback(
    (query: string) => {
      onSearch?.(query);
    },
    [onSearch]
  );

  return (
    <header
      className="bg-white p-4 shadow-sm flex justify-between items-center z-10"
      style={{ paddingLeft: "calc(16rem + 1rem)" }}
    >
      <div className="flex-1 max-w-xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Pregunta al asistente IA..."
          className="w-full"
          containerClassName="w-full"
        />
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={onNotificationsClick}
          className="p-3 bg-gray-100 rounded-full relative hover:bg-gray-200 transition-colors"
          aria-label="Notificaciones"
        >
          <FaBell className="text-gray-700" />
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
              {notificationsCount > 9 ? "9+" : notificationsCount}
            </span>
          )}
        </button>

        <button
          onClick={onProfileClick}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center"
          aria-label="Perfil"
        >
          <FaUser className="text-gray-700" />
          {userName && (
            <span className="ml-2 hidden md:block text-sm font-medium">
              {userName}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
