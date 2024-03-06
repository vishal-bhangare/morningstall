import styles from "./Button.module.scss";

interface Props {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  mode?: "light" | "dark";
  [x: string]: any;
}

const Button = ({
  children,
  size = "md",
  mode = "light",
  ...otherProps
}: Props) => {
  return (
    <button
      className={[styles.button, mode === "dark" ? styles.darkBtn : ""].join(
        " "
      )}
      style={{
        fontSize: size == "sm" ? "14px" : size == "lg" ? "18px" : "16px",
        padding:
          size == "sm" ? "4px 14px" : size == "lg" ? "10px 20px" : "6px 16px",
      }}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
