import React from "react";
import Book from "../../../entities/Book";
import styles from "./CarouselItem.module.scss";

interface Props {
  book: Book;
}
const CarouselItem = ({ book }: Props) => {
  return (
    <div className={styles.box}>
      <div className={styles.carouselItem}>
        <div className={styles.bookInfo}>
          <span className={styles.name}>{book.name}</span>
          <span className={styles.author}>by {book.author}</span>
        </div>
        <div className={styles.cover}>
          <img src={book.coverPage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
