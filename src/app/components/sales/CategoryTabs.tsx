"use client";

import React from "react";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-6 py-3 whitespace-nowrap ${
            activeCategory === category
              ? "border-b-2 border-primary-color text-primary-color font-medium"
              : "text-gray-500"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
