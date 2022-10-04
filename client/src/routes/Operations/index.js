import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Components
import Operation from "components/Operation";
import FilterBy from "components/FilterBy";
// Sections
import Form from "./Form";
// Services
import userService from "services/user.service";
// Styles
import styles from "./index.module.css";

function Operations() {
  const [operations, setOperations] = useState([]);
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
  const [categories, setCategories] = useState([
    { label: "Filter by category", value: "" },
  ]);
  const auth = useSelector((state) => state.auth);

  // get operations
  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getOperations({
        category: filters.category,
        type: filters.type,
        sort: filters.sort,
      });

      if (response.status === 200) {
        setOperations(response.data);
      }
    };

    if (auth.isSignedIn) fetchData();
  }, [auth, filters]);

  // get categories
  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getCategories();

      if (response.status === 200) {
        setCategories((prev) => [...prev, ...response.data]);
      }
    };

    if (auth.isSignedIn && categories.length === 0) fetchData();
  }, [auth, categories]);

  return (
    <div className={styles["container"]}>
      <Form />
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
        {operations.length > 0 &&
          operations.map((op) => <Operation key={op.id} data={op} />)}
      </div>
    </div>
  );
}

export default Operations;
