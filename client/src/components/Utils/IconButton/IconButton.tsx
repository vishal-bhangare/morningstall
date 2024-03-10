import styles from "./IconButton.module.scss";

interface Props {
  name: string;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  [x: string]: any;
}

const IconButton = ({
  name,
  rounded = false,
  size = "md",
  style,
  ...otherProps
}: Props) => {
  return (
    <button
      style={style}
      className={[styles.iconWrapper, rounded ? styles.rounded : null].join(
        " "
      )}
      {...otherProps}
    >
      <i
        className={["fa-solid", `fa-${name}`, styles[`iconBtn_${size}`]].join(
          " "
        )}
      ></i>
    </button>
  );
};

export default IconButton;
