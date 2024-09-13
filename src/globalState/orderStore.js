import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      // state
      orders: [],
      tip: 0, // Add tip to the global state
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
      // Increment the quantity of a specific item in an order
      incrementQuantity: (orderId, itemId) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                orderItems: order.orderItems.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        totalPrice: (item.quantity + 1) * item.unitPrice,
                      }
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
                orderItems: order.orderItems
                  .map((item) => {
                    if (item.id === itemId) {
                      const newQuantity = item.quantity - 1;
                      if (newQuantity === 0) {
                        return null; // Automatically remove item if quantity reaches 0
                      }
                      return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newQuantity * item.unitPrice,
                      };
                    }
                    return item;
                  })
                  .filter(Boolean), // Remove null items
              };
            }
            return order;
          }),
        }));
      },
      clearOrders: () => set({ orders: [] }),
      setTip: (tip) => set({ tip }), // Action to update the tip
      setQuantity: (quantity) => set({ quantity }),
      // Selectors (computed values)
      getTotalOrderCount: () => {
        const orders = get().orders;
        return orders.reduce(
          (totalCount, order) =>
            totalCount +
            order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
          0,
        );
      },
      getTotalOrderPrice: () => {
        const orders = get().orders;
        return orders.reduce(
          (totalPrice, order) =>
            totalPrice +
            order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
          0,
        );
      },
      getCurrentQuantityById: (orderId, itemId) => {
        const order = get().orders.find((order) => order.orderId === orderId);
        const item = order?.orderItems.find((item) => item.id === itemId);
        return item ? item.quantity : 1;
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
