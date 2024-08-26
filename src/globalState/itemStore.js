import { create } from "zustand";
import { persist } from "zustand/middleware";

const useItemStore = create(
  persist(
    (set) => ({
      items: [],

      addNewItem: (newItem) => {
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateItem: (updateItem) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updateItem.id ? updateItem : item,
          ),
        }));
      },
    }),
    {
      name: "item-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useItemStore;
