import { useState, useEffect } from "react";
// Icons
import { ReactComponent as ArrowNext } from "icons/arrow-next.svg";
import { ReactComponent as ArrowPrevious } from "icons/arrow-previous.svg";
// Helpers
import paginate from "helpers/paginate";
// Styles
import styles from "./Pagination.module.css";

function Button({ value, text, selected, setSelected, children }) {
  return (
    <li
      onClick={() => setSelected(Number(value))}
      className={`${children ? styles["arrow-button"] : styles["button"]} ${
        String(selected) === text ? styles["selected-button"] : ""
      }`}
    >
      {children ? children : value}
    </li>
  );
}

function Pagination({ maxPage = 1, limit = 10, setSelected, selected = 1 }) {
  const [buttons, setButtons] = useState([]);
  const [pagesToShow, setPagesToShow] = useState(4);
  const [resolution, setResolution] = useState(0);

  // map maxPage prop to an array of objects
  useEffect(() => {
    const { pages } = paginate(maxPage, selected, limit, pagesToShow);

    setButtons([
      <Button
        key="previous"
        selected={selected}
        setSelected={setSelected}
        value={1}
        text="previous"
      >
        <ArrowPrevious className={styles["arrow"]} />
      </Button>,
      ...pages.map((p: number) => (
        <Button
          key={p}
          selected={selected}
          setSelected={setSelected}
          value={p}
          text={String(p)}
        />
      )),
      <Button
        key="next"
        selected={selected}
        setSelected={setSelected}
        value={1}
        text="next"
      >
        <ArrowNext className={styles["arrow"]} />
      </Button>,
    ]);
  }, [pagesToShow, maxPage, limit, selected, setSelected]);

  // resize pagination when resolution get bigger
  useEffect(() => {
    if (resolution <= 640) {
      setPagesToShow(4);
    }

    // sm
    if (resolution >= 640) {
      setPagesToShow(8);
    }

    // md
    if (resolution >= 768) {
      setPagesToShow(10);
    }
  }, [resolution]);

  // get document resolution
  useEffect(() => {
    // get current resolution when component is mounted
    if (resolution === 0) setResolution(document.body.clientWidth);

    const getResolution = () => {
      setResolution(document.body.clientWidth);
    };
    window.addEventListener("resize", getResolution);

    return () => {
      window.removeEventListener("resize", getResolution);
    };
  }, [resolution]);

  return <ul className={styles["pagination"]}>{buttons}</ul>;
}

export default Pagination;
