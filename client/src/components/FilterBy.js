// Styles
import styles from "./FilterBy.module.css";

function FilterBy({ label, name, options, onChange }) {
  return (
    <label className={styles["label"]} htmlFor={name}>
      <span className={styles["title"]}>{label}</span>
      <select onChange={onChange} className={styles["select"]} name={name}>
        {options &&
          options.map((op) => (
            <option
              className={styles["option"]}
              key={op.value}
              value={op.value}
            >
              {op.label}
            </option>
          ))}
      </select>
    </label>
  );
}

export default FilterBy;
