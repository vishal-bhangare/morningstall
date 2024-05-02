import styles from "./Footer.module.scss";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Logo color="#111" />
      <div className={styles.links}>
        <a href="#" className={styles.link}>
          FAQ
        </a>
        <a href="#" className={styles.link}>
          Help
        </a>
        <a href="#" className={styles.link}>
          Terms and Conditions
        </a>
      </div>
      <span className={styles.copyright}>@2024 MorningStall</span>
    </div>
  );
};

export default Footer;
