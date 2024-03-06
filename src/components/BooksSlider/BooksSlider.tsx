import React, { createRef } from "react";
import Book from "../../entities/Book";
import styles from "./BooksSlider.module.scss";
import { useNavigate } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
interface Props {
  title: string;
  books: Book[];
  tag?: string;
}
const BooksSlider = ({ title, books }: Props) => {
  const imageListRef = createRef<HTMLDivElement>();

  return (
    <div className={[styles.recent, styles.imageSlider].join(" ")}>
      <div className={styles.title}>
        {title}
        <div className={styles.seeAll}>
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
