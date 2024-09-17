/* eslint-disable react/prop-types */
// File path: src/components/SelectedItemsComponent.js

import styles from "./SelectedItemsComponent.module.css";

function SelectedItemsComponent({
  orderItems,
  handleQuantityChange,
  handleRemoveItem,
}) {
  return (
    <div>
      <h3>Selected Items</h3>
      {orderItems.length > 0 ? (
        <div className={styles.selectedItems}>
          {orderItems.map((item, index) => (
            <div key={item.id}>
              <p>
                {index + 1} {item.itemName} -
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, Number(e.target.value))
                  }
                  className={styles.quantityInput}
                />
                - {item.unitPrice}€ - {item.quantity * item.unitPrice}€
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className={styles.button}
                >
                  Remove
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No items selected</p>
      )}
    </div>
  );
}

export default SelectedItemsComponent;
