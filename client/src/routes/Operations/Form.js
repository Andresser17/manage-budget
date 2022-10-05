import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Components
import Input from "components/Input";
import Date from "components/Date";
import Select from "components/Select";
// Icons
import { ReactComponent as CloseIcon } from "icons/error-icon.svg";
// Services
import userService from "services/user.service";
// Actions
import { refresh } from "store/userSlice";
// Styles
import styles from "./Form.module.css";

function Form({ update, setUpdate, categories }) {
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
  const dispatch = useDispatch();

  const resetForm = () => {
    reset();
    setDate("");
    setUpdate(null);
  };

  const updateOp = async (data) => {
    const response = await userService.updateOperation(
      update.id,
      data.amount,
      date,
      data.type.toLowerCase(),
      data.category,
      data.concept
    );

    if (response.status === 200) {
      toast.success(response.data.message);
      resetForm();
      dispatch(refresh(true));

      return;
    }

    toast.error(response.response.data.message);
  };

  const registerOp = async (data) => {
    const response = await userService.registerOperation(
      data.amount,
      date,
      data.type.toLowerCase(),
      data.category,
      data.concept
    );

    if (response.status === 201) {
      toast.success(response.data.message);
      resetForm();
      dispatch(refresh(true));

      return;
    }

    toast.error(response.response.data.message);
  };

  const onSubmit = async (data) => {
    if (update) {
      updateOp(data);
      return;
    }

    registerOp(data);
  };

  // if data is provided fill form
  useEffect(() => {
    const fillForm = () => {
      setValue("amount", update.amount);
      setValue("type", update.type);
      setValue("category", update.category);
      setValue("concept", update.concept);
      setDate(update.date);
    };

    if (update && date.length === 0) fillForm();
  }, [update, date, setValue]);

  return (
    <div className={styles["container"]}>
      <div className={styles["top"]}>
        <h2 className={styles["title"]}>Register Operation</h2>
        {update && (
          <CloseIcon onClick={resetForm} className={styles["close-button"]} />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["input-cont"]}>
          <Input
            control={control}
            name="amount"
            placeholder="$250.00"
            label="Amount *"
            type="number"
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
            disabled={update ? true : false}
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
          {update ? "Update" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Form;
