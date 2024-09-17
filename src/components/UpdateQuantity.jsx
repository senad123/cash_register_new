/* eslint-disable react/prop-types */
// File path: src/components/UpdateQuantity.js

import styles from "./UpdateQuantity.module.css";

function UpdateQuantity({ selectedQuantity, setSelectedQuantity }) {
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setSelectedQuantity(value);
    }
  };

  const incrementQuantity = () => setSelectedQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
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
        value={selectedQuantity}
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
