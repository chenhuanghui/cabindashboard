export default function Card({
  style,
  className,
  bodyStyle,
  bodyClassName,
  children,
}) {
  return (
    <div
      className={`card ${className || ""}`}
      style={{
        border: "1px solid #E3EBF6",
        boxSizing: "border-box",
        borderRadius: "10px",
        marginBottom: "0px",
        ...(style || {}),
      }}
    >
      <div
        className={`card-body ${bodyClassName || ""}`}
        style={{
          padding: "16px",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          maxHeight: "unset",
          overflow: "unset",
          ...(bodyStyle || {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}
