// components/SearchBar.js
"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Llamamos a la función que viene como prop
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar por RUN..."
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
