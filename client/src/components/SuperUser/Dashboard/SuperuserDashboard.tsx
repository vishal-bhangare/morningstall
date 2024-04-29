import { useState } from "react";
import styles from "./SuperuserDashboard.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { createAdmin } from "../../../services/superuser.service";
import { useNavigate } from "react-router-dom";

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
  const [user] = useState("");
  const {
    register: adminRegistor,
    handleSubmit: adminHandleSubmit,
    reset,
    formState: { errors: adminErrors },
  } = useForm<AdminFormData>({ resolver: zodResolver(adminSchema) });
  const navigate = useNavigate();
  const onAdminSubmit = (formData: FieldValues) => {
    createAdmin(formData)
      .then((data) => {
        console.log(data);
        reset();
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = () => {
    sessionStorage.removeItem("superuserToken");
    navigate("/superuser/login");
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
              <li onClick={handleLogout}>
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
