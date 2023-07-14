import styles from "./Logo.module.scss";
interface Props {
  color?: string;
  font_size?: string;
}
const Logo = ({ color, font_size }: Props) => {
  return (
    <span className={styles.logo} style={{ color: color, fontSize: font_size }}>
      Morningstall
    </span>
  );
};

export default Logo;
