import { useState } from "react";
import useOrderStore from "../../globalState/orderStore";
import CreateNewOrder from "./CreateNewOrder";
import styles from "./ListAllOrders.module.css";
import Order from "./Order";

function ListAllOrders() {
  const listOfAllOrders = useOrderStore((state) => state.orders);

  const editingOrderId = useOrderStore((state) => state.editingOrderId);
  const setEditingOrderId = useOrderStore((state) => state.setEditingOrderId);
  const stopEditing = useOrderStore((state) => state.stopEditing);

  //const [editingOrderId, setEditingOrderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track selected order

  // const stopEditing = () => {
  //   setEditingOrderId(null);
  // };

  const orderToEdit = listOfAllOrders.find(
    (order) => order?.orderId === editingOrderId,
  );

  // Toggle the selection state of an order and close the edit form if another order is selected
  const handleSelectOrder = (orderId) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null); // Deselect if already selected
      setEditingOrderId(null); // Close edit form
    } else {
      setSelectedOrderId(orderId); // Select new order
      setEditingOrderId(null); // Close any open edit form
    }
  };

  return (
    <div>
      <div className={styles.grid}>
        <div className={styles.grid_header}>Order Info</div>
        <div className={styles.grid_header}>Date</div>
        <div className={styles.grid_header}>Edit</div>
        <div className={styles.grid_header}>Delete</div>
      </div>

      {listOfAllOrders.map((order) => (
        <Order
          key={order.orderId}
          order={order}
          setEditingOrderId={setEditingOrderId}
          handleSelectOrder={handleSelectOrder}
          selectedOrderId={selectedOrderId} // Pass selectedOrderId
        />
      ))}

      {editingOrderId && orderToEdit && (
        <div>
          <h2>Edit Order {orderToEdit.orderId}</h2>
          <CreateNewOrder
            orderToEdit={orderToEdit}
            onFormSubmit={stopEditing}
          />
          <button onClick={stopEditing}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ListAllOrders;
