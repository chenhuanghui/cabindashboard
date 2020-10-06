import styles from "./badge.module.scss";

export default function Badge({ children }) {
  return (
    <div className={`badge badge-soft-success ${styles.cfCeBadge}`}>
      {children}
    </div>
  );
}
