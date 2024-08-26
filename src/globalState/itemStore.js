import zustymiddleware from "zustymiddleware";
import { create } from "zustand";

const useItemStore = create(
  zustymiddleware(
    (set) => ({
      // state

      items: [
        { id: 1, itemName: "Banana", unitPrice: 7, type: "food" },
        { id: 2, itemName: "Apple", unitPrice: 20, type: "food" },
        { id: 3, itemName: "Orange", unitPrice: 4, type: "food" },
        { id: 4, itemName: "Pear", unitPrice: 4, type: "food" },
        { id: 5, itemName: "Espresso", unitPrice: 4, type: "drink" },
      ],

      // actions

      //createNewItem
      addNewItem: (newItem) => {
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      //deleteItems
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      //update
      updateItem: (updateItem) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updateItem.id ? updateItem : item,
          ),
        }));
      },
    }),
    {
      name: "item-storage", // key in localStorage
    },
  ),
);

window.store = useItemStore;
export default useItemStore;
