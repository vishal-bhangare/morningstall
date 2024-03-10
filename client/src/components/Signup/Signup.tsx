import Logo from "../Logo/Logo";
import styles from "./Signup.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Logo color="#111" font_size="1.5rem" />
      <span className={styles.title}>Create an account</span>
      <span className={styles.subtitle}>
        {" "}
        start reading on Morningstall for free.
      </span>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter name"
        {...register("name")}
      />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Enter email"
        {...register("email")}
      />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}
      <label htmlFor="password">Password</label>{" "}
      <input
        type="password"
        id="password"
        placeholder="Enter a password"
        {...register("password")}
      />
      {errors.password && (
        <div className={styles.error}>{errors.password.message}</div>
      )}
      <button type="submit">Signup</button>
      <span>
        <center>OR</center>
      </span>
      <button className={styles.google}>Sign in with Google</button>
      <span className={styles.footer}>
        Already have an account? <Link to="/login">Log in</Link>
      </span>
    </form>
  );
};

export default Signup;
