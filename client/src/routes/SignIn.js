import { useForm } from "react-hook-form";
// components
import Input from "components/Input";
// Styles
import styles from "./SignIn.module.css";

function SignIn() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => console.log(data);

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
        <button className={styles["submit-button"]}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
