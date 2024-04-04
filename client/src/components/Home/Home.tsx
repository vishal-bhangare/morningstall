import { useEffect } from "react";
import Header from "./Header/Header";
import styles from "./Home.module.scss";
import useBooks from "../../hooks/queries/useBooks";
import BooksSlider from "../BooksSlider/BooksSlider";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  const { data: recentBooks, isLoading: isRecentBooksLoading } = useBooks(
    0,
    10,
    { sortBy: "recent_added", sortOrder: "desc" }
  );
  const { data: popularBooks, isLoading: isPopularBooksLoading } = useBooks(
    0,
    10,
    { sortBy: "popularity", sortOrder: "desc" }
  );
  const { data: romanceBooks, isLoading: isRomanceBooksLoading } = useBooks(
    0,
    10,
    { sortBy: "popularity", sortOrder: "desc", genre: "romance" }
  );

  useEffect(() => {}, []);
  return (
    <div className={styles.home}>
      <Header />

      <main>
        <section>
          <Carousel
            books={
              isPopularBooksLoading
                ? [1, 2, 3]
                : popularBooks?.books.slice(0, 3)
            }
            loading={isPopularBooksLoading}
          />

          <BooksSlider
            books={recentBooks?.books}
            title="recent_added"
            filters={{ sortBy: "recent_added", sortOrder: "desc" }}
            loading={isRecentBooksLoading}
          />

          <BooksSlider
            title="popular"
            books={popularBooks?.books}
            filters={{
              sortBy: "popularity",
              sortOrder: "desc",
            }}
            loading={isPopularBooksLoading}
          />
          <BooksSlider
            books={romanceBooks?.books}
            title="Romance"
            filters={{
              sortBy: "popularity",
              sortOrder: "desc",
              genre: "romance",
            }}
            loading={isRomanceBooksLoading}
          />
        </section>
      </main>
      <footer className={styles.footer}>
        Footer not implemented, added soon:{")"}
      </footer>
    </div>
  );
};

export default Home;
