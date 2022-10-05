// Icons
import { ReactComponent as CloseIcon } from "icons/error-icon.svg";
import { ReactComponent as EditIcon } from "icons/edit-icon.svg";
// Styles
import styles from "./Operation.module.css";

function Operation({ data, modify }) {
  return (
    <div className={`${styles["container"]}`}>
      <div className={styles["topbar"]}>
        <span>$ {data.amount}</span>
        <span>{data.date}</span>
      </div>
      {modify && (
        <div className={styles["options"]}>
          <CloseIcon className={styles["close-button"]} />
          <EditIcon className={styles["edit-button"]} />
        </div>
      )}
      <div className={styles["concept-cont"]}>
        <span>Concept:</span>
        <div className={styles["concept"]}>
          <p>{data.concept}</p>
        </div>
      </div>
      <div className={styles["bottom"]}>
        <span className={styles["type"]}>{data.type.toUpperCase()}</span>
        <span className={styles["category"]}>
          <strong>Category:</strong> {data.Category?.name ?? "None"}
        </span>
      </div>
    </div>
  );
}

export default Operation;
