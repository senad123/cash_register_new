/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

function CreateNewItem({ setItemList }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const ranNum = Math.floor(Math.random() * 1000);
    const random = ranNum + "";

    const newItem = {
      id: random,
      itemName: data.itemName,
      unitPrice: data.unitPrice,
      type: data.type,
    };
    console.log(newItem);

    setItemList((prevItems) => [...prevItems, newItem]);
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

      <button>AddItem</button>
    </form>
  );
}

export default CreateNewItem;
