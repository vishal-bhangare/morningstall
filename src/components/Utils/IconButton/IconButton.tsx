import styles from "./IconButton.module.scss";

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  [x: string]: any;
}

const IconButton = ({ name, size = "md", ...otherProps }: Props) => {
  return (
    <button className={styles.iconWrapper} {...otherProps}>
      <i
        className={["fa-solid", `fa-${name}`, styles[`iconBtn_${size}`]].join(
          " "
        )}
      ></i>
    </button>
  );
};

export default IconButton;
