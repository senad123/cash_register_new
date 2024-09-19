/* eslint-disable react/prop-types */
import { useEffect } from "react";
import UpdateQuantity from "./UpdateQuantity";
import styles from "./SearchComponent.module.css";
import useSearchStore from "../globalState/searchStore"; // Import the search store

function SearchComponent({
  items,
  orderItems,
  handleSelectItem,
  handleAddItem,
  showQuantityInput,
  selectedItem,
  setSelectedItem,
  setShowQuantityInput,
  selectedQuantity,
  setSelectedQuantity,
}) {
  const { searchTerm, setSearchTerm, filterItems, filteredItems } =
    useSearchStore();

  // Handle search input and update the search term state
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue); // Update search term in store
    filterItems(items, orderItems); // Filter items based on search term
  };

  useEffect(() => {
    filterItems(items, orderItems); // Ensure items are filtered when the component renders
  }, [items, orderItems, filterItems]);

  // Updated handleAddItem to reset the search input after adding an item
  const handleAddItemAndReset = () => {
    handleAddItem(); // Add the item to the order
    setSearchTerm(""); // Reset the search input after item is added
    setSelectedItem(null); // Reset the selection
    setShowQuantityInput(false); // Hide the quantity input
  };

  return (
    <div>
      <h3>Add Article</h3>
      <input
        placeholder="Search for items"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      {/* Display the list of items or filtered items */}
      {!showQuantityInput && (
        <div className={styles.filteredItems}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isDisabled = orderItems?.some(
                (orderItem) => orderItem.id === item.id,
              );
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`${styles.filteredItem} ${
                    isDisabled ? styles.filteredItemDisabled : ""
                  }`}
                  style={{ pointerEvents: isDisabled ? "none" : "auto" }}
                >
                  <span>{item.itemName}</span>
                  <span className={styles.itemPrice}>{item.unitPrice} €</span>
                  {isDisabled && <span> (Already Added)</span>}
                </div>
              );
            })
          ) : (
            <div>No items found</div>
          )}
        </div>
      )}

      {/* Show quantity input if an item is selected */}
      {showQuantityInput && selectedItem && (
        <div className={styles.quantityInputSection}>
          <div>
            {selectedItem.itemName} - {selectedItem.unitPrice} €
          </div>
          <UpdateQuantity
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
          />
          <button
            type="button"
            onClick={() => {
              setSelectedItem(null); // Reset the selection
              setShowQuantityInput(false); // Go back to item list
            }}
            className={styles.button}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddItemAndReset} // Updated to handle reset after adding item
            className={styles.button}
          >
            Add Item
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
