import styles from "./category.module.scss";
import ProductItem from "../product-item";
import { useState, useEffect, useRef, useContext } from "react";
import { set } from "lodash";
import BubbleModal from "../../../common-components/modal/bubble-modal";
import ProductEditor from "../product-editor";
import Button from "../../../common-components/button";
import NewProductForm from "../new-product-form";
import ProductsContext from "../context";
import productService from "../../../../services/product.service";
import Popover from "../../../common-components/popover";
import CategoryForm from "../category-form";
import EditProductDialog from "../edit-product-dialog";
import DropDown from "../../../common-components/dropdown";
import { uuidV4 } from "../../../../utils/uuid";
import AddButton from "../../../common-components/add-button";
import { scrollTo } from "../../../../utils/common";

export default function Category({
  className,
  style,
  category,
  categoryIndex,
  onMounted,
  // onChange,
  // switchProduct,
}) {
  const {
    editProduct,
    onChangeCategory,
    onAddProductToCategory,
    onUpdateProductOfCategory,
  } = useContext(ProductsContext);
  const productListRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  // const [localCategory, setLocalCategory] = useState({ ...(category || {}) });
  const [addProductDialogVisible, setAddProductDialogVisible] = useState(false);
  const [newProductFormVisible, setNewProductFormVisible] = useState(false);
  const [categoryNameInputVisible, setCategoryNameInputVisible] = useState(
    false
  );
  const [productForEditing, setProductForEditing] = useState(null);

  const onAddedNewProduct = (product) => {
    setNewProductFormVisible(false);
    onAddProductToCategory && onAddProductToCategory(categoryIndex, product);
    // scrollTo(`._${product.id}`);
    // setLocalCategory((previous) => ({
    //   ...previous,
    //   products: [...(previous.products || []), product],
    // }));
  };

  const onUpdatedProduct = (updatedProduct) => {
    // if (updatedProduct.categoryId!==localCategory.id) {
    //   switchProduct && switchProduct(updatedProduct,productForEditing.index,)
    // }
    // const tempCategory = { ...localCategory };
    // set(tempCategory, ["products", productForEditing.index], updatedProduct);
    // setLocalCategory(tempCategory);
    // setProductForEditing(null);
  };

  const onChangeProductStatus = (productIndex) => (enable) => {
    // const tempCategory = { ...localCategory };
    // set(tempCategory, ["products", productIndex, "enable"], enable);
    // setLocalCategory(tempCategory);
    onUpdateProductOfCategory(categoryIndex, productIndex, {
      ...category.products[productIndex],
      enable,
    });
  };

  // useEffect(() => {
  // mounted && onChange && onChange(localCategory);
  // }, [localCategory]);

  useEffect(() => {
    setMounted(true);
    onMounted && onMounted();
  }, []);

  return (
    <div
      className={styles.container}
      style={style || {}}
      id={`_${category.id}`}
    >
      <div className={styles.title}>
        {categoryNameInputVisible ? (
          <CategoryForm
            category={category}
            onUpdated={(data) => {
              setCategoryNameInputVisible(false);
              onChangeCategory &&
                onChangeCategory(categoryIndex, { ...category, ...data });
              // setLocalCategory((previous) => ({
              //   ...previous,
              //   ...data,
              // }));
            }}
            onCancel={() => setCategoryNameInputVisible(false)}
          />
        ) : (
          <div className={styles.titleViewer}>
            {category.name}
            <DropDown
              options={[
                {
                  id: uuidV4(),
                  label: "Sửa",
                  onClick: () => setCategoryNameInputVisible(true),
                },
              ]}
            />
          </div>
        )}
      </div>
      <div
        ref={productListRef}
        className="kanban-category cf-ce-kanban-category"
        style={{ minHeight: "20px" }}
      >
        {(category?.products || []).map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() =>
              editProduct &&
              editProduct({
                product,
                categoryIndex,
                categoryId: category.id,
                productIndex: index,
              })
            }
            onChangeProductStatus={onChangeProductStatus(index)}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: category.products.length > 0 ? "40px" : "0px",
          marginBottom: "43px",
        }}
      >
        {newProductFormVisible ? (
          <NewProductForm
            className={`_${category.id}-new-product`}
            forCategoryId={category.id}
            onCancel={() => setNewProductFormVisible(false)}
            onCreated={onAddedNewProduct}
          />
        ) : (
          <AddButton
            label="Thêm sản phẩm"
            style={{ fontWeight: "bold" }}
            iconStyle={{ marginRight: "2px" }}
            onClick={() => {
              setNewProductFormVisible(true);
              // scrollTo(`._${category.id}-new-product`);
            }}
          />
        )}
      </div>
      {/* {productForEditing ? (
        <EditProductDialog
          product={productForEditing.product}
          onUpdated={onUpdatedProduct}
          onClose={() => setProductForEditing(null)}
        />
      ) : null} */}
    </div>
  );
}
