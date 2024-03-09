import { useEffect } from "react";
import { replaceAll, toTitleCase } from "../../utils/functions";
import Header from "./Header/Header";
import styles from "./Home.module.scss";

import useBooks from "../../hooks/queries/useBooks";
import useFilters from "../../hooks/queries/useFilters";
import BooksSlider from "../BooksSlider/BooksSlider";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const { data: recentBooks, isLoading: isRecentBooksLoading } = useBooks(
    0,
    10,
    { sortBy: "recent_added", sortOrder: "desc" }
  );
  const { data: popularBooks, isLoading: isPopularBooksLoading } = useBooks(
    0,
    10,
    { sortBy: "popularity", sortOrder: "desc" }
  );
  const { data: Filters, isLoading } = useFilters();
  useEffect(() => {}, []);
  return (
    <div className={styles.home}>
      <Header />

      <main>
        <aside className={styles.aside}>
          <form>
            <label htmlFor="sortBy">Sort By:</label>
            <select defaultValue="default">
              {!isLoading &&
                Filters.sortBy.map((item: string, i: number) => (
                  <option value={item} key={i}>
                    {toTitleCase(item)}
                  </option>
                ))}
            </select>
            <label htmlFor="languages">Language:</label>
            <div id={styles.languages}>
              {!isLoading &&
                Filters.language.map((language: string, i: number) => (
                  <label htmlFor={language.toLowerCase()} key={i}>
                    <input
                      type="checkbox"
                      key={i}
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
              {!isLoading &&
                Filters.genre.map((genre: string, i: number) => (
                  <option
                    key={i}
                    value={replaceAll(genre.toLowerCase(), " ", "_")}
                  >
                    {toTitleCase(genre)}
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
