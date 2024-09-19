// File path: src/globalState/useSearchStore.js
import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchTerm: "",
  filteredItems: [],

  setSearchTerm: (term) => set(() => ({ searchTerm: term })),

  // Initialize filteredItems with all items initially
  initializeItems: (items) =>
    set(() => ({
      filteredItems: items,
    })),

  // Filter items based on the search term and exclude already ordered items
  filterItems: (items, orderItems) =>
    set((state) => {
      const filtered = items.filter(
        (item) =>
          item.itemName
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase()) &&
          !orderItems.some((orderItem) => orderItem.id === item.id),
      );
      return { filteredItems: filtered };
    }),
}));

export default useSearchStore;
