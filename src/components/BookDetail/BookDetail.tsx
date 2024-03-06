import { useParams } from "react-router-dom";

import Header from "../Home/Header/Header";
import styles from "./BookDetail.module.scss";
import useBook from "../../hooks/queries/useBook";
import Button from "../Utils/Button/Button";
import BooksSlider from "../BooksSlider/BooksSlider";
import useAllBooks from "../../hooks/queries/useAllBooks";
import Book from "../../entities/Book";

const BookDetail = () => {
  const { id } = useParams();
  const { data: bookdata, isLoading } = useBook(id!);
  const { data, isLoading: similarBooksLoading } = useAllBooks(0);
  const books: Book[] = data?.books;
  const DetailsToBeDisplayed = [
    "author",
    "publication",
    "publicationYear",
    "isbn",
    "genre",
    "pages",
  ];

  return (
    <>
      <Header />
      <main className={styles.content}>
        <section className={styles.detailsWrapper}>
          {!isLoading && (
            <>
              <img
                src={bookdata?.coverPage}
                alt=""
                className={styles.coverpage}
              />
              <div className={styles.details}>
                <span className={styles.name}>{bookdata?.name}</span>
                <div className={styles.other}>
                  {Object.entries(bookdata).map((item: [string, any], i) => {
                    if (DetailsToBeDisplayed.includes(item[0]) && item[1])
                      return (
                        <>
                          <span className={styles.key}>{item[0]}</span>
                          <span className={styles.value}>{item[1]}</span>
                        </>
                      );
                  })}
                </div>
                <div className={styles.actionBtns}>
                  <Button size="lg">Read Now</Button>
                  <Button size="lg" disabled={true}>
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
        <section className={styles.aboutWrapper}>
          <span className={styles.title}>About :</span>
          <span className={styles.about}>
            {bookdata?.about.slice(0, 250)}
            {bookdata?.about.length >= 250 ? "..." : ""}
          </span>
        </section>
        <section className={styles.similarBooks}>
          {!similarBooksLoading && (
            <BooksSlider title={"Similar Books"} books={books} />
          )}
        </section>
        <section className={styles.reviews}>
          <span className={styles.title}>Reviews :</span>
          This section will be added Soon!!
        </section>
      </main>
    </>
  );
};

export default BookDetail;
