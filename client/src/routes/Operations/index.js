import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import Operation from "components/Operation";
import FilterBy from "components/FilterBy";
import Pagination from "components/Pagination";
// Sections
import Form from "./Form";
// Services
import userService from "services/user.service";
// Actions
import { refresh } from "store/userSlice";
// Styles
import styles from "./index.module.css";

function Operations() {
  const [operations, setOperations] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    sort: "desc",
  });
  const sortBy = [
    { label: "Last", value: "desc" },
    { label: "First", value: "asc" },
  ];
  const types = [
    { label: "Filter by type", value: "" },
    { label: "Income", value: "income" },
    { label: "Outcome", value: "outcome" },
  ];
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // get operations
  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getOperations({
        page,
        category: filters.category,
        type: filters.type,
        sort: filters.sort,
      });

      if (response.status === 200) {
        setOperations(response.data);
      }
    };

    if (user.refresh) {
      fetchData();
      dispatch(refresh(false));
    }
    if (auth.isSignedIn) fetchData();
  }, [auth, filters, dispatch, user, page]);

  // get categories
  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getCategories();

      if (response.status === 200) {
        setCategories([
          { label: "Filter by category", value: "" },
          ...response.data,
        ]);
      }
    };

    if (user.refresh) {
      fetchData();
    }
    if (auth.isSignedIn && categories.length === 0) fetchData();
  }, [auth, categories, user]);

  return (
    <div className={styles["container"]}>
      <Form update={update} setUpdate={setUpdate} categories={categories} />
      <div className={styles["filters"]}>
        <div className={styles["filter-wrapper"]}>
          <FilterBy
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            options={sortBy}
            label="Sort by:"
            name="sort"
          />
        </div>
        <div className={styles["filter-wrapper"]}>
          <FilterBy
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            options={types}
            label="Type:"
            name="type"
          />
        </div>
        <div className={styles["filter-wrapper"]}>
          <FilterBy
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            options={categories}
            label="Category:"
            name="category"
          />
        </div>
      </div>
      <div className={styles["operations-cont"]}>
        {Object.keys(operations).length > 0 &&
          operations.data.map((op) => (
            <Operation setUpdate={setUpdate} modify key={op.id} data={op} />
          ))}
      </div>
      <div className={styles["pag-cont"]}>
        {Object.keys(operations).length > 0 && (
          <Pagination
            maxPage={operations.count}
            limit={10}
            selected={page}
            setSelected={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default Operations;
