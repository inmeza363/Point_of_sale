import React from "react";
import SearchBar from "./SearchBar";

const Topbar = () => {
  return (
    <div
      className="bg-white p-4 shadow-sm flex justify-end items-center fixed top-0 right-0 left-0 z-10"
      style={{ paddingLeft: "16rem" }}
    >
      <div className="flex gap-4 items-center">
        <SearchBar className="w-64" />

        <button className="p-3 bg-gray-100 rounded-full">
          <span className="sr-only">Notificaciones</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>

        <button className="p-3 bg-gray-100 rounded-full">
          <span className="sr-only">Perfil</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
