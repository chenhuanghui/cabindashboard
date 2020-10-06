import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import styles from "./option-config.module.scss";
import CurrencyInput from "../../../../../common-components/currency-input";
import Checkbox from "../../../../../common-components/form/checkbox";
import Input from "../../../../../common-components/form/input";
import shortid from "shortid";

export default function OptionConfig({
  autoFocusOptionNameInput = false,
  option,
  onChangeOption,
  onRemoveOption,
  onAddNew,
  onCancel,
  considerToAddOption,
  onBlur,
}) {
  const inputRef = useRef();
  const [inited, setInited] = useState(false);
  const [localOption, setLocalOption] = useState({
    ...(option || {
      id: null,
      name: "",
      enable: true,
      price: 0,
    }),
  });
  const [optionNameInputVisible, setOptionNameInputVisible] = useState(false);
  const [autoFocus, setAutoFocus] = useState(autoFocusOptionNameInput || false);
  const [uniqueClasses] = useState({
    checkBox: `_${shortid()}`,
  });

  const showOptionNameInput = () => {
    setAutoFocus(true);
    setOptionNameInputVisible(true);
  };

  const hideOptionNameInput = () => setOptionNameInputVisible(false);

  const considerActions = (fromEnter) => {
    if (option) {
      if (isEmpty(localOption.name)) {
        onRemoveOption && onRemoveOption();
      } else {
        hideOptionNameInput();
      }
    } else {
      if (isEmpty(localOption.name)) {
        onCancel && onCancel();
      } else {
        onAddNew && onAddNew(localOption, fromEnter);
      }
    }
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setLocalOption((previous) => ({
      ...previous,
      name,
    }));
  };

  const onChangeEnable = (e) => {
    const enable = e.target.checked;
    setLocalOption((previous) => ({
      ...previous,
      enable,
    }));
  };

  const onChangePrice = (price) => {
    setLocalOption((previous) => ({ ...previous, price: +price }));
  };

  useEffect(() => {
    inited && onChangeOption && onChangeOption(localOption);
  }, [localOption]);

  useEffect(() => {
    setInited(true);
  }, []);

  return (
    <div
      className={`${styles.container} row align-items-center border-bottom border-bottom-1 pb-3 pt-3`}
      style={{
        padding: "20px",
        marginLeft: "0",
        marginRight: 0,
        justifyContent: "stretch",
        flexWrap: "unset",
      }}
    >
      <div className={`${styles.icon}`} style={{ width: "15px" }}>
        <i
          className="fe fe-menu"
          style={{
            visibility: option ? "visible" : "hidden",
          }}
        />
      </div>
      <div
        className={`${styles.name}`}
        style={{ marginLeft: "30.5px", width: "100%", marginRight: "10px" }}
      >
        <span className={`small text-focus ${styles.optionName}`}>
          {optionNameInputVisible || !option ? (
            <Input
              ref={inputRef}
              inputClassName={styles.optionNameInput}
              autofocus={autoFocus}
              value={localOption.name}
              onChange={onChangeName}
              onBlur={() => {
                if (option) {
                  setOptionNameInputVisible(false);
                  onBlur && onBlur();
                } else {
                  considerToAddOption && considerToAddOption();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  if (option) {
                    if (localOption.name === "") {
                      return;
                    }
                    setOptionNameInputVisible(false);
                    onBlur && onBlur();
                  } else {
                    considerToAddOption && considerToAddOption(true);
                  }
                }
              }}
              placeholder="Thêm tùy chọn"
            />
          ) : (
            <span
              className={styles.optionNameText}
              style={{ minWidth: "20px" }}
              onDoubleClick={showOptionNameInput}
            >
              {localOption.name || "  "}
            </span>
          )}
        </span>
      </div>
      {/* <div className="col-auto text-center"></div> */}
      <div className="" style={{ width: "100px" }}>
        {option ? (
          <span className="mb-md-0 text-muted small">
            <CurrencyInput
              defaultValue={localOption.price}
              style={{
                width: "100px",
                fontSize: "14px",
                border: "none",
                color: localOption.price > 0 ? "#1F2D3D" : "#95AAC9",
              }}
              onChange={onChangePrice}
            />
          </span>
        ) : null}
      </div>
      <div className="" style={{ width: "16px", marginLeft: "50px" }}>
        {option ? (
          <Checkbox
            className={uniqueClasses.checkBox}
            checked={localOption.enable}
            onChange={onChangeEnable}
          />
        ) : null}
      </div>
    </div>
  );
}
