import zustymiddleware from "zustymiddleware";
import { create } from "zustand";

const useCustomerStore = create(
  zustymiddleware((set) => ({
    // state
    customers: [],

    // actions
    addNewCustomer: (newCustomer) => {
      set((state) => ({
        customers: [...state.customers, newCustomer],
      }));
    },

    updateCustomer: (updatedCustomer) => {
      set((state) => ({
        customers: state.customers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer,
        ),
      }));
    },
  })),
);

window.store = useCustomerStore;
export default useCustomerStore;
