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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Logo color="#111" font_size="1.5rem" />
      <span className={styles.title}>Welcome back</span>
      <span className={styles.subtitle}>Resume your readings.</span>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        {...register("username")}
      />
      {errors.username && (
        <span className={styles.error}>{errors.username.message}</span>
      )}
      <label htmlFor="password">Password</label>{" "}
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        {...register("password")}
      />
      {errors.username && (
        <div className={styles.error}>{errors.username.message}</div>
      )}
      <div className={styles.rememberWrapper}>
        <div>
          <input type="checkbox" id="remember" {...register("remember")} />{" "}
          <label htmlFor="remember">Remember me.</label>
        </div>
        <Link to="/login">Forget password</Link>
      </div>
      <button type="submit">Login</button>
      <span className={styles.footer}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </span>
    </form>
  );
};

export default Login;
