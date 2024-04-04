import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Book from "../../entities/Book";
import styles from "./Carousel.module.scss";
import CarouselItem from "./CarouselItem/CarouselItem";
interface Props {
  books: Book[];
  loading?: boolean;
}

const Carousel = ({ books, loading }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) newIndex = 0;
    else if (newIndex >= books.length) newIndex = books.length - 1;
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((activeIndex + 1) % 3);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);
  return (
    <div className={styles.carousel}>
      <div className={styles.navBtns}>
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          style={{ color: activeIndex == 0 ? "#111111bb" : "#111111" }}
        ></i>
        <i
          className="fa-solid fa-chevron-right"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          style={{
            color: activeIndex === books.length - 1 ? "#111111bb" : "#111111",
          }}
        ></i>
      </div>
      <div
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
        className={styles.inner}
      >
        {books.map((book, index) => (
          <CarouselItem book={book} key={index} loading={loading} />
        ))}
      </div>
      <div className={styles.indicators}>
        {books.map((_item, index) => (
          <i
            className={`fa-regular ${
              index == activeIndex ? "fa-circle-dot" : "fa-circle"
            }`}
            key={index}
          ></i>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
