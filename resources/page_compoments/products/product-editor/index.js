import BubbleModal from "../../../common-components/modal/bubble-modal";
import styles from "./product-editor.module.scss";
import { useState, useEffect, useContext } from "react";
import SelectWithSearch from "../../../common-components/form/select-with-search";
import productService from "../../../../services/product.service";
import Input from "../../../common-components/form/input";
import Textarea from "../../../common-components/form/textarea";
import Select from "../../../common-components/form/select";
import SelectionsConfig from "../../selections/selections-config";
import FileUploader from "../../../common-components/file-uploader";
import CurrencyInput from "../../../common-components/currency-input";
import ProductsContext from "../context";

export default function ProductEditor({
  product = null,
  initCategoryId = null,
  onChange,
  onCreatedProduct,
  onUpdatedProduct,
}) {
  const { categories } = useContext(ProductsContext);
  const [mounted, setMounted] = useState(false);
  const [localProduct, setLocalProduct] = useState({
    ...(product || {
      id: null,
      name: "",
      description: "",
      price: 0,
      image: null,
      selections: [],
      categoryId: null,
    }),
  });

  const onUploadedProductImage = (imageInfo) => {
    setLocalProduct((previous) => ({
      ...previous,
      image: imageInfo.url,
    }));
  };

  const onChangeSelections = (selections) =>
    setLocalProduct((previous) => ({
      ...previous,
      selections,
    }));

  useEffect(() => {
    mounted && onChange && onChange(localProduct);
  }, [localProduct]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.container} style={{ marginBottom: "200px" }}>
      <h6
        className="header-pretitle"
        style={{
          fontFamily: "Work Sans",
          fontWeight: 600,
          fontSize: "10px",
          lineHeight: "12px",
          color: "#6E84A3",
          marginBottom: "10.18px",
        }}
      >
        Thông tin
      </h6>

      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label className={`${styles.label}`}>Hình ảnh sản phẩm</label>
        <small
          className={`form-text text-muted ${styles.smallText}`}
          style={{ marginBottom: "16px" }}
        >
          Chọn hình ảnh không quá 1200px * 600px
        </small>
        <div
          className={`${styles.imageUploader} row ml-0 mr-0`}
          id="edit-product-image"
        >
          <img
            style={{
              // width: "190px",
              // height: "190px",
              borderRadius: "6px",
              objectFit: "cover",
              flex: "unset",
            }}
            className={`${styles.imagePreview}`}
            src={localProduct.image || "/assets/img/image-placeholder.png"}
          />
          <FileUploader
            className={`${styles.imagePicker}`}
            onUploaded={onUploadedProductImage}
            containerId="edit-product-image"
          />
        </div>
      </div>

      <Input
        type="text"
        label="Tên sản phẩm*"
        labelClassName={styles.label}
        labelStyle={{ marginBottom: "9px" }}
        inputStyle={{
          fontWeight: 600,
          fontSize: "14px",
          color: "#12263F",
          height: "40px",
        }}
        placeholder="Nhập tên sản phẩm, món ăn, thức uống"
        value={localProduct?.name || ""}
        onChange={(e) => {
          const name = e.target.value;
          setLocalProduct((previous) => ({
            ...previous,
            name,
          }));
        }}
      />

      <Textarea
        containerStyle={{ marginTop: "27px" }}
        label="Mô tả"
        containerStyle={{ marginTop: "26px" }}
        labelClassName={styles.label}
        labelStyle={{ marginBottom: "9px" }}
        textareaStyle={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "14px",
          color: "#12263F",
          height: "100px",
        }}
        value={localProduct.description || ""}
        placeholder="Mô tả về sản phẩm"
        onChange={(e) => {
          const description = e.target.value;
          setLocalProduct((previous) => ({
            ...previous,
            description,
          }));
        }}
      />

      <h6
        className={styles.label}
        style={{
          marginTop: "26px",
          marginBottom: "9px",
        }}
      >
        Giá*
      </h6>
      <CurrencyInput
        style={{
          width: "100%",
          textAlign: "left",
          color: "#000",
          fontWeight: 600,
          fontSize: "14px",
          padding: "11px 14px",
          height: "auto",
        }}
        defaultValue={localProduct?.price || 0}
        onChange={(price) => {
          setLocalProduct((previous) => ({
            ...previous,
            price,
          }));
        }}
      />

      <h6
        className={styles.label}
        style={{ marginTop: "26px", marginBottom: "9px" }}
      >
        Danh mục sản phẩm
      </h6>
      <SelectWithSearch
        placeholder="Chọn danh mục sản phẩm"
        selectBoxStyle={{ fontSize: "14px", color: "#191919", fontWeight: 500 }}
        value={(localProduct?.categoryId || categories||[])[0] || undefined}
        options={(categories||[]).map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        onChange={(categoryId) => {
          // const categoryId = e.target.value;
          setLocalProduct((previous) => ({
            ...previous,
            categoryId,
          }));
        }}
      />

      <h6
        className="header-pretitle"
        style={{
          marginTop: "48.7px",
          fontFamily: "Work Sans",
          fontWeight: 600,
          fontSize: "10px",
          lineHeight: "12px",
          color: "#6E84A3",
          marginBottom: "14.18px",
        }}
      >
        Nhóm Tùy chọn
      </h6>
      <SelectionsConfig
        selections={localProduct.selections || []}
        onChangeSelections={onChangeSelections}
      />
      {/* <div className="card card-option">
        <div className="card-body pt-0 pb-0">
          <div className="row align-items-center border-bottom border-bottom-1 pb-3 pt-3">
            <div className="col-1 col-md-auto pt-1">
              <i className="fe fe-menu"></i>
            </div>
            <div className="col-3 col-md-auto">
              <span className="small text-focus">Chọn cỡ</span>
            </div>
            <div className="col-5 col-md text-center">
              <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
            </div>
            <div className="col-2 col-md-auto text-right">
              <span className="mb-md-0 small text-focus text-primary">
                Chỉnh sửa
              </span>
            </div>
          </div>

          <div className="row align-items-center border-bottom border-bottom-1 pb-3 pt-3">
            <div className="col-1 col-md-auto pt-1">
              <i className="fe fe-menu"></i>
            </div>
            <div className="col-3 col-md-auto">
              <span className="small text-focus">Chọn cỡ</span>
            </div>
            <div className="col-5 col-md text-center">
              <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
            </div>
            <div className="col-2 col-md-auto text-right">
              <span className="mb-md-0 small text-focus text-primary">
                Chỉnh sửa
              </span>
            </div>
          </div>

          <div className="row align-items-center pb-3 pt-3">
            <div className="col-1 col-md-auto pt-1">
              <i className="fe fe-menu"></i>
            </div>
            <div className="col-3 col-md-auto">
              <span className="small text-focus">Chọn cỡ</span>
            </div>
            <div className="col-5 col-md text-center">
              <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
            </div>
            <div className="col-2 col-md-auto text-right">
              <span className="mb-md-0 small text-focus text-primary">
                Chỉnh sửa
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
