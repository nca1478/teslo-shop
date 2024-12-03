"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";

export const OrderSummary = () => {
  const summaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );

  const { itemsInCart, subTotal, tax, total } = summaryInformation();

  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">${subTotal.toFixed(2)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">${tax.toFixed(2)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">${total.toFixed(2)}</span>
    </div>
  );
};
