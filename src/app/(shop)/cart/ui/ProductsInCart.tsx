"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((store) => store.cart);
  const updateProductQuantity = useCartStore(
    (store) => store.updateProductQuantity
  );
  const [loaded, setloaded] = useState(false); // evitar error hidratación

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
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
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.title} - <span>{`(${product.size})`}</span>
            </Link>

            {/* Precio Producto */}
            <p>${product.price}</p>

            {/* Selector de Cantidad */}
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            {/* Botón de Eliminar Producto */}
            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
