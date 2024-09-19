/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUpdateQuantity = create(
  persist(
    (set) => ({
      items: [], // List of items
      selectedQuantity: 1, // Global quantity state

      // Action to set quantity
      setSelectedQuantity: (quantity) => set({ selectedQuantity: quantity }),

      // Function to update the quantity of an item
      updateItemQuantity: (itemIndex, quantity) => {
        set((state) => {
          const updatedItems = [...state.items];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity,
            // totalPrice: quantity * updatedItems[itemIndex].unitPrice,
          };
          return {
            items: updatedItems, // Update the items list in the state
          };
        });
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
    }),
    {
      name: "item-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useUpdateQuantity;
