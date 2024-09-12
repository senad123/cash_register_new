/* eslint-disable no-unused-vars */
import ListAllOrders from "../features/order/ListAllOrders";
import Details from "../features/order/Details";

import styles from "./OrderLayout.module.css";

function OrderLaout() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <ListAllOrders className={styles.item} />
      </div>
      <div className={styles.item}>
        <Details className={styles.item} />
      </div>
    </div>
  );
}

export default OrderLaout;
