import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Services
import authService from "services/auth.service";
// Actions
import { signOut } from "store/authSlice";
// Styles
import styles from "./Topbar.module.css";

function Menu({ active }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSignout = async () => {
    await authService.signOut();
    dispatch(signOut());

    toast.success("Sign out successfuly");
  };

  return (
    <nav className={`${styles["menu"]}`}>
      {auth.isLogged ? (
        <span onClick={handleSignout} className={styles["link-button"]}>
          Sign Out
        </span>
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
