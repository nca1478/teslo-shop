"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((store) => store.cart);
  const [loaded, setloaded] = useState(false); // evitar error hidratación

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Productos en el carrito */}
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          {/* Foto del producto */}
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            {/* Nombre Producto */}
            <p>
              {product.title} - <span>{`(${product.size})`}</span>
            </p>

            {/* Precio Producto + Cantidad */}
            <p>
              ${product.price} x {product.quantity} Und
            </p>

            {/* Subtotal */}
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
