"use client";

import { useCallback, useEffect, useState } from "react";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/app/config/fonts";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold bg-gray-200 animate-pulse text-xl`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          En Stock: {stock} Und.
        </h1>
      )}
    </>
  );
};
