// eslint-disable-next-line no-unused-vars
import Logo from "./Logo";
import Nav from "./Nav";
import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>
        <Logo />
      </div>
      <div className={styles.headerItem}>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
