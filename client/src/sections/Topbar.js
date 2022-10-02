import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Styles
import styles from "./Topbar.module.css";

function Menu({ active }) {
  const auth = useSelector((state) => state.auth);

  return (
    <nav className={`${styles["menu"]}`}>
      {auth.isLogged ? (
        <Link className={styles["link-button"]} to="/signin">
          Sign Out
        </Link>
      ) : (
        <>
          <Link className={styles["link-button"]} to="/signin">
            Sign In
          </Link>
          <Link className={styles["link"]} to="/signup">
            Sign Up
          </Link>
        </>
      )}
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
