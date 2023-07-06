import styles from "./Home.module.scss";
import BooksGrid from "../BooksGrid/BooksGrid";
import Header from "./Header/Header";
const Home = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Header />
      </header>
      <aside className={styles.aside}>asdf</aside>
      <section className={styles.section}>
        <BooksGrid />
      </section>
      <footer className={styles.footer}>adsf</footer>
    </main>
  );
};

export default Home;
