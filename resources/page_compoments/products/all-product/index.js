import { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";
import Category from "../category";
import styles from "./all-product.module.scss";
import Button from "../../../common-components/button";
import productService from "../../../../services/product.service";
import ProductContext from "../context";
import Loading from "../../../common-components/loading";
import CategoryForm from "../category-form";
import AddButton from "../../../common-components/add-button";
import { scrollTo } from "../../../../utils/common";

export default function AllProduct({}) {
  const {
    categories,
    loading,
    onAddCategory,
    onChangeCategory,
    switchProduct,
  } = useContext(ProductContext);
  const [mountedCategoryCount, setMountedCategoryCount] = useState(0);
  const [showAddNewCategoryForm, setShowAddNewCategoryForm] = useState(false);

  const onMountedCategory = () => {
    setMountedCategoryCount((previous) => previous + 1);
  };

  const addNewCategory = () => {
    setShowAddNewCategoryForm(true);
  };

  useEffect(() => {
    if (
      mountedCategoryCount === categories.length &&
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
  }, [mountedCategoryCount]);

  return (
    <div style={{ paddingBottom: "0px" }}>
      <div
        className="kanban-container"
        style={{
          width: "100%",
          marginRight: 0,
          marginLeft: 0,
          paddingTop: "25px",
          marginTop: "25px",
          overflowX: "unset",
        }}
      >
        {loading ? (
          <Loading
            size={undefined}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
        ) : null}
        {categories.map((category, index) => (
          <Category
            key={category.id}
            category={category}
            categoryIndex={index}
            style={{
              marginBottom: index < categories.length - 1 ? "28.67px" : 0,
            }}
            onMounted={onMountedCategory}
            // onChange={(updatedCategory) =>
            //   onChangeCategory && onChangeCategory(index)(updatedCategory)
            // }
            switchProduct={switchProduct}
          />
        ))}
      </div>
      <div className={styles.addCategoryPanel}>
        {showAddNewCategoryForm ? (
          <CategoryForm
            onCancel={() => setShowAddNewCategoryForm(false)}
            onCreated={(newCategory) => {
              onAddCategory && onAddCategory(newCategory);
              setShowAddNewCategoryForm(false);
              scrollTo(`#_${newCategory.id}`);
            }}
          />
        ) : (
          <AddButton
            label="Thêm danh mục mới"
            onClick={addNewCategory}
            style={{ fontSize: "20px", fontWeight: 600 }}
            iconStyle={{ marginRight: "2px" }}
          />
        )}
      </div>
    </div>
  );
}
