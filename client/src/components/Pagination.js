import ReactPaginate from "react-paginate";
// Icons
import { ReactComponent as ArrowNext } from "icons/arrow-next.svg";
import { ReactComponent as ArrowPrevious } from "icons/arrow-previous.svg";
// Styles
import styles from "./Pagination.module.css";

function Pagination({
  pageCount = 1,
  limit = 10,
  setSelected = () => undefined,
  selected = 1,
}) {
  const handlePageClick = (e) => {
    setSelected(e.selected);
  };

  return (
    <ReactPaginate
      containerClassName={styles["container"]}
      pageClassName={styles["button-li"]}
      pageLinkClassName={styles["button"]}
      activeClassName={styles["button-active"]}
      previousLabel={<ArrowPrevious className={styles["arrow"]} />}
      previousClassName={styles["arrow-button-li"]}
      previousLinkClassName={styles["arrow-button"]}
      nextLabel={<ArrowNext className={styles["arrow"]} />}
      nextClassName={styles["arrow-button-li"]}
      nextLinkClassName={styles["arrow-button"]}
      onPageChange={handlePageClick}
      pageCount={Math.ceil(pageCount / limit)}
    />
  );
}

export default Pagination;
