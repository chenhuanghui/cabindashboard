import { useMemo } from "react";
import { uuidV4 } from "../../../../utils/uuid";

export default function Select({
  labelStyle,
  labelClassName,
  options,
  label,
  value,
  placeholder,
  onChange,
}) {
  const formItemId = useMemo(() => uuidV4());

  return (
    <div className="form-group">
      <label
        htmlFor={formItemId}
        className={labelClassName || ""}
        style={labelStyle || {}}
      >
        {label}
      </label>
      <select
        className="custom-select custom-select-sm"
        data-toggle="select"
        data-options='{"minimumResultsForSearch": -1}'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
