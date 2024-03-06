import React from "react";
import Book from "../../entities/Book";
import styles from "./BookCard.module.scss";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }: { book: Book }) => {
  const navigator = useNavigate();
  return (
    <div className={styles.book} onClick={() => navigator(`/book/${book._id}`)}>
      <img src={book.coverPage} alt="" />
      <div className={styles.info}>
        <span>{book.name}</span>
        <span className={styles.author}> by {book.author}</span>
      </div>
    </div>
  );
};

export default BookCard;
