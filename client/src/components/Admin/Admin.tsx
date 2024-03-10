import { useState } from "react";
import styles from "./Admin.module.scss";

import AnimateHeight from "react-animate-height";
import Books from "./components/Books/Books";

const Admin = () => {
  const [height, setHeight] = useState<any>(0);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <i
            onClick={() => setHeight(height === 0 ? "auto" : 0)}
            className={"fa-solid fa-user " + styles.userIcon}
          ></i>

          <AnimateHeight duration={500} height={height}>
            {" "}
            <ul>
              <li>Username</li>
              <li>change password</li>
              <li>Logout</li>
            </ul>
          </AnimateHeight>
        </div>

        <div className={styles.sidebar}>
          <ul>
            <li className={styles.active}>Books</li>
            <li>Magzines</li>
            <li>News Papers</li>
            <li>Reseach Papers</li>
          </ul>
        </div>
        <div className={styles.content}>
          <Books />
        </div>
      </div>
    </>
  );
};

export default Admin;
