import React, { useState } from "react";
import Book from "../../entities/Book";
import CarouselItem from "./CarouselItem/CarouselItem";
import styles from "./Carousel.module.scss";

interface Props {
  books: Book[];
}

const Carousel = ({ books }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) newIndex = 0;
    else if (newIndex >= books.length) newIndex = books.length - 1;
    console.log(newIndex);
    setActiveIndex(newIndex);
  };
  return (
    <div className={styles.carousel}>
      <div className={styles.navBtns}>
        {" "}
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        ></i>
        <i
          className="fa-solid fa-chevron-right"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        ></i>
      </div>
      <div
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
        className={styles.inner}
      >
        {books.map((book, index) => (
          <CarouselItem book={book} />
        ))}
      </div>
      <div className={styles.indicators}>
        {books.map((item, index) => (
          <i
            className={`fa-circle ${
              index == activeIndex ? "fa-regular" : "fa-solid"
            }`}
            key={index}
          ></i>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
