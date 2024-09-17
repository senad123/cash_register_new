/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateQuantity from "./UpdateQuantity";
import { useOrderContext } from "../../globalState/OrderContext_NotInUse"; // Adjust the path as necessary

import styles from "./CreateNewOrder.module.css";

function LeftSection({ items, orderToEdit }) {
  const {
    searchTerm,
    setSearchTerm,
    showQuantityInput,
    setShowQuantityInput,
    orderItems,
    setOrderItems,
    selectedItem,
    setSelectedItem,
    selectedQuantity,
    setSelectedQuantity,
    handleSearch,
    handleSelectItem,
    handleAddItem,
  } = useOrderContext();

  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchWrapper = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilteredItems(handleSearch(items, searchValue));
  };

  return (
    <div className={styles.leftSection}>
      <h3>Add Article</h3>
      <input
        placeholder="Search for items"
        value={searchTerm}
        onChange={handleSearchWrapper}
        className={styles.searchInput}
      />
      {!showQuantityInput && (
        <div className={styles.filteredItems}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isDisabled = orderItems.some(
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
                  {item.itemName} - {item.unitPrice} €
                  {isDisabled && <span> (Already Added)</span>}
                </div>
              );
            })
          ) : (
            <div>No items found</div>
          )}
        </div>
      )}
      {showQuantityInput && selectedItem && (
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <div style={{ marginRight: "10px" }}>
            {selectedItem.itemName} - {selectedItem.unitPrice}€
          </div>
          <UpdateQuantity
            orderToEdit={orderToEdit}
            selectedItem={selectedItem}
            setSelectedQuantity={setSelectedQuantity}
            selectedQuantity={selectedQuantity}
          />
          <button
            type="button"
            onClick={() => {
              setSelectedItem(null);
              setShowQuantityInput(false);
            }}
            className={styles.button}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddItem}
            className={styles.button}
          >
            Add Item
          </button>
        </div>
      )}
    </div>
  );
}

export default LeftSection;
