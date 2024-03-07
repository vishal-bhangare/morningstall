import useAllBooks from "../../hooks/queries/useAllBooks";
import Header from "../Home/Header/Header";
import { replaceAll } from "../../common/common";
import { Editions, Genres, Languages } from "../../data/BooksData";
import styles from "./BooksListing.module.scss";
import BookCard from "../BookCard/BookCard";
import Book from "../../entities/Book";
import IconButton from "../Utils/IconButton/IconButton";
import { useEffect, useState } from "react";

const BooksListing = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useAllBooks(page, 12);
  const N = data?.books.length;
  useEffect(() => {}, [data]);
  return (
    <>
      <Header></Header>
      <main className={styles.container}>
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
        {!isLoading && (
          <section className={styles.booksWrapper}>
            <div
              className={styles.books}
              style={{
                gridTemplateRows: `repeat(${Math.ceil(N / 4)}, 1fr)`,
              }}
            >
              {data.books?.map((book: Book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </div>
            <div className={styles.pagination}>
              <IconButton
                name="chevron-left"
                size="sm"
                disabled={!page ? true : false}
                onClick={() => setPage((page) => page - 1)}
              />
              <div className={styles.pageInfo}>
                {page + 1} of {data.totalPages}
              </div>
              <IconButton
                name="chevron-right"
                size="sm"
                disabled={page + 1 == data.totalPages ? true : false}
                onClick={() => setPage((page) => page + 1)}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default BooksListing;
