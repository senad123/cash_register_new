/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useItemStore from "../../globalState/itemStore";
import { useEffect } from "react";

function CreateNewItem({ item = null, setShow }) {
  const addNewItem = useItemStore((state) => state.addNewItem);
  const updateItem = useItemStore((state) => state.updateItem);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Pre-fill form if we are editing an existing item
  useEffect(() => {
    if (item) {
      setValue("itemName", item.itemName);
      setValue("unitPrice", item.unitPrice);
      setValue("type", item.type);
    }
  }, [item, setValue]);

  function onSubmit(data) {
    if (item) {
      // Editing existing item
      const updatedItem = {
        ...item,
        itemName: data.itemName,
        unitPrice: data.unitPrice,
        type: data.type,
      };
      updateItem(updatedItem); // Pass the updated item directly to updateItem
    } else {
      // Creating a new item
      const ranNum = Math.floor(Math.random() * 1000);
      const random = ranNum + "";

      const newItem = {
        id: random,
        itemName: data.itemName,
        unitPrice: data.unitPrice,
        type: data.type,
      };
      addNewItem(newItem); // Add the new item
    }

    reset(); // Reset the form fields after submission
    setShow(false); // Close the form after adding or updating the item
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="itemName"
        id="itemName"
        {...register("itemName", { required: true })}
      />
      <input
        placeholder="unitPrice"
        id="unitPrice"
        {...register("unitPrice", { required: true })}
      />
      <select name="" id="type" {...register("type")}>
        <option>food</option>
        <option>drink</option>
      </select>

      {errors.exampleRequired && <span>This field is required</span>}

      <button type="submit">{item ? "Update Item" : "Add Item"}</button>
    </form>
  );
}

export default CreateNewItem;
