import { useState } from "react";
import { useSelector } from "react-redux";
import { get, omit } from "lodash";
import productService from "../../../../services/product.service";
import styles from "./category-form.module.scss";
import Button from "../../../common-components/button";
import Input from "../../../common-components/form/input";
import Card from "../../../common-components/card";
import OutClick from "../../../common-components/out-click";
import Loading from "../../../common-components/loading";

export default function CategoryForm({
  category = null,
  onCreated,
  onUpdated,
  onCancel,
}) {
  const [name, setName] = useState(category?.name || "");
  const [processing, setProcessing] = useState(false);
  const brand = useSelector((state) => get(state, ["userReducer", "brand"]));

  const createOrUpdateCategory = () => {
    if (name.trim() === "") {
      return;
    }

    setProcessing(true);
    if (category && category.name !== name) {
      productService
        .updateCategory(category.id, { name })
        .then((updatedCategory) => {
          setProcessing(false);
          updatedCategory &&
            onUpdated &&
            onUpdated({ ...category, ...omit(updatedCategory, ["products"]) });
        });
    }

    if (!category) {
      productService.createCategory({ name }).then((newCategory) => {
        setProcessing(false);
        newCategory && onCreated && onCreated(newCategory);
      });
    }
  };

  const cancelForm = () => {
    onCancel && onCancel();
  };

  return (
    <OutClick style={{ width: "100%" }} onOutClick={cancelForm}>
      <Card bodyStyle={{ paddingTop: "11px", paddingBottom: "11px" }}>
        <div className={styles.addCategoryForm}>
          <Input
            type="text"
            autofocus={true}
            placeholder="Tên danh mục"
            containerClassName={styles.inputContainer}
            containerStyle={{ paddingLeft: 0 }}
            inputStyle={{
              width: "100%",
              height: "20px",
              border: "none",
              color: "#12263F",
              fontSize: "14px",
              fontWeight: 500,
              padding: 0,
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                createOrUpdateCategory();
              }

              if (e.key === "Escape") {
                cancelForm();
              }
            }}
          />
          <div
            className={`${styles.buttons} ${styles.util} justify-content-end`}
          >
            <Button
              size="small"
              variant="light"
              style={{
                marginRight: "10px",
                height: "31px",
                border: "1px solid #E3EBF6",
                borderRadius: "4px",
                color: "#000",
                padding: "5px 10px",
                minWidth: "unset",
              }}
              disabled={processing}
              onClick={cancelForm}
            >
              Hủy
            </Button>
            <Button
              size="small"
              disabled={processing}
              style={{ height: "31px", padding: "5px 10px", minWidth: "unset" }}
              onClick={createOrUpdateCategory}
            >
              {processing ? <Loading size="sm" /> : category ? "Lưu" : "Tạo"}
            </Button>
          </div>
        </div>
      </Card>
    </OutClick>
  );
}
