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
      selectedItem: null,
      selectedQuantity: 1,

      setSelectedQuantity: (quantity) => set({ selectedQuantity: quantity }),

      setSelectedItem: (item) => set({ selectedItem: item }),

      setOrderItems: (items) => set({ orderItems: items }), // Action to set order items

      addItem: (item) =>
        set((state) => ({
          orderItems: [...state.orderItems, item], // Append an item to orderItems
        })),

      removeItem: (index) =>
        set((state) => {
          const updatedItems = [...state.orderItems];
          updatedItems.splice(index, 1); // Remove item by index
          return { orderItems: updatedItems };
        }),

      updateItemQuantity: (index, quantity) => {
        set((state) => {
          const updatedItems = [...state.orderItems];
          updatedItems[index] = {
            ...updatedItems[index],
            quantity,
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
