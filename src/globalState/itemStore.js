import zustymiddleware from "zustymiddleware";
import { create } from "zustand";

const useItemStore = create(
  zustymiddleware((set) => ({
    // state
    items: [],

    // actions
    addNewItem: (newItem) => {
      set((state) => ({
        customers: [...state.customers, newItem],
      }));
    },

    updateItem: (updateItem) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === updateItem.id ? updateItem : item,
        ),
      }));
    },
  })),
);

window.store = useItemStore;
export default useItemStore;
