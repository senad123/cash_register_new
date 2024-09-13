import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      // state
      orders: [],
      tip: 0, // Add tip to the global state
      quantity: 10,
      // actions
      createNewOrder: (newOrder) => {
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
      },
      updateOrder: (updatedOrder) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderId === updatedOrder.orderId ? updatedOrder : order,
          ),
        })),

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.orderId !== id),
        }));
      },

      setTip: (tip) => set({ tip }), // Action to update the tip
      setQuantity: (quantity) => set({ quantity }),

      // Increment the quantity of a specific item in an order
      incrementQuantity: (orderId, itemId) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                orderItems: order.orderItems.map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                ),
              };
            }
            return order;
          }),
        }));
      },

      // Decrement the quantity of a specific item in an order
      decrementQuantity: (orderId, itemId) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                orderItems: order.orderItems.map((item) =>
                  item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
                ),
              };
            }
            return order;
          }),
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
