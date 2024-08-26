import { useForm } from "react-hook-form";

function CreateNewItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
