import Logo from "../Logo/Logo";
import styles from "./Login.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean(),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo color="#111" />
        <span className={styles.title}>Welcome back.</span>
        <span className={styles.subtitle}>Resume your readings.</span>
        <label htmlFor="username">
          Username :
          <input type="text" id="username" {...register("username")} />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </label>
        <label htmlFor="password">
          Password :
          <input id="password" {...register("password")} />
          {errors.username && (
            <div className={styles.error}>{errors.username.message}</div>
          )}
        </label>
        <input type="checkbox" id="remember" {...register("remember")} />{" "}
        <label htmlFor="remember">Remember me.</label>
        <Link to="/login">Forget password</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
