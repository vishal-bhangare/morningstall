import useBooks from "../../hooks/queries/useBooks";
import Header from "../Home/Header/Header";
import { replaceAll, toTitleCase } from "../../utils/functions";
import styles from "./BooksListing.module.scss";
import BookCard from "../BookCard/BookCard";
import Book from "../../entities/Book";
import IconButton from "../Utils/IconButton/IconButton";
import { useEffect, useState } from "react";

import useFilters from "../../hooks/queries/useFilters";
import { useLocation } from "react-router-dom";

export interface FiltersI {
  sortBy?: string;
  sortOrder?: string;
  language?: string[];
  genre?: string;
}

const BooksListing = () => {
  const { state } = useLocation();
  const [page, setPage] = useState(0);
  const { data: Filters, isLoading } = useFilters();
  const [filters, setFilters] = useState<FiltersI>({
    sortBy: "recent_added",
    sortOrder: "desc",
    genre: "",
    language: [],
    ...state,
  });
  const { data, isLoading: isBooksLoading } = useBooks(page, 12, filters);
  const N = data?.books.length;

  const handleChange = (e: any) => {
    if (e.target.type === "checkbox" && e.target.checked) {
      setFilters((filters) => ({
        ...filters,
        [e.target.name]: [...filters?.language!, e.target.value],
      }));
    } else if (e.target.type === "checkbox" && !e.target.checked) {
      setFilters((filters) => ({
        ...filters,
        [e.target.name]: filters.language!.filter(
          (item) => item !== e.target.value
        ),
      }));
    } else {
      setFilters((filters) => ({
        ...filters,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    console.log(filters);
  }, [data, filters]);
  return (
    <>
      <Header></Header>
      <main className={styles.container}>
        <aside className={styles.aside}>
          <form>
            <label htmlFor="sortBy">Sort By:</label>
            <select
              name="sortBy"
              defaultValue={filters.sortBy}
              onChange={handleChange}
            >
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
                      name="language"
                      id={language.toLowerCase()}
                      value={language.toLowerCase()}
                      onChange={handleChange}
                    />
                    {language}
                  </label>
                ))}
            </div>
            <label htmlFor="genre">Genre</label>
            <select
              name="genre"
              onChange={handleChange}
              defaultValue={filters.genre}
            >
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
        {!isBooksLoading && (
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
