import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      // state
      orders: [],
      // actions
      createNewOrder: (newOrder) => {
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      },

      updateOrder: (updatedOrder) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order,
          ),
        }));
      },
    }),
    {
      name: "order-storage",
      getStorage: () => localStorage,
    },
  ),
);

window.store = useOrderStore;
export default useOrderStore;
