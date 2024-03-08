import { useEffect } from "react";
import { replaceAll } from "../../common/common";
import { Editions, Genres, Languages } from "../../data/BooksData";
import Header from "./Header/Header";
import styles from "./Home.module.scss";

import useBooks from "../../hooks/queries/useBooks";
import BooksSlider from "../BooksSlider/BooksSlider";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const { data: recentBooks, isLoading: isRecentBooksLoading } = useBooks(
    0,
    10,
    "recent_added",
    "desc"
  );
  const { data: popularBooks, isLoading: isPopularBooksLoading } = useBooks(
    0,
    10,
    "popularity",
    "desc"
  );
  useEffect(() => {}, []);
  return (
    <div className={styles.home}>
      <Header />

      <main>
        <aside className={styles.aside}>
          <form>
            <label htmlFor="sortBy">Sort By:</label>
            <select defaultValue="default">
              <option value="default"></option>
              <option value="added">Added Date</option>
              <option value="published">Published Date</option>
              <option value="popularity">Popularity</option>
            </select>
            <label htmlFor="languages">Language:</label>
            <div id={styles.languages}>
              {Languages.map((language, index) => (
                <label htmlFor={language.toLowerCase()} key={index}>
                  <input
                    type="checkbox"
                    key={index}
                    id={language.toLowerCase()}
                    value={language.toLowerCase()}
                  />
                  {language}
                </label>
              ))}
            </div>
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
            <select id="edition" defaultValue={"default"}>
              <option value="default"></option>
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
        </aside>{" "}
        <section>
          {!isPopularBooksLoading && (
            <Carousel books={popularBooks!.books.slice(0, 3)} />
          )}
          {!isRecentBooksLoading && (
            <BooksSlider books={recentBooks!.books} title="Recent added" />
          )}
          {!isPopularBooksLoading && (
            <BooksSlider books={popularBooks!.books} title="Most popular" />
          )}
        </section>
      </main>
      <footer className={styles.footer}>adsf</footer>
    </div>
  );
};

export default Home;
