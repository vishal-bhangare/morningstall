import { useState } from "react";
import styles from "./Header.module.scss";
const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div className={styles.container}>
      <span className={styles.logo}>Morningstall</span>{" "}
      {/* <img src="src/assets/logo.png" alt="loading" /> */}
      <button
        className={styles.tooltip_bottom}
        data-tooltip-content="Click here to proceed"
      >
        Signin
      </button>
      {isLoggedIn && <i className="fa-duotone fa-user"></i>}
      {isLoggedIn && (
        <i
          className={["fa-duotone", "fa-books", styles.bookshelfIcon].join(" ")}
        ></i>
      )}
    </div>
  );
};

export default Header;
