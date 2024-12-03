import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
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

        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },

        getSummaryInformation: () => {},

        updateProductQuantity: (product: CartProduct, quantity: number) => {
          const { cart } = get();

          const updateCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity };
            }
            return item;
          });

          set({ cart: updateCartProducts });
        },

        removeProduct: (product: CartProduct) => {
          const { cart } = get();

          const updateCartProducts = cart.filter(
            (item) => item.id !== product.id || item.size !== product.size
          );

          set({ cart: updateCartProducts });
        },
      }),
      {
        name: "shopping-cart",
        storage: createJSONStorage(() => localStorage),
        // skipHydration: true,
      }
    )
  )
);
