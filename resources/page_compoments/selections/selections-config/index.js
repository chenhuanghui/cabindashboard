import { useEffect, useMemo, useState } from "react";
import { cloneDeep } from "lodash";
import SelectionConfig from "./selection-config";
import styles from "./selections-config.module.scss";
import AddButton from "../../../common-components/add-button";
import { scrollTo } from "../../../../utils/common";
import { uuidV4 } from "../../../../utils/uuid";
import shortid from "shortid";

export default function SelectionsConfig({ selections, onChangeSelections }) {
  const [mounted, setMounted] = useState(false);
  const [localSelections, setLocalSelections] = useState([
    ...(selections || []),
  ]);
  const selectionKeys = useMemo(
    () => localSelections.map((selection) => uuidV4()),
    [localSelections.length]
  );
  const [newSelectionFormVisible, setNewSelectionFormVisible] = useState(false);
  const [uniqueClasses] = useState({
    addButton: `_${shortid()}`,
  });

  const onChangeSelection = (selectionIndex) => (selection) => {
    setLocalSelections((previous) => {
      console.log("on change", selectionIndex, cloneDeep(previous));
      const tempSelections = [...localSelections];
      tempSelections[selectionIndex] = selection;
      return tempSelections;
    });
  };

  const addNewSelection = (selection) => {
    setLocalSelections((previous) => [...previous, selection]);
    setNewSelectionFormVisible(false);
    scrollTo(`.add-selection-button`, `.edit-product-dialog-content`);
  };

  const onRemoveSelection = (selectionIndex) => () => {
    setLocalSelections((previous) => {
      console.log("remove selection", selectionIndex, cloneDeep(previous));
      const tempSelections = [...previous];
      tempSelections.splice(selectionIndex, 1);
      return tempSelections;
    });
  };

  const onMoveSelectionUp = (selectionIndex) => () => {
    if (selectionIndex === 0) {
      return;
    }

    const tempSelections = [...localSelections];
    const tempSelection = tempSelections.splice(selectionIndex, 1)[0];
    tempSelections.splice(selectionIndex - 1, 0, tempSelection);
    setLocalSelections(tempSelections);
  };

  const onMoveSelectionDown = (selectionIndex) => () => {
    if (selectionIndex === localSelections.length - 1) {
      return;
    }

    const tempSelections = [...localSelections];
    const tempSelection = tempSelections.splice(selectionIndex, 1)[0];
    tempSelections.splice(selectionIndex + 1, 0, tempSelection);
    setLocalSelections(tempSelections);
  };

  useEffect(() => {
    console.log("selections", localSelections);
    mounted && onChangeSelections && onChangeSelections(localSelections);
  }, [localSelections]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {localSelections.map((selection, index) => (
        <SelectionConfig
          style={{}}
          key={selectionKeys[index]}
          selection={selection}
          selectionIndex={index}
          onChangeSelection={onChangeSelection(index)}
          onRemoveSelection={onRemoveSelection(index)}
          onMoveSelectionUp={onMoveSelectionUp(index)}
          onMoveSelectionDown={onMoveSelectionDown(index)}
        />
      ))}
      {newSelectionFormVisible ? (
        <SelectionConfig
          className={`_new-selection`}
          onCancel={() => setNewSelectionFormVisible(false)}
          onAddSelection={addNewSelection}
        />
      ) : null}

      <AddButton
        label="Thêm nhóm tùy chọn"
        className={`add-selection-button ${uniqueClasses.addButton}`}
        style={{
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: localSelections.length > 0 ? "50px" : 0,
        }}
        iconStyle={{ marginRight: "2px" }}
        onClick={() => {
          setNewSelectionFormVisible(true);
          scrollTo(`._new-selection`, `.edit-product-dialog-content`);
        }}
      />
    </div>
  );
}
