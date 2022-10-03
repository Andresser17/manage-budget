import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// Components
import Input from "components/Input";
// Services
import authService from "services/auth.service";
// Actions
import { signIn } from "store/authSlice";
// Styles
import styles from "./SignIn.module.css";

function SignIn() {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await authService.signIn(data.email, data.password);

    // if response is successful, redirect to home
    if (response.status === 200) {
      toast.success("Logged successfuly");
      dispatch(signIn());
      window.location.replace("/");
      return;
    }

    toast.error(response.response.data.message);
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>Sign In</h2>

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
    </div>
  );
}

export default SignIn;
