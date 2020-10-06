import styles from "./product-item.module.scss";
import Switch from "../../../common-components/switch";
import TextTruncate from "react-text-truncate";
import Truncate from "react-truncate";
import { showCurrency } from "../../../../utils/currency";
import productService from "../../../../services/product.service";
import Card from "../../../common-components/card";
import { useEffect } from "react";

export default function ProductItem({
  className,
  style,
  product,
  onClick,
  onChangeProductStatus,
}) {
  const changeProductStatus = (enable) => {
    productService.updateProduct(product.id, { enable });
    onChangeProductStatus && onChangeProductStatus(enable);
  };

  return (
    <Card
      className={`kanban-item cf-ce-kanban-product ${styles.wrapper} _${product.id}`}
    >
      <div className={`row ml-0 mr-0 ${styles.container}`} onClick={onClick}>
        <div className={`row ml-0 mr-0 p-0 ${styles.imageAndName}`}>
          <img
            alt="product-image"
            src={product.image || "/assets/img/image-placeholder.png"}
            className={styles.image}
          />
          <div className={styles.name}>{product.name}</div>
        </div>
        <div className={`${styles.description}`}>
          <Truncate lines={2} ellipsis={<span>...</span>}>
            {product.description}
          </Truncate>
        </div>
        <div
          className={`row ml-0 mr-0 p-0 ${styles.priceAndEnable}`}
          style={{ justifyContent: "space-between" }}
        >
          <div className={styles.price}>
            <i className={`fe fe-tag ${styles.priceIcon}`} />
            {showCurrency(product.price || 0)}đ
          </div>
          {/* <div className={styles.linkSelection}>Liên kết tùy chọn</div> */}
          <Switch
            checked={product.enable}
            onChange={changeProductStatus}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </Card>
  );
}
