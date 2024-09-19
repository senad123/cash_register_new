/* eslint-disable react/prop-types */
// File path: src/components/UpdateQuantity.js

import useOrderStore from "../globalState/orderStore";
import styles from "./UpdateQuantity.module.css";

function UpdateQuantity() {
  const selectedQuantity = useOrderStore((state) => state.selectedQuantity); // Global selectedQuantity
  const setSelectedQuantity = useOrderStore(
    (state) => state.setSelectedQuantity,
  );

  // Safeguard: Ensure selectedQuantity is always a valid number (fallback to 1 if undefined or NaN)
  const validSelectedQuantity = Number.isNaN(selectedQuantity)
    ? 1
    : selectedQuantity;

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    // Ensure value is a number and greater than or equal to 1
    if (!isNaN(value) && value >= 1) {
      setSelectedQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    setSelectedQuantity(validSelectedQuantity + 1);
  };

  // Decrement quantity but ensure it doesn't go below 1
  const decrementQuantity = () => {
    if (validSelectedQuantity > 1) {
      setSelectedQuantity(validSelectedQuantity - 1);
    }
  };
  return (
    <div className={styles.quantityContainer}>
      <button
        type="button"
        onClick={decrementQuantity}
        className={styles.quantityButton}
      >
        -
      </button>
      <input
        type="number"
        value={validSelectedQuantity}
        onChange={handleQuantityChange}
        className={styles.quantityInput}
        min="1"
      />
      <button
        type="button"
        onClick={incrementQuantity}
        className={styles.quantityButton}
      >
        +
      </button>
    </div>
  );
}

export default UpdateQuantity;
