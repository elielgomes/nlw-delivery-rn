import { create } from "zustand";
import { ProductProps } from "@/src/utils/data/products";
import * as cartInMemory from "@/src/stores/helpers/cart-in-memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IProductCartProps extends ProductProps {
  quantity: number;
}

interface IStateProps {
  products: IProductCartProps[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<IStateProps>(
    (set) => ({
      products: [],
      addProduct: (product) => {
        set((state) => ({
          products: cartInMemory.addProduct(state.products, product),
        }));
      },
      removeProduct: (id) => {
        set((state) => ({
          products: cartInMemory.removeProduct(state.products, id),
        }));
      },
      clearCart: () => {
        set(() => ({ products: [] }));
      },
    }),
    {
      name: "nlw-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
