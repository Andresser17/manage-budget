import { useForm } from "react-hook-form";
// components
import Input from "components/Input";
// Styles
import styles from "./SignIn.module.css";

function SignUp() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

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
