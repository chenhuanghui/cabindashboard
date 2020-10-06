import styles from "./button.module.scss";

export default function Button({
  className,
  style,
  size,
  variant = "primary",
  children,
  onClick,
  disabled,
}) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        !disabled && onClick && onClick();
      }}
      style={{ width: "auto", ...(style || {}) }}
      className={`btn btn-inline-block btn-${variant} ${
        size === "large" ? "btn-lg" : size === "small" ? "btn-sm" : ""
      } ${className || ""} ${styles.cfCeButton}`}
    >
      {children}
    </a>
  );
}
