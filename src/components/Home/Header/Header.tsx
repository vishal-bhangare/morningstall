import { useState } from "react";
import styles from "./Header.module.scss";
const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.logo}>Morningstall</span>{" "}
      {/* <img src="src/assets/logo.png" alt="loading" /> */}
      <button>Signin</button>
      {isLoggedIn && <i className="fa-duotone fa-books"></i>}
      {isLoggedIn && <i className="fa-duotone fa-user"></i>}
    </div>
  );
};

export default Header;
