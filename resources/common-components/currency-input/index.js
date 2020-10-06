import { useEffect, useMemo, useRef } from "react";
// import RCurrencyInput from "react-currency-input";
import shortid from "shortid";
import styles from "./currency-input.module.scss";
// import jquery from "jquery";
// import "jquery-mask-plugin/dist/jquery.mask.min";

export default function CurrencyInput({
  className,
  style,
  value,
  defaultValue,
  onChange,
  ...props
}) {
  const id = useMemo(() => `_${shortid()}`);
  const ref = useRef(null);
  const onChangeCurrencyValue = (e, maskedvalue, floatvalue) => {
    onChange && onChange(+maskedvalue);
  };

  useEffect(() => {
    if (ref?.current) {
      $(`#${id}`).mask && $(`#${id}`).mask("#,##0đ", {
        reverse: true,
        placeholder: "0,000đ",
        onChange: (cep) => {
          console.log("CEP", cep);
          onChange && onChange(+cep.replace(",", "").replace("đ", ""));
        },
      });
    }
  }, [ref?.current]);

  return (
    <input
      ref={ref}
      id={id}
      type="text"
      defaultValue={defaultValue || undefined}
      // value={value || undefined}
      // onChange={(e) => {
      //   console.log("OK", e.target.value);
      //   onChange && onChange(+e.target.value);
      // }}
      className={`${styles.currencyInput} ${className || ""}`}
      style={style || {}}
      placeholder="0,000d"
      data-mask="#,##0d"
      data-mask-reverse="true"
    />
  );

  // return (
  //   <RCurrencyInput
  //     type="text"
  //     className={`${styles.currencyInput} ${className || ""}`}
  //     style={style || {}}
  //     value={value}
  //     thousandSeparator=","
  //     precision={0}
  //     suffix="đ"
  //     autoFocus={false}
  //     onChange={onChangeCurrencyValue}
  //     {...props}
  //   />
  // );
}
