import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  address2: "",
  postalCode: "",
  country: "",
  phone: "",
  city: "",
};

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
  removeCurrentAddress: () => void;
}

export const useAddressStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        address: initialState,

        // Métodos
        setAddress: (address) => {
          set({ address });
        },

        removeCurrentAddress: () => {
          set({ address: initialState });
        },
      }),
      {
        name: "address-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
