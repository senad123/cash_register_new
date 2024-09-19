import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      // state
      orders: [],
      tip: 0,
      editingOrderId: null,
      orderItems: [],
      quantity: 1,

      setOrderItems: (items) => set({ orderItems: items }), // Action to set order items

      updateItemQuantity: (index, quantity) => {
        set((state) => {
          const updatedItems = [...state.orderItems];
          updatedItems[index] = {
            ...updatedItems[index],
            quantity,
            //  totalPrice: quantity * updatedItems[index].unitPrice,
          };
          return {
            orderItems: updatedItems,
          };
        });
      },

      // actions for Orders
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
      //Editing orders
      setEditingOrderId: (orderId) => {
        set({ editingOrderId: orderId });
      },

      stopEditing: () => {
        set({ editingOrderId: null });
      },

      // Actions for items
      //   setOrderItems: (items) => set({ orderItems: items }), // Updates global order items

      clearOrderItems: () => set({ orderItems: [] }),

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
