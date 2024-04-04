import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Book from "../../../entities/Book";
import styles from "./CarouselItem.module.scss";
import Skeleton from "react-loading-skeleton";

interface Props {
  book?: Book;
  loading?: boolean;
}
const CarouselItem = ({ book, loading }: Props) => {
  const navigator = useNavigate();
  if (loading)
    return (
      <div className={styles.box}>
        <Skeleton height={350} width={528} />
      </div>
    );
  if (!!book && !loading)
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
