/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useOrderStore from "../../globalState/orderStore";
import useItemStore from "../../globalState/itemStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GenerateOrderId from "../helper/GenerateOrderId";
import UpdateQuantity from "./UpdateQuantity";
//import Button from "../../ui/Button";

function CreateNewOrder({ orderToEdit, onFormSubmit }) {
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const items = useItemStore((state) => state.items);

  const getCurrentQuantityById = useOrderStore(
    (state) => state.getCurrentQuantityById,
  );

  console.log(getCurrentQuantityById);

  const tip = useOrderStore((state) => state.tip);
  const setTip = useOrderStore((state) => state.setTip);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [orderToEdit, setTip]);

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
    setSearchTerm("");
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      setOrderItems([
        ...orderItems,
        { ...selectedItem, quantity: selectedQuantity },
      ]);
      setSelectedItem(null); // Clear selected item after adding
      setSearchTerm(""); // Clear search input
      setSelectedQuantity(1);
      setShowQuantityInput(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchValue) &&
        !orderItems.some((orderItem) => orderItem.id === item.id),
    );
    setFilteredItems(filtered);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm(""); // Clear search input after selection
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

      <div>
        <h3>Add Article</h3>

        <input
          placeholder="search"
          value={searchTerm}
          onChange={handleSearch}
        />

        {searchTerm && filteredItems.length > 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              maxHeight: "150px",
              maxWidth: "500px",
              overflowY: "auto",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: orderItems.some(
                    (orderItem) => orderItem.id === item.id,
                  )
                    ? "#e0e0e0"
                    : "#fff",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {item.itemName} - {item.unitPrice} €
              </div>
            ))}
          </div>
        )}

        {showQuantityInput && selectedItem && (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <div style={{ marginRight: "10px" }}>
              {selectedItem.itemName} - {selectedItem.unitPrice}€
            </div>
            <UpdateQuantity
              orderToEdit={orderToEdit}
              selectedItem={selectedItem}
              setSelectedQuantity={setSelectedQuantity}
              selectedQuantity={selectedQuantity}
            />
            <button type="button" onClick={() => setSelectedItem("")}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddItem} // Add item to the order
              style={{ marginRight: "10px" }}
            >
              Add Item
            </button>
          </div>
        )}
      </div>

      <div>
        <p>Selected Items</p>
        {orderItems.map((item, index) => (
          <div key={item.id}>
            <p>
              {item.itemName} -
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
              />
              - {item.unitPrice}€ - {item.quantity * item.unitPrice}€
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </p>
          </div>
        ))}
      </div>

      <div>
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

      <div>
        <button type="submit">
          {orderToEdit ? "Update Order" : "Save Order"}
        </button>
      </div>
    </form>
  );
}

export default CreateNewOrder;
