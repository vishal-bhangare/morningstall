import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Book from "../../entities/Book";
import styles from "./BookCard.module.scss";

const BookCard = ({
  book,
  isLoading,
}: {
  book?: Book;
  isLoading?: boolean;
}) => {
  const navigator = useNavigate();
  if (isLoading)
    return (
      <div className={styles.book}>
        <Skeleton height={225} width={150} />
      </div>
    );
  if (book)
    return (
      <div
        className={styles.book}
        onClick={() => navigator(`/book/${book._id}`)}
      >
        <img src={book.coverPage} className={styles.coverPage} alt="" />
        <div className={styles.info}>
          <span>{book.name}</span>
          <span className={styles.author}> by {book.author}</span>
        </div>
      </div>
    );
};

export default BookCard;
