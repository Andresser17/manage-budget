// Styles
import styles from "./Operation.module.css";

function Operation({ data }) {
  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["topbar"]}>
        <span>$ {data.amount}</span>
        <span>{data.date}</span>
      </div>
      <div className={styles["concept-cont"]}>
        <span>Concept:</span>
        <div className={styles["concept"]}>
          <p>{data.concept}</p>
        </div>
      </div>
      <div className={styles["bottom"]}>
        <span className={styles["type"]}>{data.type.toUpperCase()}</span>
        <span className={styles["category"]}>
          <strong>Category:</strong> {data?.category ?? "None"}
        </span>
      </div>
    </div>
  );
}

export default Operation;
