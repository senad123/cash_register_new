/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useOrderStore from "../../globalState/orderStore";
import useItemStore from "../../globalState/itemStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GenerateOrderId from "../helper/GenerateOrderId";
import UpdateQuantity from "./UpdateQuantity";

function CreateNewOrder({ orderToEdit, onFormSubmit }) {
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  const items = useItemStore((state) => state.items);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { register, handleSubmit, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        customerInfo: orderToEdit?.customerInfo || "",
        tip: orderToEdit?.tip || 0,
        startDate: orderToEdit?.startDate
          ? new Date(orderToEdit.startDate)
          : new Date(),
        orderItems: orderToEdit?.orderItems || [],
      },
    });

  const orderItems = getValues("orderItems");
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );
  const totalPDV = totalPrice * 0.19;

  useEffect(() => {
    if (orderToEdit) {
      reset({
        customerInfo: orderToEdit.customerInfo,
        tip: orderToEdit.tip || 0,
        startDate: new Date(orderToEdit.startDate || new Date()),
        orderItems: orderToEdit.orderItems || [],
      });
    }
  }, [orderToEdit, reset]);

  const onSubmit = (data) => {
    const orderData = {
      ...data,
      totalPrice: totalPrice + totalPDV + Number(data.tip),
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
    reset({
      customerInfo: "",
      tip: 0,
      startDate: new Date(),
      orderItems: [],
    });
    setSearchTerm("");
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    const currentOrderItems = getValues("orderItems");
    if (selectedItem) {
      const newItem = {
        ...selectedItem,
        quantity: selectedQuantity,
      };
      setValue("orderItems", [...currentOrderItems, newItem]);
      setSelectedItem(null);
      setSearchTerm("");
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
        !getValues("orderItems").some((orderItem) => orderItem.id === item.id),
    );
    setFilteredItems(filtered);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setShowQuantityInput(true);
  };

  const handleRemoveItem = (index) => {
    const currentOrderItems = getValues("orderItems");
    currentOrderItems.splice(index, 1);
    setValue("orderItems", [...currentOrderItems]);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const currentOrderItems = getValues("orderItems");
    currentOrderItems[index].quantity = newQuantity;
    setValue("orderItems", [...currentOrderItems]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Customer Info: </label>
        <input placeholder="Customer" {...register("customerInfo")} />
      </div>

      <div>
        <label>Date ordersss:</label>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
            />
          )}
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
              currentQuantity={selectedQuantity}
              setQuantity={setSelectedQuantity}
              inputStyle={{ width: "60px" }}
              buttonStyle={{ padding: "5px" }}
              buttonLabels={{ increment: "➕", decrement: "➖" }}
            />
            <button type="button" onClick={() => setSelectedItem(null)}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddItem}
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
            <div>
              <span>{item.itemName} - </span>

              {/* <UpdateQuantity
                currentQuantity={item.quantity}
                setQuantity={(newQuantity) =>
                  handleQuantityChange(index, newQuantity)
                }
                inputStyle={{ width: "60px" }}
                buttonStyle={{ padding: "5px" }}
                buttonLabels={{ increment: "➕", decrement: "➖" }}
              /> */}

              <UpdateQuantity
                currentQuantity={item.quantity}
                setQuantity={setSelectedQuantity}
                inputStyle={{ width: "60px" }}
                buttonStyle={{ padding: "5px" }}
                buttonLabels={{ increment: "➕", decrement: "➖" }}
              />
              <span>
                {" "}
                - {item.unitPrice}€ - {item.quantity * item.unitPrice}€{" "}
              </span>
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p>Total Price: {totalPrice.toFixed(2)}€</p>
        <p>Total PDV (19%): {totalPDV.toFixed(2)}€</p>
        <p>
          Total with PDV and Tip:{" "}
          {(totalPrice + totalPDV + Number(getValues("tip"))).toFixed(2)}€
        </p>
        <div>
          <label>Tip:</label>
          <input type="number" {...register("tip")} />€
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
