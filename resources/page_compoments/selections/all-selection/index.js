import { useState, useEffect, useContext } from "react";
import Category from "../selection";
import styles from "./all-selection.module.scss";
import Button from "../../../common-components/button";
import SelectionsContext from "../context";

export default function AllSelection({}) {
  const { selections } = useContext(SelectionsContext);
  const [mountedSelectionCount, setMountedSelectionCount] = useState(0);
  const [addNewSelectionFormVisible, setAddNewSelectionFormVisible] = useState(
    false
  );

  const onMountedSelection = () => {
    setMountedSelectionCount((previous) => previous + 1);
  };

  const addNewSelection = () => setAddNewSelectionFormVisible(true);

  useEffect(() => {
    if (
      mountedSelectionCount === selections.length &&
      typeof Draggable !== "undefined"
    ) {
      const sortable = new Draggable.Sortable(
        document.querySelectorAll(".cf-ce-kanban-category"),
        {
          draggable: ".cf-ce-kanban-product",
          mirror: {
            constrainDimensions: true,
          },
        }
      );
    }
  }, [mountedSelectionCount]);

  return (
    <div style={{ paddingBottom: "100px" }}>
      <div
        // className="kanban-container"
        style={{
          width: "100%",
          marginRight: 0,
          marginLeft: 0,
          paddingTop: "25px",
          marginTop: "25px",
          overflowX: "unset",
        }}
      >
        {selections.map((category) => (
          <Category
            key={category.id}
            category={category}
            style={{ marginBottom: "10px" }}
            onMounted={onMountedSelection}
          />
        ))}
      </div>
      <div className={styles.addCategoryPanel}>
        {showAddNewCategoryForm ? (
          <div className={styles.addCategoryForm}>
            <input
              style={{ marginRight: "20px", padding: "0px 10px" }}
              type="text"
              className="form-control form-control-sm form-control-flush form-control-auto text-muted"
              data-toggle="flatpickr"
              placeholder="Tên danh mục"
            />
            <div className={styles.buttons}>
              <Button
                size="small"
                variant="secondary"
                style={{ marginRight: "4px", height: "31px" }}
                onClick={() => setAddNewSelectionFormVisible(false)}
              >
                Hủy
              </Button>
              <Button size="small" style={{ height: "31px" }}>
                Tạo
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.addProductButton} onClick={addNewSelection}>
            <i className={`fe fe-plus`} style={{ marginRight: "6px" }} />
            Thêm danh mục mới
          </div>
        )}
      </div>
    </div>
  );
}
