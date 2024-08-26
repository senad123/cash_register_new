import { useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem";

function ListAllItems() {
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow((show) => !show);
  }

  const initialItems = [
    { id: 1, itemName: "Banana", unitPrice: 7, type: "food" },
    { id: 2, itemName: "Apple", unitPrice: 20, type: "food" },
    { id: 3, itemName: "Orange", unitPrice: 4, type: "food" },
    { id: 4, itemName: "Pear", unitPrice: 4, type: "food" },
    { id: 5, itemName: "Espresso", unitPrice: 4, type: "drink" },
  ];

  return (
    <div>
      list of all available itemsdd
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
      {show && <CreateNewItem />}
      <button onClick={handleShow}>{show ? "AddNewItem" : "Close"}</button>
    </div>
  );
}

export default ListAllItems;
