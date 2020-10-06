import { useState, useEffect, useRef } from "react";
import FilterResults from "react-filter-search";
import OutClick from "../../out-click";
import styles from "./select-with-search.module.scss";
import shortid from "shortid";
import { Dropdown, Overlay } from "react-bootstrap";

export default function SelectWithSearch({
  disabled = false,
  options,
  value,
  placeholder,
  disabledStyle,
  disabledClassName,
  containerClassName,
  containerStyle,
  searchInputClassName,
  searchInputStyle,
  selectBoxClassName,
  selectBoxStyle,
  selectedOptionTextClassName,
  selectedOptionTextStyle,
  selectionBoxClassName,
  selectionBoxStyle,
  enableAddNewWhenNotFound = false,
  showAddNewOptionAllTime,
  onClickAddNewOption,
  onChange,
}) {
  const target = useRef();
  const [inited, setInited] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [uniqueClasses] = useState({
    selectionBox: `_${shortid()}`,
  });

  const onClickOption = (optionValue, option) => {
    onChange && onChange(optionValue, option);
    hideSelection();
  };

  const showSelection = () => {
    if (disabled) {
      return;
    }

    setSearchText("");
    setSelectionVisible(true);
  };

  const hideSelection = () => {
    setSearchText("");
    setSelectionVisible(false);
  };

  return (
    <div
      className={`${styles.container} ${containerClassName || ""}`}
      style={containerStyle || {}}
    >
      <div
        className={`${styles.selectedOption} ${
          selectionVisible ? styles.focus : ""
        } ${selectBoxClassName || ""}`}
        style={{ ...(selectBoxStyle || {}) }}
      >
        <span
          className={`${styles.selectedOptionText} ${
            selectedOptionTextClassName || ""
          }`}
          style={{
            ...(selectedOptionTextStyle || {}),
            ...(disabled ? disabledStyle || {} : {}),
          }}
          onClick={showSelection}
        >
          {searchText.length === 0
            ? options.find((option) => option.value === value)?.label ||
              placeholder ||
              "Chọn một giá trị"
            : ""}
        </span>
        {selectionVisible ? (
          <OutClick
            style={{ width: "100%", height: "100%" }}
            onOutClick={hideSelection}
            exceptionElementSelectors={[`.${uniqueClasses.selectionBox}`]}
          >
            <input
              autoFocus={true}
              className={`${styles.searchInput} ${searchInputClassName || ""}`}
              style={searchInputStyle || {}}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </OutClick>
        ) : null}
      </div>
      <div
        className={`${styles.selection} ${
          selectionVisible ? "d-block" : "d-none"
        } ${selectionBoxClassName || ""} ${uniqueClasses.selectionBox}`}
        style={selectionBoxStyle || {}}
      >
        <ul className="list-group category-list pb-3">
          <FilterResults
            value={searchText}
            data={options}
            renderResults={(results) => {
              if (results.length === 0 && inited) {
                setNotFound(true);
              } else {
                setNotFound(false);
              }

              return results.length > 0
                ? results.map((item, index) => {
                    return (
                      <li
                        className="list-group-item pt-3 pb-2"
                        style={{ border: "none", cursor: "pointer" }}
                        key={item.value}
                        onClick={() => onClickOption(item.value, item)}
                      >
                        <p className="small text-primary mb-0 category-item">
                          {item.label}
                        </p>
                      </li>
                    );
                  })
                : null;
            }}
          />
          {enableAddNewWhenNotFound &&
          searchText.length > 0 &&
          (showAddNewOptionAllTime || notFound) ? (
            <li
              className="list-group-item pt-3 pb-2"
              style={{ border: "none" }}
              onClick={() =>
                onClickAddNewOption && onClickAddNewOption(searchText)
              }
            >
              <p className="small text-primary mb-0 category-item">
                {selectCat}
                <span className="text-focus text-primary">
                  {" "}
                  (Tạo mới danh mục)
                </span>
              </p>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
