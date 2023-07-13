import styles from "./Logo.module.scss";
interface Props {
  color?: string;
}
const Logo = ({ color }: Props) => {
  return (
    <span className={styles.logo} style={{ color: color }}>
      Morningstall
    </span>
  );
};

export default Logo;
