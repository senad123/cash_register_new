/* eslint-disable react/prop-types */
import CreateNewOrder from "./CreateNewOrder";
import useOrderStore from "../../globalState/orderStore";

function EditOrder({ orderId }) {
  const orderToEdit = useOrderStore((state) =>
    state.orders.find((order) => order.orderId === orderId),
  );

  return (
    <div>
      <h2>Edit Order</h2>
      <CreateNewOrder orderToEdit={orderToEdit} />
    </div>
  );
}

export default EditOrder;
