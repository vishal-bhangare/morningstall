import { useNavigate } from "react-router-dom";
import Book from "../../../entities/Book";
import styles from "./CarouselItem.module.scss";

interface Props {
  book: Book;
}
const CarouselItem = ({ book }: Props) => {
  const navigator = useNavigate();
  return (
    <div className={styles.box}>
      <div className={styles.carouselItem}>
        <div
          className={styles.bookInfo}
          onClick={() => navigator(`/book/${book._id}`)}
        >
          <span className={styles.name}>{book.name}</span>
          <span className={styles.author}>by {book.author}</span>
        </div>
        <div
          className={styles.cover}
          onClick={() => navigator(`/book/${book._id}`)}
        >
          <img src={book.coverPage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
