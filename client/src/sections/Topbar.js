import { Link } from "react-router-dom";
// Styles
import styles from "./Topbar.module.css";

function Menu({ active }) {
  return (
    <nav className={`${styles["menu"]}`}>
      <Link className={styles["link-button"]} to="/signin">
        Sign In
      </Link>
      <Link className={styles["link"]} to="/signup">
        Sign Up
      </Link>
    </nav>
  );
}

function Topbar() {
  return (
    <div className={`${styles["top-panel"]}`}>
      <Menu />
    </div>
  );
}

export default Topbar;
