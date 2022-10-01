import { Link } from "react-router-dom";
// Icons
// Styles
import styles from "./Operation.module.css";

function Operation({ data }) {
  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["topbar"]}>
        <span>$ 200.00</span>
        <span>12-24-2022</span>
      </div>
      <div className={styles["concept-cont"]}>
        <span>Concept:</span>
        <div className={styles["concept"]}>
          <p>Describe the concept of this card...</p>
        </div>
      </div>
      <div className={styles["bottom"]}>
        <span className={styles["type"]}>OUTCOME</span>
        <span className={styles["category"]}>
          <strong>Category:</strong> Food
        </span>
      </div>
    </div>
  );
}

export default Operation;
