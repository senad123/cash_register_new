function CreateNewOrder() {
  return (
    <div>
      <label>Customer Info</label>
      <input placeholder="Customer" />
      <p>Date</p>
      <label>AddItem</label>
      <input placeholder="search" />
      <select>
        <option>Select Item</option>
        <option>Banana</option>
      </select>
      <button>AddItem</button>

      <p>Selected Items</p>
      <ul>
        <li>
          banana - unitPrice: 3€, <button>-</button>quantitiy:{" "}
          <input placeholder="2" /> <button>+</button>
        </li>
      </ul>
      <p>TotalPrice 30€</p>
      <button>SaveOrder</button>
    </div>
  );
}

export default CreateNewOrder;
