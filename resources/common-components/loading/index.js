import { Spinner } from "react-bootstrap";

export default function Loading({
  style,
  className,
  variant = "primary",
  size = "sm",
}) {
  return (
    <Spinner
      className={className}
      style={style}
      animation="border"
      variant={variant}
      size={size}
    />
  );
}
