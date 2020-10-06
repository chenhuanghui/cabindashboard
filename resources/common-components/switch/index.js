import { useMemo } from "react";
import shortid from "shortid";

export default function Switch({
  className,
  style,
  checked,
  onChange,
  ...props
}) {
  const switchId = useMemo(() => shortid());

  const onChangeChecked = (e) => {
    onChange && onChange(e.target.checked);
  };

  return (
    <div
      className={`custom-control custom-switch ${className || ""}`}
      style={style || {}}
      {...props}
    >
      <input
        type="checkbox"
        className="custom-control-input"
        id={switchId}
        checked={checked}
        onChange={onChangeChecked}
      />
      <label className="custom-control-label" htmlFor={switchId}></label>
    </div>
  );
}
