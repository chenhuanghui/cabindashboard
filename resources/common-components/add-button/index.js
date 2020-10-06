import styles from "./add-button.module.scss";

export default function AddButton({
  style,
  className,
  iconStyle,
  iconClassName,
  label,
  onClick,
}) {
  return (
    <div
      className={`${styles.addButton} ${className || ""}`}
      style={style || {}}
      onClick={onClick}
    >
      <i
        className={`fe fe-plus ${iconClassName || ""}`}
        style={{ marginRight: "4px", ...(iconStyle || {}) }}
      />
      {label}
    </div>
  );
}
