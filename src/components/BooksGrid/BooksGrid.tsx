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
        console.log(res.data);
        setBooksData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.container}>
      {booksData.map((book) => (
        <BookCard book={book} />
      ))}
    </div>
  );
};

export default BooksGrid;
