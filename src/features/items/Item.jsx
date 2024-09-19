import { useState } from "react";
import CreateNewItem from "./CreateNewItem";
import useItemStore from "../../globalState/itemStore";

/* eslint-disable react/prop-types */
function Item({ item }) {
  const removeItem = useItemStore((state) => state.removeItem);
  const [show, setShow] = useState(false); // Manage form visibility

  const handleDelete = () => {
    setShow(false);
    removeItem(item.id);
  };

  return (
    <>
      <li>
        {item.id} - {item.itemName} {item.unitPrice}€ - {item.type}{" "}
        <button onClick={() => setShow(!show)}>✏️</button>
        {show && (
          <CreateNewItem
            item={item} // Pass the item to be edited
            setShow={setShow} // Control form visibility
          />
        )}
        <button onClick={handleDelete}>❌</button>
      </li>
    </>
  );
}

export default Item;
