import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../Home/Header/Header";
import Book from "../../entities/Book";
import styles from "./BookDetail.module.scss";

const BookDetail = () => {
  const { id } = useParams();
  const [bookdata, setBookdata] = useState<Book>();
  // getBookInfo(id!)
  //   .then((res) => setBookdata(res.data))
  //   .catch((err) => console.error(err));
  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className={styles.details}>
          <img src={bookdata?.coverPage} alt="" className={styles.coverpage} />
          <div>
            <span className={styles.title}>{bookdata?.name}</span>
            <span className={styles.author}>{bookdata?.author}</span>
            <span className={styles.publication}>{bookdata?.publication}</span>
            <span className={styles.publicationYear}>
              {bookdata?.publicationYear}
            </span>
            <span className={styles.isbn}>{bookdata?.isbn}</span>
            <span className={styles.edition}>{bookdata?.edition}</span>
          </div>
        </div>
        <div className={styles.description}>
          <span className={styles.title}>About</span>
          <span className={styles.about}>{bookdata?.about}</span>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
