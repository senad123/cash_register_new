/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem";

import useItemStore from "../../globalState/itemStore";

function ListAllItems() {
  //zustand
  const items = useItemStore((state) => state.items);

  //ShowEdit
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow((show) => !show);
  }

  return (
    <div>
      list of all available itemsdd
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
      {show && <CreateNewItem />}
      <button onClick={handleShow}>{!show ? "AddNewItem" : "Close"}</button>
    </div>
  );
}

export default ListAllItems;
