/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useState, useId } from "react";
import useCustomerStore from "./globalState/customerStore";
import Order from "./Order";

function App() {
  const customers = useCustomerStore((state) => state.customers);
  const addNewCustomer = useCustomerStore((state) => state.addNewCustomer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);

  const [name, setName] = useState("");

  return (
    <div>
      <h1>CreateNew Order</h1>

      <Order />
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>
            {customer.id}- {customer.name}
            <input
              value={customer.name}
              onChange={(e) =>
                updateCustomer({
                  id: customer.id,
                  name: e.target.value,
                })
              }
            />
          </li>
        ))}
      </ul>
      <input
        placeholder="input customer"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => addNewCustomer({ id: crypto.randomUUID(), name })}>
        add customer
      </button>
    </div>
  );
}
export default App;
