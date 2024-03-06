import styles from "./Home.module.scss";
import BooksGrid from "../BooksGrid/BooksGrid";
import Header from "./Header/Header";
import { Languages, Genres, Editions } from "../../data/BooksData";
import { replaceAll } from "../../common/common";
import { createRef, useEffect, useState } from "react";
import Book from "../../entities/Book";

import BookCard from "../BookCard/BookCard";
import Carousel from "../Carousel/Carousel";
import useAllBooks from "../../hooks/queries/useAllBooks";
import BooksSlider from "../BooksSlider/BooksSlider";

const Home = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  // const [books, setBooks] = useState<Book[]>([]);
  const { data: books, isLoading } = useAllBooks();
  const imageList = document.querySelectorAll(".books .wrapper .imageList");

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
