/* eslint-disable react/prop-types */
import useOrderStore from "../../globalState/orderStore";

function UpdateQuantity({
  orderToEdit,
  selectedItem,
  setSelectedQuantity,
  selectedQuantity,
}) {
  const incrementQuantity = useOrderStore((state) => state.incrementQuantity);
  const decrementQuantity = useOrderStore((state) => state.decrementQuantity);

  return (
    <div>
      <button
        type="button" // Prevent form submission
        onClick={() => {
          decrementQuantity(orderToEdit?.orderId, selectedItem?.id);
          setSelectedQuantity((prev) => Math.max(prev - 1, 1)); // Update local state
        }}
      >
        -
      </button>
      <input
        type="number"
        min={1}
        value={selectedQuantity} // Reflect current state
        onChange={(e) => setSelectedQuantity(Number(e.target.value))} // Update on change
        style={{ width: "50px", margin: "0 10px" }}
      />
      <button
        type="button" // Prevent form submission
        onClick={() => {
          incrementQuantity(orderToEdit?.orderId, selectedItem?.id);
          setSelectedQuantity((prev) => prev + 1); // Update local state
        }}
      >
        +
      </button>
    </div>
  );
}

export default UpdateQuantity;
