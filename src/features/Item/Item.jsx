import { useState } from "react";
import EditItem from "./EditItem";

/* eslint-disable react/prop-types */
function Item({ item, onDelete }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <li>
        {item.id} {item.itemName} {item.unitPrice} {item.type}{" "}
        <button onClick={() => setShow(!show)}>✏️</button>
        {show && <EditItem itemId={item.id} />}
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    </>
  );
}

export default Item;
