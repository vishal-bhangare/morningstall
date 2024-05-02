import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Logo/Logo";
import Button from "../../Utils/Button/Button";
const Header = () => {
  // const [isLoggedIn, setLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const toggleSearchBox = () => {
    setSearchBoxVisibility(!searchBoxVisibility);
  };
  useEffect(() => {
    if (isBigScreen) {
      toggleSearchBox();
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.start} onClick={() => navigate(`/`)}>
        <Logo color="#111" />
        {/* <span className={styles.logo}>Morningstall</span>{" "} */}
      </div>
      {/* <img src="src/assets/logo.png" alt="loading" /> */}
      <div
        className={styles.center}
        style={{ display: searchBoxVisibility ? "flex" : "none", opacity: 1 }}
      >
        <i
          className={[
            "fa-solid",
            "fa-arrow-left",
            styles.iconBtn_sm,
            styles.backToHome,
          ].join(" ")}
          onClick={toggleSearchBox}
        ></i>
        <div className={styles.searchBox}>
          <i className={["fa-solid", "fa-magnifying-glass"].join(" ")}></i>
          <input
            type="text"
            name="search_query"
            id="search_query"
            placeholder="Find books..."
            onChange={(e) => {
              setSearchQuery(e?.target?.value);
            }}
          />

          {searchQuery && (
            <i
              className={[
                "fa-solid",
                "fa-xmark",
                styles.iconBtn,
                styles.clear,
              ].join(" ")}
            ></i>
          )}

          {/* <div className={styles.suggestionContainer}>
            <ul>
              <li>item3</li>
              <li>item2</li>
              <li>item1</li>
            </ul>
          </div> */}
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
          onClick={toggleSearchBox}
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

        {/* <Button size="md" mode="dark">
          <Link to="/login">Signin</Link>
        </Button> */}
      </div>
    </div>
  );
};

export default Header;
