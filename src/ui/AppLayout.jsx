import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
