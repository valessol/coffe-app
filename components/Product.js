import Image from "next/image";
import React from "react";
import { formatCurrency } from "../helpers";
import useCoffee from "../hooks/useCoffee";

const Product = ({ product }) => {
  const { handleSetProduct, handleChangeModal } = useCoffee();
  const { image, name, price } = product;

  const handleClick = () => {
    handleChangeModal();
    handleSetProduct(product);
  };
  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${image}.jpg`}
        alt={`imagen de ${product.name}`}
        width={400}
        height={500}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(price)}
        </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 uppercase font-bold p-2"
          onClick={handleClick}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Product;
