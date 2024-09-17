/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [orderItems, setOrderItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleSearch = (items, searchValue) => {
    setSearchTerm(searchValue);
    return items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchValue) &&
        !orderItems.some((orderItem) => orderItem.id === item.id),
    );
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setShowQuantityInput(true);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      setOrderItems([
        ...orderItems,
        { ...selectedItem, quantity: selectedQuantity },
      ]);
      setSelectedItem(null);
      setSearchTerm("");
      setSelectedQuantity(1);
      setShowQuantityInput(false);
    }
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

  const resetForm = () => {
    setCustomerInfo("");
    setOrderItems([]);
    setTip(0);
    setStartDate(new Date());
    setSearchTerm("");
    setSelectedItem(null);
  };

  const value = {
    searchTerm,
    setSearchTerm,
    showQuantityInput,
    setShowQuantityInput,
    startDate,
    setStartDate,
    orderItems,
    setOrderItems,
    customerInfo,
    setCustomerInfo,
    selectedItem,
    setSelectedItem,
    selectedQuantity,
    setSelectedQuantity,
    handleSearch,
    handleSelectItem,
    handleAddItem,
    handleQuantityChange,
    handleRemoveItem,
    resetForm,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
