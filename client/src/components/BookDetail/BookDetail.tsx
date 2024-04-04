import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Book from "../../entities/Book";
import useBookViewed from "../../hooks/mutations/useBookViewed";
import useBook from "../../hooks/queries/useBook";
import useBooks from "../../hooks/queries/useBooks";
import BooksSlider from "../BooksSlider/BooksSlider";
import Header from "../Home/Header/Header";
import PdfViewer from "../PdfViewer/PdfViewer";
import Button from "../Utils/Button/Button";
import styles from "./BookDetail.module.scss";

const BookDetail = () => {
  const { id } = useParams();
  const [bookUrl, setBookUrl] = useState("");
  const { data: bookdata, isLoading } = useBook(id!);
  const { data, isLoading: similarBooksLoading } = useBooks(0, 10, {
    sortBy: "popularity",
    sortOrder: "desc",
    genre: bookdata?.genre,
  });
  const bookViewedMutation = useBookViewed();
  const books: Book[] = data?.books;
  const DetailsToBeDisplayed = [
    "author",
    "publication",
    "publicationYear",
    "isbn",
    "genre",
    "pages",
  ];
  const resetBookUrl = () => setBookUrl("");

  const handleOnRead = () => {
    setBookUrl(() => bookdata?.pdf);
    bookViewedMutation.mutate(bookdata?._id, {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error),
    });
  };

  useEffect(() => {}, [bookdata]);
  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.wrapper}>
          <section className={styles.detailsWrapper}>
            {!isLoading && (
              <>
                <div className={styles.coverpage}>
                  {" "}
                  <img src={bookdata?.coverPage} alt="" />
                </div>
                <div className={styles.details}>
                  <span className={styles.name}>{bookdata?.name}</span>
                  <div className={styles.other}>
                    {Object.entries(bookdata).map((item: [string, any]) => {
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
                    <Button size="lg" onClick={handleOnRead}>
                      Read Now
                    </Button>
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
            {
              <BooksSlider
                title={"Similar Books"}
                books={books}
                loading={similarBooksLoading}
              />
            }
          </section>
          <section className={styles.reviews}>
            <span className={styles.title}>Reviews :</span>
            This section will be added Soon!!
          </section>
        </div>
        {!!bookUrl && <PdfViewer url={bookUrl} closeModal={resetBookUrl} />}
      </main>
    </>
  );
};

export default BookDetail;
