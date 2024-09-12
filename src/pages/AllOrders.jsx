import { Outlet } from "react-router-dom";
import OrderLaout from "../ui/OrderLaout";

function AllOrders() {
  return (
    <div>
      <OrderLaout>
        <Outlet />
      </OrderLaout>
    </div>
  );
}

export default AllOrders;
