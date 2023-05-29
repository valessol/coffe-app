import React, { useEffect, useState } from "react";
import useCoffee from "../hooks/useCoffee";
import Image from "next/image";
import { formatCurrency } from "../helpers";

const Modal = () => {
  const [quantity, setQuantity] = useState(1);
  const [isEditModal, setIsEditModal] = useState(false);
  const { product, handleChangeModal, handleAddToCart, cart } = useCoffee();

  useEffect(() => {
    const currentProductOnCart = cart.find(
      (porductOnCart) => porductOnCart.id === product.id
    );
    if (currentProductOnCart) {
      setIsEditModal(true);
      setQuantity(currentProductOnCart.quantity);
    }
  }, [product, cart]);

  const handleAddQuantity = () => {
    if (quantity < 5) setQuantity(quantity + 1);
  };

  const handleRemoveQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleClick = () => {
    handleChangeModal();
    handleAddToCart({ ...product, quantity });
  };

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen de ${product.name}`}
          src={`/assets/img/${product.image}.jpg`}
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button
            className="text-2xl font-bold cursor-pointer"
            onClick={handleChangeModal}
          >
            x
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{product.name}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatCurrency(product.price)}
        </p>

        <div className="flex gap-4 mt-5">
          <button type="button" onClick={handleRemoveQuantity}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{quantity}</p>
          <button type="button" onClick={handleAddQuantity}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 uppercase font-bold px-5 py-2"
          onClick={handleClick}
        >
          {isEditModal ? "Guardar Cambios" : "Agregar al pedido"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
