import { create } from "zustand";

export const useCounterStore = create((set) => ({
  billItems: [],
  addBillItem: (newItem) => {
    set((state) => ({
      billItems: [...state.billItems, newItem],
    }));
  },

  updateBillItemQuantity: (name, newQuantity) => {
    set((state) => ({
      billItems: state.billItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item,
      ),
    }));
  },

  reset: () => set({ quantity: 1 }),
}));
