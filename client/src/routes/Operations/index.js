import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// Components
import Operation from "components/Operation";
import Select from "components/Select";
// Sections
import Form from "./Form";
// Services
import userService from "services/user.service";
// Styles
import styles from "./index.module.css";

function Operations() {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      "sort-by": "",
    },
  });
  const [operations, setOperations] = useState([]);
  const [options, setOptions] = useState([
    { label: "Income", value: "income" },
    { label: "Outcome", value: "outcome" },
  ]);
  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const operations = await userService.getOperations();

      if (operations.status === 200) {
        setOperations(operations.data);
      }
    };

    if (auth.isSignedIn) fetchData();
  }, [auth]);

  return (
    <div className={styles["container"]}>
      <Form />
      <div className={styles["filters"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <span className={styles["sort-by"]}>
            Sort by:{" "}
            <Select
              options={options}
              name="sort-by"
              placeholder="Select a type"
              control={control}
              setValue={setValue}
              rules={{ required: true }}
            />
          </span>
        </form>
      </div>
      <div className={styles["operations-cont"]}>
        {operations.length > 0 &&
          operations.map((op) => <Operation key={op.id} data={op} />)}
      </div>
    </div>
  );
}

export default Operations;
