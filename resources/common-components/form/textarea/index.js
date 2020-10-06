import { useMemo } from "react";
import { uuidV4 } from "../../../../utils/uuid";
import styles from "./textarea.module.scss";

export default function Textarea({
  containerStyle,
  containerClassName,
  labelStyle,
  labelClassName,
  style,
  textareaClassName,
  textareaStyle,
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  ...props
}) {
  const formItemId = useMemo(() => uuidV4());

  return (
    <div
      className={`form-group ${containerClassName || ""}`}
      style={containerStyle || {}}
    >
      <label
        htmlFor={formItemId}
        className={labelClassName || ""}
        style={labelStyle || {}}
      >
        {label}
      </label>
      <textarea
        style={textareaStyle || {}}
        className={`form-control form-control ${styles.textarea} ${
          textareaClassName || ""
        }`}
        data-toggle="autosize"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={3}
        {...props}
      />
    </div>
  );
}
