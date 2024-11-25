import "./ProductOverviewItem.scss";

import { IProduct } from "../../interfaces/ProductInterface";

const ProductOverviewItem = ({
  product,
  layout,
}: {
  product: IProduct;
  layout: string;
}) => {
  if (layout === "grid") {
    return (
      <div className="ProductOverviewItem Grid">
        <div className="ProductOverviewItem__Image">
          <img src="/product_example_preview_image.png"></img>
        </div>
        <div className="ProductOverviewItem__Info">
          <div className="ProductOverviewItem__Info__Row">
            {product.productname}
          </div>
          <div className="ProductOverviewItem__Info__Row">
            {product.price.toFixed(2)}€
          </div>
        </div>
      </div>
    );
  } else if (layout === "list") {
    return (
      <div>
        <div className="ProductOverviewItem List">
          <div className="ProductOverviewItem__Image">
            <img src="/product_example_preview_image.png"></img>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductOverviewItem;
