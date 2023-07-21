import styles from "./Home.module.scss";
import BooksGrid from "../BooksGrid/BooksGrid";
import Header from "./Header/Header";
import { Languages, Genres, Editions } from "../../data/BooksData";
import { replaceAll } from "../../common/common";

const Home = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Header />
      </header>
      <aside className={styles.aside}>
        <form>
          <label htmlFor="sortBy">Sort By:</label>
          <select>
            <option value="added">Added Date</option>
            <option value="published">Published Date</option>
            <option value="popularity" selected>
              Popularity
            </option>
          </select>
          <label htmlFor="language">Language:</label>

          {Languages.map((language, index) => (
            <label htmlFor={language.toLowerCase()}>
              <input
                type="checkbox"
                key={index}
                id={language.toLowerCase()}
                value={language.toLowerCase()}
              />
              {language}
            </label>
          ))}
          <label htmlFor="genre">Genre</label>
          <select id="genre">
            <option value="" selected></option>
            {Genres.map((genre, index) => (
              <option
                key={index}
                value={replaceAll(genre.toLowerCase(), " ", "_")}
              >
                {genre}
              </option>
            ))}
          </select>
          <label htmlFor="edition">Edition</label>
          <select id="edition">
            <option value="" selected></option>
            {Editions.map((edition, index) => (
              <option
                key={index}
                value={replaceAll(edition.toLowerCase(), " ", "_")}
              >
                {edition}
              </option>
            ))}
          </select>
        </form>
      </aside>
      <section className={styles.section}>
        <BooksGrid />
      </section>
      <footer className={styles.footer}>adsf</footer>
    </main>
  );
};

export default Home;
