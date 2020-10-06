import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import productService from "../../../../services/product.service";
import Button from "../../../common-components/button";
import BubbleModal from "../../../common-components/modal/bubble-modal";
import ProductEditor from "../product-editor";

const checkValidProductToSave = (product) => {
  if (
    !product.categoryId ||
    isEmpty(product.name) ||
    product.price <= 0 ||
    (product.selections || []).some((selection) => isEmpty(selection.name))
  ) {
    return false;
  }

  return true;
};

export default function EditProductDialog({
  product,
  categoryOptions,
  onUpdated,
  onClose,
}) {
  const [localProduct, setLocalProduct] = useState({ ...(product || {}) });
  const [changed, setChanged] = useState(false);

  const onChangeProduct = (newProduct) => {
    setChanged(true);
    setLocalProduct(newProduct);
  };

  const updateProduct = () => {
    if (checkValidProductToSave(localProduct)) {
      productService
        .updateProduct(localProduct.id, localProduct)
        .then((data) => onUpdated && onUpdated(data));
    }
  };

  return (
    <BubbleModal
      contentClassName="edit-product-dialog-content"
      title="Sửa sản phẩm"
      useTrigger={false}
      visible={true}
      buttons={
        <Button
          style={{ height: "31px", padding: "5px 10px" }}
          onClick={updateProduct}
        >
          Lưu
        </Button>
      }
      onClose={() => {
        const saveChange = changed
          ? confirm("Bạn có muốn lại thay đổi không?")
          : false;
        if (saveChange) {
          updateProduct();
        } else {
          onClose && onClose();
        }
      }}
    >
      <ProductEditor
        product={localProduct}
        // categoryOptions={categoryOptions}
        initCategoryId={localProduct.categoryid}
        onChange={onChangeProduct}
      />
    </BubbleModal>
  );
}
