"use client";

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    console.log({ size, quantity });
  };

  return (
    <>
      {/* Mostrar error si no hay talla seleccionada */}
      {posted && !size && (
        <span className="text-red-500 font-bold fade-in">
          Debe de seleccionar una talla!
        </span>
      )}

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
