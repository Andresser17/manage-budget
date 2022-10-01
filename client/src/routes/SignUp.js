import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Components
import Input from "components/Input";
// Services
import authService from "services/auth.service";
// Styles
import styles from "./SignIn.module.css";

function SignUp() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await authService.signUp(data.email, data.password);

    // if response is successful, redirect to /signin
    if (response.status === 201) {
      toast.success(response.data.message);
      return navigate("/signin");
    }

    toast.error(response.response.data.message);
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>Sign Up</h2>

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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
