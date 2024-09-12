/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./ListAllOrders.module.css";
import useOrderStore from "../../globalState/orderStore";

function Order({
  order,
  setEditingOrderId,
  handleSelectOrder,
  selectedOrderId,
}) {
  const deleteOrder = useOrderStore((state) => state.deleteOrder);
  const navigate = useNavigate();

  const isSelected = selectedOrderId === order.orderId;

  const formattedDate = order.startDate
    ? new Date(order.startDate).toLocaleDateString("en-US")
    : "No Date";

  const handleSelect = () => {
    handleSelectOrder(order.orderId); // Toggle selection
    if (selectedOrderId !== order.orderId) {
      navigate(`/orderDetail/${order.orderId}`);
    } else {
      navigate(`/allOrders`); // Deselect by navigating to a general orders page
    }
  };

  const startEditing = (orderId) => {
    setEditingOrderId(orderId);
  };

  return (
    <div className={styles.gridRow}>
      <div
        onClick={handleSelect}
        className={`${styles.gridCell} ${styles.clickable} ${
          isSelected ? styles.active : ""
        }`}
      >
        {order.customerInfo} - {order.orderId} - Sum:{" "}
        {order.totalPrice.toFixed(2)}€
      </div>
      <div>{formattedDate}</div>
      <button
        onClick={() => startEditing(order.orderId)}
        disabled={!isSelected}
      >
        edit
      </button>
      <button onClick={() => deleteOrder(order.orderId)}>x</button>
    </div>
  );
}

export default Order;
