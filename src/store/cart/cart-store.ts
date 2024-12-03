import { create } from "zustand";
// import { persist } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>((set, get) => ({
  cart: [],

  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    // 1. Revisar si el producto existe en el carrito con la talla seleccionada
    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size
    );

    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    // 2. Se que el producto existe por talla... tengo que incrementar
    const updateCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      }

      return item;
    });

    set({ cart: updateCartProducts });
  },
}));
