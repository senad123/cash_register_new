/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// File path: src/components/CreateNewOrder.js
import { useEffect, useState } from "react";

import useOrderStore from "../../globalState/orderStore";
import useItemStore from "../../globalState/itemStore";
import useSearchStore from "../../globalState/searchStore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import GenerateOrderId from "../helper/GenerateOrderId";
import FilterComponent from "../../components/FilterComponent";
import SelectedItemsComponent from "../../components/SelectedItemsComponent";
import OrderSummaryComponent from "../../components/OrderSummaryComponent";

import styles from "./CreateNewOrder.module.css";

function CreateNewOrder({ orderToEdit, onFormSubmit }) {
  //OrderStore
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const tip = useOrderStore((state) => state.tip);
  const setTip = useOrderStore((state) => state.setTip);

  const orderItems = useOrderStore((state) => state.orderItems); // Global order items
  const setOrderItems = useOrderStore((state) => state.setOrderItems); // Action to update items

  const selectedQuantity = useOrderStore((state) => state.selectedQuantity); // Global selectedQuantity
  const setSelectedQuantity = useOrderStore(
    (state) => state.setSelectedQuantity,
  ); // Action to update selectedQuantity
  //const [selectedQuantity, setSelectedQuantity] = useState(1);

  const setSelectedItem = useOrderStore((state) => state.setSelectedItem);

  // //ItemStore
  // const items = useItemStore((state) => state.items); // List of items

  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [customerInfo, setCustomerInfo] = useState(
    orderToEdit?.customerInfo || "",
  );

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );
  const totalPDV = totalPrice * 0.19;

  useEffect(() => {
    if (orderToEdit) {
      setOrderItems(orderToEdit.orderItems || []); // Update global order items
      setCustomerInfo(orderToEdit.customerInfo || "");
      setTip(orderToEdit.tip || 0);
      setStartDate(new Date(orderToEdit.startDate || new Date()));
    }
  }, [orderToEdit, setTip, setOrderItems]);

  // // Initialize items in the search store when the component mounts
  // useEffect(() => {
  //   initializeItems(items);
  // }, [items, initializeItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customerInfo,
      orderItems,
      startDate,
      tip,
      totalPrice: totalPrice + totalPDV + Number(tip),
    };

    if (orderToEdit) {
      updateOrder({ ...orderToEdit, ...orderData });
    } else {
      const orderId = GenerateOrderId();
      createNewOrder({ ...orderData, orderId });
    }
    resetForm();
    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  const resetForm = () => {
    setCustomerInfo("");
    setOrderItems([]);
    setTip(0);
    setStartDate(new Date());
    setSelectedItem(null);
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity = value;
    setOrderItems(updatedItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <FilterComponent
            showQuantityInput={showQuantityInput}
            setShowQuantityInput={setShowQuantityInput}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
          />
        </div>
        <div className={styles.rightSection}>
          <div>
            <label>Customer Info: </label>
            <input
              placeholder="Customer"
              value={customerInfo}
              onChange={(e) => setCustomerInfo(e.target.value)}
            />
          </div>
          <div>
            <label>Date order:</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <SelectedItemsComponent handleQuantityChange={handleQuantityChange} />

          <OrderSummaryComponent
            totalPrice={totalPrice}
            totalPDV={totalPDV}
            tip={tip}
            setTip={setTip}
          />
          <div>
            <button type="submit" className={styles.button}>
              {orderToEdit ? "Update Order" : "Save Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateNewOrder;
