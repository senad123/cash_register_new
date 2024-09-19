/* eslint-disable react/prop-types */
// File path: src/components/OrderSummaryComponent.js

import useOrderStore from "../globalState/orderStore";
import styles from "./OrderSummaryComponent.module.css";

function OrderSummaryComponent({ totalPrice, totalPDV }) {
  //Tip
  const tip = useOrderStore((state) => state.tip);
  const setTip = useOrderStore((state) => state.setTip);

  return (
    <div className={styles.totalPrice}>
      <p>Total Price: {totalPrice.toFixed(2)}€</p>
      <p>Total PDV (19%): {totalPDV.toFixed(2)}€</p>
      <p>
        Total with PDV and Tip:{" "}
        {(totalPrice + totalPDV + Number(tip)).toFixed(2)}€
      </p>
      <div>
        <label>Tip:</label>
        <input
          type="number"
          value={tip}
          onChange={(e) => setTip(Number(e.target.value))}
        />
        €
      </div>
    </div>
  );
}

export default OrderSummaryComponent;
