import React, { useEffect, useState } from "react";
import Book from "../../entities/Book";
import { getAllBooks } from "../../services/books.service";
import BookCard from "../BookCard/BookCard";
import styles from "./BooksGrid.module.scss";
const BooksGrid = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setBooksData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.container}>
      {booksData.map((book) => (
        <BookCard book={book} />
      ))}
      {booksData.map((book) => (
        <BookCard book={book} />
      ))}
      {booksData.map((book) => (
        <BookCard book={book} />
      ))}
    </div>
  );
};

export default BooksGrid;
