import styles from "./Home.module.scss";
import BooksGrid from "../BooksGrid/BooksGrid";
import Header from "./Header/Header";
import { Languages, Genres, Editions } from "../../data/BooksData";
import { replaceAll } from "../../common/common";
import { useEffect, useState } from "react";
import Book from "../../entities/Book";
import { getAllBooks, getBookInfo } from "../../services/books.service";
import BookCard from "../BookCard/BookCard";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setBooksData(res.data.slice(0, 3));
        console.log(booksData);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Header />
      </header>
      {/* <aside className={styles.aside}>
        <form>
          <label htmlFor="sortBy">Sort By:</label>
          <select>
            <option selected></option>
            <option value="added">Added Date</option>
            <option value="published">Published Date</option>
            <option value="popularity">Popularity</option>
          </select>
          <label htmlFor="languages">Language:</label>
          <div id={styles.languages}>
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
      </aside> */}
      <section className={styles.section}>
        <Carousel books={booksData} />
      </section>
      <footer className={styles.footer}>adsf</footer>
    </main>
  );
};

export default Home;
