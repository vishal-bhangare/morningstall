import { useEffect } from "react";
import { replaceAll } from "../../common/common";
import { Editions, Genres, Languages } from "../../data/BooksData";
import Book from "../../entities/Book";
import Header from "./Header/Header";
import styles from "./Home.module.scss";

import useAllBooks from "../../hooks/queries/useAllBooks";
import BooksSlider from "../BooksSlider/BooksSlider";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const { data, isLoading } = useAllBooks(0);
  const books: Book[] = data?.books;
  useEffect(() => {
    // getAllBooks()
    //   .then((res) => {
    //     setBooks(res.data.slice(0, 10));
    //     setBooksData(res.data.slice(0, 3));
    //   })
    //   .catch((err) => console.log(err));
  }, []);
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
          {!isLoading && <Carousel books={books!.slice(0, 3)} />}
          {!isLoading && <BooksSlider books={books!} title="Recent added" />}
          {!isLoading && <BooksSlider books={books!} title="Most readed" />}
        </section>
      </main>
      <footer className={styles.footer}>adsf</footer>
    </div>
  );
};

export default Home;
