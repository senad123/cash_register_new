/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useId } from "react";
import useCustomerStore from "./globalState/customerStore";
import AppLayout from "./ui/AppLayout";
import CreateOrder from "./pages/CreateOrder";
import AllOrders from "./pages/AllOrders";
import AllItems from "./pages/AllItems";
import OrderDetail from "./pages/OrderDetail";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";

function App() {
  const customers = useCustomerStore((state) => state.customers);
  const addNewCustomer = useCustomerStore((state) => state.addNewCustomer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);

  const [name, setName] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="createNewOrder" element={<CreateOrder />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="orderDetail/:id" element={<OrderDetail />} />
            <Route path="allItems" element={<AllItems />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
