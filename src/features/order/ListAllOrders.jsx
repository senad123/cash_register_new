/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import useOrderStore from "../../globalState/orderStore";

const initiaOrders = [
  {
    orderId: 1,
    customerInfo: "Superman",
    selecteedItems: [
      {
        itemId: 1,
        itemName: "Banana",
        unitPrice: 2,
        quantity: 2,
      },
      {
        itemId: 2,
        itemName: "Apple",
        unitPrice: 5,
        quantity: 3,
      },
    ],
    totalPrice: 10,
    totalPDV: 1,
  },
  {
    orderId: 2,
    customerInfo: "Batman",
    selecteedItems: [
      {
        itemId: 4,
        itemName: "Espresso",
        unitPrice: 2,
        quantity: 3,
      },
      {
        itemId: 3,
        itemName: "Orange",
        unitPrice: 6,
        quantity: 3,
      },
    ],
    totalPrice: 10,
    totalPDV: 1,
  },
];

function ListAllOrders() {
  const deleteOrder = useOrderStore((state) => state.deleteOrder);

  return <div>{initiaOrders.map((order) => order.customerInfo)}</div>;
}

export default ListAllOrders;
