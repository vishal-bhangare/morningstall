import { useState } from "react";
import styles from "./SuperuserLogin.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "../../../services/superuser.service";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SuperuserLogin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const {
    register: loginRegistor,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const onLoginSubmit = (formData: FieldValues) => {
    login(formData)
      .then((res: any) => {
        if (res.status == 200) {
          sessionStorage.setItem("token", res.data.token);
          navigate("/superuser/dashboard");
        }
        if (res.status == 401) alert("Invalid credentials.");
        console.log(res);
      })
      .catch((err: any) => {
        if (err.status == 401) alert("Invalid credentials.");
      });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  return (
    <div className={styles.container}>
      <div className={styles.LoginCard}>
        <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
          <label htmlFor="username">
            Username :
            <input type="text" id="username" {...loginRegistor("username")} />
            {loginErrors.username && (
              <span className={styles.error}>
                {loginErrors.username.message}
              </span>
            )}
          </label>

          <label htmlFor="password">
            Password :
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              {...loginRegistor("password")}
            />
            {loginErrors.username && (
              <div className={styles.error}>{loginErrors.username.message}</div>
            )}
          </label>

          <label
            htmlFor="passwordVisibility"
            className={styles.passwordVisibility}
          >
            <input
              type="checkbox"
              id="passwordVisibility"
              onClick={togglePasswordVisibility}
            />
            {passwordVisibility ? "Hide Password" : "Show Password"}
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SuperuserLogin;
