import { forwardRef, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import styles from "./input.module.scss";

const Input = forwardRef(
  (
    {
      containerStyle,
      containerClassName,
      labelClassName,
      labelStyle,
      inputClassName,
      inputStyle,
      label,
      type,
      placeholder,
      value,
      autofocus,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const formItemId = useMemo(() => uuidV4());

    return (
      <div
        className={`form-group ${containerClassName || ""}`}
        style={{ ...(containerStyle || {}), marginBottom: "0px" }}
      >
        {label ? (
          <label
            htmlFor={formItemId}
            className={labelClassName || ""}
            style={labelStyle || {}}
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          type={type}
          className={`form-control ${styles.input} ${inputClassName || ""}`}
          style={inputStyle || {}}
          id={formItemId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus={autofocus}
          {...props}
        />
      </div>
    );
  }
);
export default Input;
