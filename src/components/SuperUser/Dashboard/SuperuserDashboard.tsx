import { useState } from "react";
import styles from "./SuperuserDashboard.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { createAdmin } from "../../../services/superuser.service";

const adminSchema = z
  .object({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type AdminFormData = z.infer<typeof adminSchema>;

const SuperuserDashboard = () => {
  const [isUserVisible, setUserVisible] = useState(false);
  const [user, setUser] = useState("");
  const {
    register: adminRegistor,
    handleSubmit: adminHandleSubmit,
    reset,
    formState: { errors: adminErrors },
  } = useForm<AdminFormData>({ resolver: zodResolver(adminSchema) });

  const onAdminSubmit = (formData: FieldValues) => {
    createAdmin(formData)
      .then((res) => {
        reset();
        console.log("user is created.");
      })
      .catch((err) => console.log(err));
  };

  const toggleUserVisible = () => {
    setUserVisible(!isUserVisible);
  };
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default SuperuserDashboard;
