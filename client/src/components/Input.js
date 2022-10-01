import { useController } from "react-hook-form";
// Styles
import styles from "./Input.module.css";

function Input({ label, placeholder, type = "text", ...props }) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <label className={styles["label"]} htmlFor={props.name}>
      <span className={styles["title"]}>{label}</span>
      <input
        className={styles["input"]}
        {...{ value: field.value || "", ...field, placeholder, type }}
      />
      {/* Description */}
      <span className={styles["description"]}>
        {error?.type === "required" ? "This field is required" : ""}
        {error?.message}
      </span>
    </label>
  );
}

export default Input;
