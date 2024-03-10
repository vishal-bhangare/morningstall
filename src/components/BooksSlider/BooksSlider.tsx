import React, { createRef } from "react";
import Book from "../../entities/Book";
import styles from "./BooksSlider.module.scss";
import { useNavigate } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import { FiltersI } from "../BooksListing/BooksListing";
import { toTitleCase } from "../../utils/functions";
interface Props {
  title: string;
  books: Book[];
  filters?: FiltersI;
}
const BooksSlider = ({ title, books, filters }: Props) => {
  const imageListRef = createRef<HTMLDivElement>();
  const navigate = useNavigate();
  return (
    <div className={[styles.recent, styles.imageSlider].join(" ")}>
      <div className={styles.title}>
        {toTitleCase(title)}
        <div
          className={styles.seeAll}
          onClick={() => navigate(`/books/${title}`, { state: filters })}
        >
          See All <i className="fa-regular fa-chevrons-right"></i>
        </div>
      </div>
      <div className={styles.books}>
        <i
          className={["fa-regular fa-chevron-left ", styles.slideBtn].join(" ")}
          id={styles["prev"]}
          onClick={() => {
            const clientWidth = imageListRef.current?.clientWidth!;
            imageListRef.current?.scrollBy({
              left: clientWidth * -1,
              behavior: "smooth",
            });
          }}
        ></i>
        <div className={styles.wrapper} ref={imageListRef}>
          <div className={styles.imageList}>
            {books!.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
          </div>
        </div>
        <i
          className={["fa-regular fa-chevron-right ", styles.slideBtn].join(
            " "
          )}
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
  );
};

export default BooksSlider;
