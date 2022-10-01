// Components
import Operation from "components/Operation";
// Styles
import styles from "./Home.module.css";

function Homepage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <span className={styles["welcome-message"]}>Hello Alejandro</span>
        <span className={styles["subtitle"]}>This is your actual balance</span>

        <span className={styles["balance"]}>$ 250.00</span>
      </div>
      <div className={styles["operations-cont"]}>
        <Operation />
      </div>
    </div>
  );
}

export default Homepage;
