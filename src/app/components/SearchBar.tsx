import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  placeholder = "Chat IA",
  className = ""
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-full"
      />
      <FaSearch className="absolute left-4 top-3 text-gray-400" />
    </div>
  );
};

export default SearchBar;
