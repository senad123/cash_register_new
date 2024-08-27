/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useOrderStore from "../../globalState/orderStore";
import useItemStore from "../../globalState/itemStore";
import { useFieldArray, useForm } from "react-hook-form";

function CreateNewOrder() {
  const createNewOrder = useOrderStore((state) => state.createNewOrder);
  const items = useItemStore((state) => state.items);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuantityInput, setShowQuantityInput] = useState(true);
  const [tip, setTip] = useState(0); // Tip state

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    resetField,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      orderItems: [],
    },
  });

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

  useEffect(() => {
    setValue("totalPrice", totalPrice + totalPDV + Number(tip));
  }, [totalPrice, totalPDV, tip, setValue]);

  function onSubmit(data) {
    createNewOrder(data);

    console.log(data);
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
    setTip(e.target.value); // Update tip amount
  }

  const selectedItem = getValues("selectedItem");
  const isItemAddedToList = fields.length > 0;
  if (selectedItem) {
    var obj = JSON.parse(selectedItem);
  }
  const check = obj?.itemName == addedItems;

  console.log("selectedItem ", obj?.itemName);

  console.log("addedItem ", addedItems);
  console.log(check);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Customer Info</label>
      <input
        placeholder="Customer"
        id="customerInfo"
        {...register("customerInfo")}
      />
      <p>Date</p>
      <div>
        <h3>Add Article</h3>

        <input
          placeholder="search"
          id="search"
          {...register("search")}
          onChange={handleSearch}
        />

        {searchTerm && filteredItems.length > 0 && (
          <ul
            style={{
              border: "1px solid #ccc",
              maxHeight: "150px",
              overflowY: "auto",
              padding: "0",
              margin: "0",
              listStyle: "none",
            }}
          >
            {filteredItems.map((item) => (
              <li
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
                <span
                  style={{
                    color: addedItems.includes(item.id) ? "gray" : "black",
                  }}
                >
                  {item.itemName}
                </span>
              </li>
            ))}
          </ul>
        )}

        <input type="hidden" id="selectedItem" {...register("selectedItem")} />
        {selectedItem && showQuantityInput && (
          <div>
            <button type="button">-</button>
            <input
              type="number"
              id="selectedQuantity"
              defaultValue={1}
              min={1}
              {...register("selectedQuantity", { valueAsNumber: true })}
              placeholder="quantity"
            />
            <button type="button">+</button>

            <button disabled={check} type="button" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        )}
      </div>
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
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
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

      <button disabled={!isItemAddedToList} type="submit">
        Save Order
      </button>
    </form>
  );
}

export default CreateNewOrder;
