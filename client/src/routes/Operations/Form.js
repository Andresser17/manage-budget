import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Components
import Input from "../components/Input";
// Services
import authService from "services/auth.service";
// Actions
// import {} from "store/authSlice"
// Styles
import styles from "./Form.module.css";

function Form(props) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await authService.signIn(data.email, data.password);

    // if response is successful, redirect to home
    if (response.status === 200) {
      toast.success("Logged successfuly");
      // dispatch(signIn());
      return;
    }

    toast.error(response.response.data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <div className={styles["input-cont"]}>
        <Input
          control={control}
          name="email"
          placeholder="example@domain.com"
          label="Email"
          rules={{ required: true }}
        />
      </div>
      <div className={styles["input-cont"]}>
        <Input
          control={control}
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          rules={{ required: true }}
        />
      </div>
      <button className={`${styles["submit-button"]} secondary`}>
        Sign In
      </button>
    </form>
  );
}

export default Form;
