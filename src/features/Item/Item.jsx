import { useState } from "react";
import EditItem from "./EditItem";

/* eslint-disable react/prop-types */
function Item({ item, onDelete }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <li>
        {item.id} {item.itemName} {item.unitPrice} {item.type}{" "}
        <button onClick={() => setShow(!show)}>edit</button>
        {show && <EditItem itemId={item.id} />}
        <button onClick={() => onDelete(item.id)}>delete</button>
      </li>
    </>
  );
}

export default Item;
