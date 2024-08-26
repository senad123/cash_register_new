import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

import { useState } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? "x" : "☰"}
      </button>
      <nav className={styles.nav}>
        <ul
          className={`${styles.navList} ${menuOpen ? styles.navListOpen : ""}`}
        >
          <li>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="allItems"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              All Items
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="createNewOrder"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Create New Order
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/allOrders"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              AllOrders
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
