import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  removeAllProducts: () => void;
}

export const useCartStore = create<State>()(
  // zustand en redux dev tools
  devtools(
    // persistir store en localstorage
    persist(
      (set, get) => ({
        // store
        cart: [],

        // métodos
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

        getSummaryInformation: () => {
          const { cart } = get();

          const subTotal = cart.reduce(
            (subTotal, product) => product.quantity * product.price + subTotal,
            0
          );

          const tax = subTotal * 0.15;
          const total = subTotal + tax;
          const itemsInCart = cart.reduce(
            (total, item) => total + item.quantity,
            0
          );

          return {
            subTotal,
            tax,
            total,
            itemsInCart,
          };
        },

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

        removeAllProducts: () => {
          set({ cart: [] });
        },
      }),
      // configuración de persistencia: localStorage o sessionStorage
      {
        name: "shopping-cart",
        storage: createJSONStorage(() => localStorage),
        // skipHydration: true,
      }
    )
  )
);
