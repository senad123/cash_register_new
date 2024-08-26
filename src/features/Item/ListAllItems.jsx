import { useEffect, useState } from "react";
import Item from "./Item";
import CreateNewItem from "./CreateNewItem";

function ListAllItems() {
  const initialItems = [
    { id: 1, itemName: "Banana", unitPrice: 7, type: "food" },
    { id: 2, itemName: "Apple", unitPrice: 20, type: "food" },
    { id: 3, itemName: "Orange", unitPrice: 4, type: "food" },
    { id: 4, itemName: "Pear", unitPrice: 4, type: "food" },
    { id: 5, itemName: "Espresso", unitPrice: 4, type: "drink" },
  ];
  const savedItemList = localStorage.getItem("itemList");
  console.log(savedItemList);

  const [itemList, setItemList] = useState(() =>
    savedItemList ? JSON.parse(savedItemList) : initialItems,
  );
  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }, [itemList]);

  const handleDelete = (id) => {
    setShow(false);
    setItemList((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow((show) => !show);
  }

  return (
    <div>
      list of all available itemsdd
      <ul>
        {itemList.map((item) => (
          <Item item={item} key={item.id} onDelete={handleDelete} />
        ))}
      </ul>
      {show && <CreateNewItem setItemList={setItemList} />}
      <button onClick={handleShow}>{!show ? "AddNewItem" : "Close"}</button>
    </div>
  );
}

export default ListAllItems;
