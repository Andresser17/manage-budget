import { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// Styles
import styles from "./Select.module.css";

function Option({ option, selected, setSelected }) {
  return (
    <span className={styles["option"]} onClick={() => setSelected(option)}>
      {option.label}
    </span>
  );
}

function Dropdown({
  search = false,
  inputValue = "",
  options,
  selected,
  setSelected,
}) {
  return (
    <div className={styles["dropdown"]}>
      {options
        .filter((op) => {
          const filter = inputValue.toUpperCase();
          if (search) {
            if (op.label.toUpperCase().indexOf(filter) > -1) {
              return op;
            }

            return undefined;
          }

          return op;
        })
        .map((op) => (
          <Option
            key={op.value}
            option={op}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </div>
  );
}

function Select({
  options = [],
  label = "",
  placeholder = "Search",
  getValue = (value) => undefined,
  setValue = (name, value) => undefined,
  ...props
}) {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [isFocus, setIsFocus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Refs
  const containerRef = useRef();
  const outsideSpanRef = useRef();
  const inputRef = useRef();

  const handleSelection = (option) => {
    if (isSearching) setIsSearching(false);
    setShowDropdown(false);
    setSelected(option);
    setIsFocus(false);
    getValue((prev) => ({ ...prev, [props.name]: option.value }));
    setValue(props.name, option.label);
  };

  return (
    <>
      <div className={styles["container"]}>
        <label htmlFor={props.name} className={styles["title"]}>
          {label}
        </label>
        <div
          ref={containerRef}
          onClick={() => {
            if (!isFocus) setIsFocus(true);
            inputRef.current.focus();
            setShowDropdown((prev) => !prev);
          }}
          className={`${styles["select"]} ${
            isFocus ? styles["select-focus"] : ""
          }`}
        >
          <input
            autoComplete="off"
            type="search"
            className={styles["input"]}
            {...{
              placeholder,
              ...{
                ...field,
                ref(e) {
                  field.ref(e);
                  inputRef.current = e;
                },
              },
              onChange: (e) => {
                if (!isSearching) setIsSearching(true);
                field.onChange(e);
              },
              value: field.value || "",
            }}
          />
        </div>
        {showDropdown && (
          <Dropdown
            search={isSearching}
            inputValue={field.value}
            options={options}
            {...{ selected, setSelected: handleSelection }}
          />
        )}
        {/* Description */}
        <span className={styles["description"]}>
          {error?.type === "required" ? "This field is required" : ""}
          {error?.message}
        </span>
      </div>
      {/* Handle outside click */}
      {isFocus && (
        <span
          onClick={() => {
            setShowDropdown(false);
            setIsFocus(false);
          }}
          ref={outsideSpanRef}
          className={styles["handle-outside"]}
        ></span>
      )}
    </>
  );
}
Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  name: PropTypes.string,
};

export default Select;
