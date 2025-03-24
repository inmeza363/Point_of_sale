"use client";

import { useState } from "react";
import { Search, Mic, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Buscar...",
  className,
  iconClassName,
  containerClassName
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClassName}`}
        size={20}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full h-12 pl-10 pr-16 py-2 text-base rounded-lg border border-gray-200 focus:outline-none focus:border-primary-500 ${className}`}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        {searchQuery && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
        <button
          className="text-gray-400 hover:text-gray-600"
          aria-label="Búsqueda por voz"
        >
          <Mic size={18} />
        </button>
      </div>
    </div>
  );
};
