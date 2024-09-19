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
import SearchComponent from "../../components/SearchComponent";
import SelectedItemsComponent from "../../components/SelectedItemsComponent";
import OrderSummaryComponent from "../../components/OrderSummaryComponent";

import styles from "./CreateNewOrder.module.css";

function CreateNewOrder({ orderToEdit, onFormSubmit }) {
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const tip = useOrderStore((state) => state.tip);
  const setTip = useOrderStore((state) => state.setTip);

  //OrderStore
  // const orderItems = useOrderStore((state) => state.orderItems); // Global order items
  // const setOrderItems = useOrderStore((state) => state.setOrderItems); // Action to update items

  //ItemStore
  const items = useItemStore((state) => state.items); // List of items

  //SEARCH STORE
  const initializeItems = useSearchStore((state) => state.initializeItems);
  // const { initializeItems } = useSearchStore(); // Initialize the search store

  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [orderItems, setOrderItems] = useState(orderToEdit?.orderItems || []);
  const [customerInfo, setCustomerInfo] = useState(
    orderToEdit?.customerInfo || "",
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );
  const totalPDV = totalPrice * 0.19;

  useEffect(() => {
    if (orderToEdit) {
      setOrderItems(orderToEdit.orderItems || []);
      setCustomerInfo(orderToEdit.customerInfo || "");
      setTip(orderToEdit.tip || 0);
      setStartDate(new Date(orderToEdit.startDate || new Date()));
    }
  }, [orderToEdit, setTip, setOrderItems]);

  // Initialize items in the search store when the component mounts
  useEffect(() => {
    initializeItems(items);
  }, [items, initializeItems]);

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

  const handleAddItem = () => {
    if (selectedItem) {
      setOrderItems([
        ...orderItems,
        { ...selectedItem, quantity: selectedQuantity },
      ]);
      setSelectedItem(null);
      setSelectedQuantity(1);
      setShowQuantityInput(false);
      initializeItems;
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setShowQuantityInput(true);
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity = value;
    setOrderItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <SearchComponent
            items={items}
            orderItems={orderItems}
            handleSelectItem={handleSelectItem}
            handleAddItem={handleAddItem}
            showQuantityInput={showQuantityInput}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
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
          <SelectedItemsComponent
            orderItems={orderItems}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
          />
          {/* <SelectedItemsComponent
            orderItems={orderItems}
            setOrderItems={setOrderItems}
          /> */}

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
