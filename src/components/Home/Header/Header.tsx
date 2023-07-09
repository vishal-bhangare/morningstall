import { useState } from "react";
import styles from "./Header.module.scss";
const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.start}>
        <span className={styles.logo}>Morningstall</span>{" "}
      </div>
      {/* <img src="src/assets/logo.png" alt="loading" /> */}
      <div className={styles.center}>
        <div className={styles.searchBox}>
          <i className={["fa-solid", "fa-magnifying-glass"].join(" ")}></i>
          <input
            type="text"
            name="search_query"
            id="search_query"
            placeholder="Find books.."
          />
          <i
            className={[
              "fa-solid",
              "fa-xmark",
              styles.iconBtn,
              styles.clear,
            ].join(" ")}
          ></i>
          <div className={styles.suggestionContainer}>
            <ul>
              <li>item3</li>
              <li>item2</li>
              <li>item1</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.end}>
        <i
          className={[
            "fa-solid",
            "fa-magnifying-glass",
            styles.searchIcon,
            styles.iconBtn_md,
          ].join(" ")}
        ></i>
        {/* {isLoggedIn && (
          <i
            className={[
              "fa-solid",
              "fa-books",
              styles.bookshelfIcon,
              styles.iconBtn_md,
            ].join(" ")}
          ></i>
        )}
        {isLoggedIn && (
          <i
            className={[
              "fa-duotone",
              "fa-user",
              styles.userIcon,
              styles.iconBtn_md,
            ].join(" ")}
          ></i>
        )} */}

        <button>Signin</button>
      </div>
    </div>
  );
};

export default Header;
