import numeral from "numeral";

export const showCurrency = (value) => {
  return numeral(value || 0).format("0,0");
};
