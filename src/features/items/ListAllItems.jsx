/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem";

import useItemStore from "../../globalState/itemStore";

function ListAllItems() {
  // Zustand store to get the list of items
  const items = useItemStore((state) => state.items);

  // State to control the visibility of the 'Add New Item' form
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow((show) => !show); // Toggle form visibility
  }

  return (
    <div>
      <h2>List of All Available Items</h2>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>

      {/* Show CreateNewItem form if 'show' is true */}
      {show && <CreateNewItem setShow={setShow} />}

      <button onClick={handleShow}>{!show ? "Add New Item" : "Close"}</button>
    </div>
  );
}

export default ListAllItems;
