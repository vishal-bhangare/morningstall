import { useState } from "react";
import styles from "./SuperUser.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

const adminSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
  confirmPassword: z.string().min(1, "Confirm password is required."),
});
type LoginFormData = z.infer<typeof loginSchema>;
type AdminFormData = z.infer<typeof adminSchema>;

const SuperUser = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [user, setUser] = useState("");
  const [isUserVisible, setUserVisible] = useState(false);

  const {
    register: loginRegistor,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    register: adminRegistor,
    handleSubmit: adminHandleSubmit,
    formState: { errors: adminErrors },
  } = useForm<AdminFormData>({ resolver: zodResolver(adminSchema) });

  const onLoginSubmit = (formData: FieldValues) => {
    console.log(formData.username);
    if (formData.username == "superuser" && formData.password == "superuser") {
      setAuthenticated(true);
      setUser(formData.username);
    }
  };
  const onAdminSubmit = (formData: FieldValues) => {
    console.log(formData);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleUserVisible = () => {
    setUserVisible(!isUserVisible);
  };
  return (
    <div className={styles.container}>
      {!isAuthenticated && (
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
                <div className={styles.error}>
                  {loginErrors.username.message}
                </div>
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
      )}
      {isAuthenticated && (
        <div className={styles.main}>
          <div className={styles.user}>
            <ul>
              <li onClick={toggleUserVisible}>
                {user}
                <i
                  className={
                    "fa-solid fa-chevron-" + (isUserVisible ? "up" : "down")
                  }
                ></i>
              </li>
              {isUserVisible && (
                <li>
                  Change password<i></i>
                </li>
              )}
              {isUserVisible && (
                <li>
                  Logout<i></i>
                </li>
              )}
            </ul>
          </div>
          <form onSubmit={adminHandleSubmit(onAdminSubmit)}>
            <div>
              <label htmlFor="username">Username :</label>
              <input type="text" id="username" {...adminRegistor("username")} />
              {adminErrors.username && (
                <span className={styles.error}>
                  {adminErrors.username?.message}
                </span>
              )}{" "}
            </div>
            <div>
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                {...adminRegistor("password")}
              />
              {adminErrors.password && (
                <span className={styles.error}>
                  {adminErrors.password?.message}
                </span>
              )}{" "}
            </div>
            <div>
              <label htmlFor="confirmPassword">Confim Password :</label>
              <input
                type="password"
                id="confirmPassword"
                {...adminRegistor("confirmPassword")}
                required
              />
              {adminErrors.confirmPassword && (
                <span className={styles.error}>
                  {adminErrors.confirmPassword?.message}
                </span>
              )}{" "}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SuperUser;
