/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useOrderStore from "../../globalState/orderStore";
import useItemStore from "../../globalState/itemStore";
import { useFieldArray, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import GenerateOrderId from "../helper/GenerateOrderId";

function CreateNewOrder({ orderToEdit, onFormSubmit }) {
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const items = useItemStore((state) => state.items);

  const incrementQuantity = useOrderStore((state) => state.incrementQuantity);
  const decrementQuantity = useOrderStore((state) => state.decrementQuantity);
  const orders = useOrderStore((state) => state.orders);

  const tip = useOrderStore((state) => state.tip); // Get tip from Zustand
  const setTip = useOrderStore((state) => state.setTip); // Action to update tip in Zustand

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuantityInput, setShowQuantityInput] = useState(true);

  const [startDate, setStartDate] = useState(new Date()); // Initialize startDate to current date
  // format(startDate, "dd/MM/yyy");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    resetField,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      orderItems: [],
      customerInfo: "",
      tip, // Initialize with the Zustand tip value
      ...orderToEdit, // Spread order data if editing
    },
  });

  const customerInfo = watch("customerInfo");

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "orderItems",
  });

  const addedItems = fields.map((field) => field.itemName);

  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited

  const totalPrice = fields.reduce((total, field) => {
    return total + field.quantity * field.unitPrice;
  }, 0);

  const totalPDV = totalPrice * 0.19;

  // Function to find the current item based on Zustand state and item ID
  useEffect(() => {
    if (orderToEdit) {
      const selectedItemId = JSON.parse(getValues("selectedItem")).id;
      const order = orders.find((o) => o.orderId === orderToEdit.orderId);
      if (order) {
        const item = order.orderItems.find((i) => i.id === selectedItemId);
        if (item) setCurrentOrderItem(item); // Bind the item to local state
      }
    }
  }, [getValues, orderToEdit, orders]);

  useEffect(() => {
    setValue("totalPrice", totalPrice + totalPDV + Number(tip));
  }, [totalPrice, totalPDV, tip, setValue]);

  useEffect(() => {
    if (orderToEdit) {
      setValue("orderItems", orderToEdit.orderItems || []);
      setValue("customerInfo", orderToEdit.customerInfo || "");
      setValue("tip", orderToEdit.tip || 0);
      setTip(orderToEdit.tip || 0); // Update the Zustand tip state
      setStartDate(new Date(orderToEdit.startDate || new Date())); // Initialize startDate with the order date if editing
    }
  }, [orderToEdit, setValue, setTip]);

  function onSubmit(data) {
    const orderData = {
      ...data,
      startDate, // Add the selected startDate to the submitted order data
    };

    if (orderToEdit) {
      updateOrder({ ...orderToEdit, ...orderData });
    } else {
      const orderId = GenerateOrderId();
      setValue("orderId", orderId);
      orderData.orderId = orderId;
      createNewOrder(orderData);
    }

    reset(); // Reset form fields
    setStartDate(new Date()); // Reset startDate to the current date

    if (onFormSubmit) {
      onFormSubmit();
    }
  }

  function handleAddItem() {
    const selectedItem = JSON.parse(getValues("selectedItem"));
    append({ ...selectedItem, quantity: getValues().selectedQuantity });
    setShowQuantityInput(false);
    resetField("search");
    resetField("selectedItem");
  }

  function handleQuantityChange(index, value) {
    setValue(`orderItems.${index}.quantity`, value);
    update(index, { ...fields[index], quantity: value });
  }

  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchTerm) &&
        !addedItems.includes(item.id),
    );
    setFilteredItems(filtered);
  }

  function handleSelectItem(item) {
    if (addedItems.includes(item.id)) {
      return;
    }
    setValue("search", item.itemName);
    setValue("selectedItem", JSON.stringify(item));
    setSearchTerm("");
    setFilteredItems([]);
    setShowQuantityInput(true);
  }

  function handleEdit(index) {
    setEditIndex(index); // Set the index of the item being edited
  }
  function handleUpdate(index) {
    setEditIndex(null); // Revert back to display mode
  }
  function handleTipChange(e) {
    const newTip = e.target.value;
    setTip(newTip); // Update the tip in Zustand
    setValue("tip", newTip); // Update the form value
  }

  const selectedItem = getValues("selectedItem");

  if (selectedItem) {
    var obj = JSON.parse(selectedItem);
  }
  const isItemAddedToList = obj?.itemName == addedItems;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Customer Info: </label>
        <input
          placeholder="Customer"
          id="customerInfo"
          value={customerInfo}
          onChange={(e) => setValue("customerInfo", e.target.value)}
          {...register("customerInfo")}
        />
      </div>

      <div>
        <label>Date order:</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)} // Update startDate on date change
          // Change to Date/Month/Year format
        />
      </div>

      <div>
        <h3>Add Article</h3>

        <input
          placeholder="search"
          id="search"
          {...register("search")}
          onChange={handleSearch}
        />

        {searchTerm && filteredItems.length > 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              maxHeight: "150px",
              maxWidth: "500px",
              overflowY: "auto",
              padding: "0",
              margin: "0",
              listStyle: "none",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                style={{
                  padding: "8px",
                  cursor: addedItems.includes(item.id)
                    ? "not-allowed"
                    : "pointer",
                  backgroundColor: addedItems.includes(item.id)
                    ? "#e0e0e0"
                    : "#fff",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    color: addedItems.includes(item.id) ? "gray" : "black",
                  }}
                >
                  {item.itemName} - {item.unitPrice} €
                </div>
              </div>
            ))}
          </div>
        )}

        <input type="hidden" id="selectedItem" {...register("selectedItem")} />

        {selectedItem && showQuantityInput && (
          <div>
            <button
              type="button"
              onClick={() => decrementQuantity(orderToEdit?.orderId, obj?.id)}
            >
              -
            </button>
            <input
              type="number"
              id="selectedQuantity"
              defaultValue={1}
              min={1}
              {...register("selectedQuantity", { valueAsNumber: true })}
              placeholder="quantity"
            />
            <button
              type="button"
              onClick={() => incrementQuantity(orderToEdit?.orderId, obj.id)}
            >
              +
            </button>
          </div>
        )}
        <button
          disabled={isItemAddedToList}
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div>
        <p>Selected Items</p>
        {fields.map((field, index) => (
          <div key={field.id}>
            <p>
              {field.itemName || "no name"} -
              {editIndex === index ? (
                <span>
                  <input
                    type="number"
                    {...register(`orderItems.${index}.quantity`)}
                    value={field.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                  <button type="button" onClick={() => handleUpdate(index)}>
                    Update
                  </button>
                </span>
              ) : (
                <span>{field.quantity}</span>
              )}{" "}
              - {field.unitPrice}€ - {field.quantity * field.unitPrice}€
            </p>

            <button type="button" onClick={() => handleEdit(index)}>
              Edit
            </button>
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
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
            placeholder="Tip"
            type="number"
            value={tip}
            onChange={handleTipChange}
          />
          €
        </div>
      </div>
      <div>
        <button disabled={isItemAddedToList} type="submit">
          {orderToEdit ? "Update Order" : "Save Order"}
        </button>
      </div>
    </form>
  );
}

export default CreateNewOrder;
