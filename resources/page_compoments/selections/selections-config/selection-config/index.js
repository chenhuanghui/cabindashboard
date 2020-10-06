import { useState, useMemo, useEffect } from "react";
import { isEmpty } from "lodash";
import Input from "../../../../common-components/form/input";
import styles from "./selection-editor.module.scss";
import SelectWithSearch from "../../../../common-components/form/select-with-search";
import Switch from "../../../../common-components/switch";
import Popover from "../../../../common-components/popover";
import Checkbox from "../../../../common-components/form/checkbox";
import AddButton from "../../../../common-components/add-button";
import OptionConfig from "./option-config";
import DropDown from "../../../../common-components/dropdown";
import { uuidV4 } from "../../../../../utils/uuid";
import Card from "../../../../common-components/card";
import OutClick from "../../../../common-components/out-click";
import shortid from "shortid";

export default function SelectionConfig({
  selection,
  selectionIndex,
  style,
  className,
  onCancel,
  onChangeSelection,
  onAddSelection,
  onRemoveSelection,
  onMoveSelectionUp,
  onMoveSelectionDown,
}) {
  const [mounted, setMounted] = useState(false);
  const [localSelection, setLocalSelection] = useState({
    ...(selection || {
      name: "",
      max: 1,
      required: false,
      options: [],
    }),
  });
  const [newOptionKey, setNewOptionKey] = useState(uuidV4());
  const optionKeys = useMemo(
    () => localSelection.options.map((option) => uuidV4()),
    [localSelection.options.length]
  );
  const [selectionNameInputVisible, setSelectionNameInputVisible] = useState(
    localSelection.name.length === 0 ? true : false
  );
  const maxOptions = useMemo(() => {
    const max = 20;
    const options = [];

    for (let index = 1; index <= max; index++) {
      options.push({
        value: index,
        label: `Tối đa ${index} lựa chọn`,
      });
    }

    return options;
  }, []);
  // const [newOptionFormVisible, setNewOptionFormVisible] = useState(false);
  const [uniqueClasses] = useState({
    selectionBox: `_${shortid()}`,
    addButton: `_${shortid()}`,
  });
  const [autoFocusOptionForm, setAutoFocusOptionForm] = useState(false);
  const [newOption, setNewOption] = useState(null);
  const valid = useMemo(() => {
    return localSelection.name.length > 0;
  }, [localSelection.name]);

  const considerToHideSelectionNameInput = (fromEnter) => {
    console.log("consider selectionNameInput", fromEnter);
    if (isEmpty(localSelection.name.trim())) {
      return;
    }
    setSelectionNameInputVisible(false);
    setNewOption(null);
    setAutoFocusOptionForm(fromEnter || false);
    setNewOptionKey(uuidV4());
    // considerToAddNewOption(fromEnter);
  };

  const onChangeSelectionName = (e) => {
    const name = e.target.value;
    setLocalSelection((previous) => ({
      ...previous,
      name,
    }));
  };

  const onChangeMax = (max) =>
    setLocalSelection((previous) => ({
      ...previous,
      max: +max,
    }));

  const onChangeRequired = (required) =>
    setLocalSelection((previous) => ({ ...previous, required }));

  const considerToAddNewOption = (fromEnter = false) => {
    if (newOption && newOption.name.trim() !== "") {
      setLocalSelection({
        ...localSelection,
        options: [...localSelection.options, newOption],
      });
    }

    setAutoFocusOptionForm(fromEnter || false);
    setNewOption(null);
    setNewOptionKey(uuidV4());
    return;
  };

  const onBlurOptionConfig = () => {
    setLocalSelection({
      ...localSelection,
      options: localSelection.options.filter(
        (option) => option.name.trim() !== ""
      ),
    });
  };

  const onChangeOption = (optionIndex) => (option) => {
    console.log("onChangeOption", optionIndex, option);
    setLocalSelection((previous) => {
      const tempLocalSelection = { ...previous };
      tempLocalSelection.options[optionIndex] = option;
      return tempLocalSelection;
    });
  };

  const onChangeNewOption = (option) => setNewOption(option);

  const onRemoveOption = (optionIndex) => () => {
    console.log("remove option", optionIndex, localSelection.options);
    const tempLocalSelection = { ...localSelection };
    tempLocalSelection.options.splice(optionIndex, 1);
    setLocalSelection({
      ...tempLocalSelection,
      max:
        tempLocalSelection.options.length < tempLocalSelection.max
          ? tempLocalSelection.options.length || 1
          : tempLocalSelection.max,
    });
  };

  const considerActions = (changedSelection, fromEnter) => {
    if (selection) {
      if (changedSelection.options.length === 0) {
        onRemoveSelection && onRemoveSelection();
        return false;
      }
      return true;
    } else {
      if (changedSelection.options.length === 0) {
        onCancel && onCancel();
        return false;
      } else {
        onAddSelection && onAddSelection(changedSelection);
        return true;
      }
    }
  };

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (selection) {
      considerActions(localSelection) &&
        onChangeSelection &&
        onChangeSelection({
          ...localSelection,
          name: localSelection.name.trim(),
        });
    }
  }, [localSelection]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <OutClick
      className={styles.wrapper}
      style={{ width: "100%" }}
      onOutClick={selection ? null : () => considerActions(localSelection)}
      exceptionElementSelectors={[
        `.${uniqueClasses.selectionBox}`,
        `.add-selection-button`,
      ]}
    >
      <Card bodyStyle={{ padding: 0 }}>
        <div
          className={`${styles.container} ${className || ""}`}
          style={style || {}}
        >
          <div
            className={`row ml-0 mr-0 align-items-center justify-content-between ${styles.header}`}
            style={{ position: "relative" }}
          >
            <div className={styles.selectionName}>
              {selectionNameInputVisible ? (
                <Input
                  inputClassName={styles.selectionNameInput}
                  autofocus={true}
                  inputStyle={{ height: "28px", padding: "5px 10px" }}
                  inputClassName={`${styles.selectionName} ${
                    valid ? "" : styles.inValid
                  }`}
                  value={localSelection.name}
                  onChange={onChangeSelectionName}
                  onBlur={() => considerToHideSelectionNameInput(false)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      considerToHideSelectionNameInput(true);
                    }
                  }}
                />
              ) : (
                <span
                  className={styles.selectionName}
                  onDoubleClick={() => {
                    setAutoFocusOptionForm(false);
                    setSelectionNameInputVisible(true);
                  }}
                >
                  {localSelection.name}
                </span>
              )}
            </div>
            <div className={styles.utils} style={{ marginRight: "40px" }}>
              <SelectWithSearch
                placeholder="Số lượng chọn tối đa"
                disabled={
                  localSelection.options.length === 0 ||
                  localSelection.options.length === 1
                }
                disabledStyle={{ color: "#6E84A3" }}
                containerStyle={{ width: "150px" }}
                searchInputStyle={{ border: "1px solid #E3EBF6" }}
                selectBoxStyle={{ border: "none" }}
                selectedOptionTextClassName={`${styles.selectedMaxText} ${styles.canClick}`}
                selectionBoxClassName={uniqueClasses.selectionBox}
                value={localSelection.max}
                options={maxOptions.slice(0, localSelection.options.length)}
                onChange={onChangeMax}
              />
              <div
                className={styles.required}
                // style={{ marginRight: "40px", marginLeft: "4px" }}
              >
                <span
                  style={{
                    width: "max-content",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#6E84A3",
                  }}
                >
                  Bắt buộc
                </span>
                <Switch
                  style={{ marginLeft: "6px" }}
                  checked={localSelection.required}
                  onChange={onChangeRequired}
                />
              </div>
            </div>
            <i
              className={styles.moreIcon}
              style={{ position: "absolute", right: "22px" }}
            >
              <DropDown
                options={[
                  ...(selection
                    ? [
                        {
                          id: uuidV4(),
                          label: "Di chuyển lên trên",
                          onClick: onMoveSelectionUp,
                        },
                        {
                          id: uuidV4(),
                          label: "Di chuyển xuống dưới",
                          onClick: onMoveSelectionDown,
                        },
                      ]
                    : []),
                  {
                    id: uuidV4(),
                    label: "Xóa",
                    onClick: selection ? onRemoveSelection : onCancel,
                  },
                ]}
              />
            </i>
          </div>
          <div className={styles.content}>
            {localSelection.options.map((option, index) => (
              <OptionConfig
                key={optionKeys[index]}
                option={option}
                onChangeOption={onChangeOption(index)}
                onRemoveOption={onRemoveOption(index)}
                onBlur={onBlurOptionConfig}
              />
            ))}
            <OutClick style={{ width: "100%" }}>
              <OptionConfig
                key={newOptionKey}
                autoFocusOptionNameInput={autoFocusOptionForm}
                onChangeOption={onChangeNewOption}
                considerToAddOption={considerToAddNewOption}
              />
            </OutClick>
          </div>
        </div>
      </Card>
    </OutClick>
  );
}
