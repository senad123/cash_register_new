import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditItem({ itemId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(update) {
    console.log(update);
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

export default EditItem;
