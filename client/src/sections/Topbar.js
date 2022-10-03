import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Services
import authService from "services/auth.service";
// Actions
import { signOut } from "store/authSlice";
// Styles
import styles from "./Topbar.module.css";

function Menu({ active }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSignout = async () => {
    await authService.signOut();
    dispatch(signOut());
    toast.success("Sign out successfuly");
    navigate("/");
  };

  return (
    <nav className={`${styles["menu"]}`}>
      {auth.isSignedIn ? (
        <>
          <Link className={styles["link-button"]} to="/operations">
            Operations
          </Link>
          <span onClick={handleSignout} className={styles["link"]}>
            Sign Out
          </span>
        </>
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
