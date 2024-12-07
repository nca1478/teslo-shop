import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    country: string;
    phone: string;
    city: string;
  };

  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        address: {
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          postalCode: "",
          country: "",
          phone: "",
          city: "",
        },

        // Métodos
        setAddress: (address) => {
          set({ address });
        },
      }),
      {
        name: "address-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
