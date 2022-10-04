// Styles
import styles from "./Date.module.css";

function Date({ label, placeholder, value, onChange, required, ...props }) {
  return (
    <label className={styles["label"]}>
      <span className={styles["title"]}>{label}</span>
      <input
        type="date"
        className={styles["input"]}
        {...{ value: value || "", placeholder, required, onChange, ...props }}
      />
      {/* Description */}
      <span className={styles["description"]}>
      </span>
    </label>
  );
}

export default Date;
