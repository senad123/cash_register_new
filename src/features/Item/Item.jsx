/* eslint-disable react/prop-types */
function Item({ item }) {
  return (
    <>
      <li>
        {item.id} {item.itemName} {item.unitPrice} {item.type}{" "}
        <button>edit</button>
        <button>delete</button>
      </li>
    </>
  );
}

export default Item;
