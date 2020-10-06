import { useState } from "react";
import { isEmpty } from "lodash";
import styles from "./new-product-form.module.scss";
import Button from "../../../common-components/button";
import CurrencyInput from "../../../common-components/currency-input";
import Input from "../../../common-components/form/input";
import productService from "../../../../services/product.service";
import Card from "../../../common-components/card";
import OutClick from "../../../common-components/out-click";

export default function NewProductForm({
  className,
  forCategoryId,
  onCancel,
  onCreated,
}) {
  // const [valid, setValid] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [product, setProduct] = useState(productService.createProductSample());

  const createNewProduct = () => {
    if (isEmpty(product.name.trim()) || product.price <= 0) {
      // setValid(false);
      return;
    }

    setProcessing(true);
    productService
      .createProduct(forCategoryId, { ...product, name: product.name.trim() })
      .then((newProduct) => {
        setProcessing(false);
        newProduct && onCreated && onCreated(newProduct);
      });
    setProduct({ name: "", price: 0 });
  };

  const cancelForm = () => onCancel && onCancel();

  return (
    <OutClick onOutClick={cancelForm}>
      <Card
        className={className || ""}
        bodyStyle={{ paddingTop: "11px", paddingBottom: "11px" }}
      >
        <div className={`row align-items-center ml-0 mr-0`}>
          <Input
            autofocus={true}
            value={product.name}
            placeholder="Tên sản phẩm"
            onChange={(e) => {
              const name = e.target.value;
              setProduct((previous) => ({
                ...previous,
                name,
              }));
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                createNewProduct();
              }

              if (e.key === "Escape") {
                cancelForm();
              }
            }}
            inputStyle={{
              height: "20px",
              border: "none",
              padding: 0,
              color: "#12263F",
              fontSize: "14px",
              fontWeight: 500,
            }}
            // containerStyle={{ maxWidth: "100%" }}
            containerClassName={styles.inputContainer}
          />
          <div
            className={`row align-items-center ml-0 mr-0 ${styles.util}`}
            // style={{ minWidth: "250px" }}
          >
            <div
              className={`row align-items-center ml-0`}
              style={{ marginRight: "4px" }}
            >
              <i
                className="fe fe-tag"
                style={{ marginRight: "7.12px", color: "#95AAC9" }}
              />
              <CurrencyInput
                defaultValue={product.price}
                style={{
                  width: "100px",
                  textAlign: "left",
                  border: "none",
                  height: "19px",
                }}
                onChange={(price) =>
                  setProduct((previous) => ({
                    ...previous,
                    price: +price,
                  }))
                }
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    createNewProduct();
                  }

                  if (e.key === "Escape") {
                    cancelForm();
                  }
                }}
              />
            </div>
            <div className={`row align-items-center ml-0 mr-0`}>
              <Button
                variant="light"
                disabled={processing}
                style={{
                  height: "28px",
                  color: "#12263F",
                  marginRight: "10px",
                  padding: "5px 10px",
                  minWidth: "unset",
                  borderColor: "#E3EBF6",
                }}
                onClick={cancelForm}
              >
                Hủy
              </Button>
              <Button
                disabled={processing}
                style={{
                  height: "28px",
                  padding: "5px 10px",
                  minWidth: "unset",
                }}
                onClick={createNewProduct}
              >
                Tạo
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </OutClick>
  );
}
