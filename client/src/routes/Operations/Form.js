import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// Components
import Input from "components/Input";
import Date from "components/Date";
import Select from "components/Select";
// Services
import userService from "services/user.service";
// Styles
import styles from "./Form.module.css";

function Form({ categories, setRefresh }) {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      amount: "",
      type: "",
      category: "",
      concept: "",
    },
  });
  const types = [
    { label: "Income", value: "income" },
    { label: "Outcome", value: "outcome" },
  ];
  const [date, setDate] = useState("");

  const onSubmit = async (data) => {
    const response = await userService.registerOperation(
      data.amount,
      date,
      data.type.toLowerCase(),
      data.category,
      data.concept
    );

    // if response is successful, redirect to home
    if (response.status === 201) {
      toast.success(response.data.message);
      // reset();
      // setDate("");
      setRefresh(true);

      return;
    }

    toast.error(response.response.data.message);
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>Register Operation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["input-cont"]}>
          <Input
            control={control}
            name="amount"
            placeholder="$250.00"
            label="Amount *"
            rules={{ required: true }}
          />
        </div>
        <div className={styles["input-cont"]}>
          <Date
            name="date"
            placeholder="10-27-2022"
            label="Date *"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles["input-cont"]}>
          <Select
            label="Type *"
            options={types}
            name="type"
            placeholder="Select a type"
            control={control}
            setValue={setValue}
            rules={{ required: true }}
          />
        </div>
        <div className={styles["input-cont"]}>
          <Select
            label="Category"
            options={categories.filter((c, i) => i !== 0)}
            name="category"
            placeholder="Select a category or create one"
            control={control}
            setValue={setValue}
          />
        </div>
        <div className={styles["input-cont"]}>
          <Input
            control={control}
            name="concept"
            placeholder="Custom concept..."
            label="Concept *"
            rules={{ required: true }}
          />
        </div>
        <button className={`${styles["submit-button"]} secondary`}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
