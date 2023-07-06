import { useState } from "react";
import Book from "../../entities/Book";
import styles from "./BookCard.module.scss";

interface Props {
  book: Book;
}
const BookCard = ({ book }: Props) => {
  const [isFavoriteHovered, setFavoriteHovered] = useState(false);
  return (
    <div className={styles.card}>
      <div
        className={styles.coverPage}
        // style={{
        //   backgroundImage: "url(" + book?.coverPage + ")",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        // }}
      >
        <img src={book.coverPage} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{book.name}</span>{" "}
        <span className={styles.author}>{book.author}</span>
        <span className={styles.about}>{book.about?.slice(0, 100)}</span>
        <div className={styles.bottom}>
          <span className={styles.views}>{book.views} views</span>
          <span
            className={styles.favorite}
            onMouseOver={() => {
              setFavoriteHovered(true);
            }}
            onMouseOut={() => {
              setFavoriteHovered(false);
            }}
          >
            <i
              className={
                "fa-" + (isFavoriteHovered ? "solid" : "regular") + " fa-heart"
              }
            ></i>{" "}
            {book.favorite}4
          </span>
          <span className={styles.pages}>{book?.pages} pages</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
