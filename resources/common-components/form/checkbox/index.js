import { useMemo } from "react";
import shortid from "shortid";

export default function Checkbox({
  style,
  className,
  labelClassName,
  labelStyle,
  checkboxClassName,
  checkboxStyle,
  label,
  checked,
  onChange,
}) {
  const checkBoxId = useMemo(() => shortid(), []);

  return (
    <div
      className={`custom-control custom-checkbox checklist-control ${
        className || ""
      }`}
      style={style || {}}
    >
      <input
        className="custom-control-input"
        id={checkBoxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="custom-control-label" htmlFor={checkBoxId}></label>
      {label ? <span className="custom-control-caption">{label}</span> : null}
    </div>
  );
}
