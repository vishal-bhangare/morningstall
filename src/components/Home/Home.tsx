import styles from "./Home.module.scss";
import BooksGrid from "../BooksGrid/BooksGrid";
import Header from "./Header/Header";
import { Languages, Genres, Editions } from "../../data/BooksData";
import { replaceAll } from "../../common/common";
import { createRef, useEffect, useState } from "react";
import Book from "../../entities/Book";
import { getAllBooks, getBookInfo } from "../../services/books.service";
import BookCard from "../BookCard/BookCard";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const imageList = document.querySelectorAll(".books .wrapper .imageList");
  const imageListRef = createRef<HTMLDivElement>();

  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setBooks(res.data.slice(0, 10));
        setBooksData(res.data.slice(0, 3));
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
        <div className={[styles.recent, styles.imageSlider].join(" ")}>
          <div className={styles.title}>
            Recently added
            <div className={styles.seeAll}>
              See All <i className="fa-regular fa-chevrons-right"></i>
            </div>
          </div>
          <div className={styles.books}>
            <div className={styles.wrapper}>
              <i
                className={[
                  "fa-regular fa-chevron-left ",
                  styles.slideBtn,
                ].join(" ")}
                id={styles["prev"]}
                onClick={() => {
                  const clientWidth = imageListRef.current?.clientWidth!;
                  imageListRef.current?.scrollBy({
                    left: clientWidth * -1,
                    behavior: "smooth",
                  });
                }}
              ></i>
              <div className={styles.imageList} ref={imageListRef}>
                {books.map((book, index) => (
                  <div className={styles.book} key={index}>
                    <img src={book.coverPage} alt="" />
                  </div>
                ))}
              </div>
              <i
                className={[
                  "fa-regular fa-chevron-right ",
                  styles.slideBtn,
                ].join(" ")}
                id={styles["next"]}
                onClick={() => {
                  const clientWidth = imageListRef.current?.clientWidth!;
                  imageListRef.current?.scrollBy({
                    left: clientWidth * 1,
                    behavior: "smooth",
                  });
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className={[styles.MostViewed, styles.imageSlider].join(" ")}>
          <div className={styles.title}>
            Most Viewed
            <div className={styles.seeAll}>
              See All <i className="fa-regular fa-chevrons-right"></i>
            </div>
          </div>
          <div className={styles.books}>
            <div className={styles.wrapper}>
              <i
                className={[
                  "fa-regular fa-chevron-left ",
                  styles.slideBtn,
                ].join(" ")}
                id={styles["prev"]}
                onClick={() => {
                  const clientWidth = imageListRef.current?.clientWidth!;
                  imageListRef.current?.scrollBy({
                    left: clientWidth * -1,
                    behavior: "smooth",
                  });
                }}
              ></i>
              <div className={styles.imageList} ref={imageListRef}>
                {books.map((book, index) => (
                  <div className={styles.book} key={index}>
                    <img src={book.coverPage} alt="" />
                  </div>
                ))}
              </div>
              <i
                className={[
                  "fa-regular fa-chevron-right ",
                  styles.slideBtn,
                ].join(" ")}
                id={styles["next"]}
                onClick={() => {
                  const clientWidth = imageListRef.current?.clientWidth!;
                  imageListRef.current?.scrollBy({
                    left: clientWidth * 1,
                    behavior: "smooth",
                  });
                }}
              ></i>
            </div>
            <div className={styles.sliderScrollbar}>
              <div className={styles.scrollbarTrack}>
                <div className={styles.scrollbarThumb}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>adsf</footer>
    </main>
  );
};

export default Home;
