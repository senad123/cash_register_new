import useCustomerStore from "./globalState/customerStore";

function Order() {
  const customers = useCustomerStore((state) => state.customers);

  return (
    <div>
      {customers.map((customer) => (
        <div key={customer.id}>
          {customer.id}- {customer.name}
        </div>
      ))}
    </div>
  );
}

export default Order;
