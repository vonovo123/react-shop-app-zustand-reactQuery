import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import styles from "./form.module.scss";

type FormProps = {
  title: string;
  getDataForm: (email: string, password: string) => void;
  firebaseError: string;
};
type FormType = { email: string; password: string };
const Form = ({ title, getDataForm, firebaseError }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  const userEmail = {
    required: "이메일은 필수 입력입니다.",
  };
  const userPassword = {
    required: "비밀번호는 필수 입력입니다.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          {...register("email", userEmail)}
        />
        {errors.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", userPassword)}
        />
        {errors.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button type="submit">{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
};

export default Form;
