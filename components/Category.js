import Image from "next/image";
import React from "react";
import useCoffee from "../hooks/useCoffee";

const Category = ({ category }) => {
  const { currentCategory, handleClickCategory } = useCoffee();
  const { id, name, icon } = category;
  return (
    <div
      className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 ${
        currentCategory?.id === id ? "bg-amber-400" : ""
      }`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icon}.svg`}
        alt="Icono de categoría"
      />

      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
        onClick={() => handleClickCategory(id)}
      >
        {name}
      </button>
    </div>
  );
};

export default Category;
