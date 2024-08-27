import { useState } from "react";
import EditItem from "./EditItem";
import useItemStore from "../../globalState/itemStore";

/* eslint-disable react/prop-types */
function Item({ item }) {
  const removeItem = useItemStore((state) => state.removeItem);

  const [show, setShow] = useState(false);
  const handleDelete = () => {
    setShow(false);
    removeItem(item.id);
  };

  return (
    <>
      <li>
        {item.id} {item.itemName} {item.unitPrice} {item.type}{" "}
        <button onClick={() => setShow(!show)}>✏️</button>
        {show && <EditItem itemId={item.id} />}
        <button onClick={handleDelete}>❌</button>
      </li>
    </>
  );
}

export default Item;
