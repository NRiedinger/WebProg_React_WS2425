import { Rating } from "primereact/rating";
import axios from "../../axiosURL";
import { IProduct } from "../../interfaces/ProductInterface";
import "./ProductOverviewItem.scss";

const ProductOverviewItem = ({ product }: { product: IProduct }) => {
  console.log(product);
  return (
    <>
      <div className="ProductOverviewItem Grid">
        <div className="ProductOverviewItem__Image">
          <img src={axios.defaults.baseURL + product.href}></img>
        </div>
        <div className="ProductOverviewItem__Info">
          <div className="ProductOverviewItem__Info__Row">{product.name}</div>
          <div className="ProductOverviewItem__Info__Row">
            <Rating value={product.rating} readOnly cancel={false} />
          </div>
          <div className="ProductOverviewItem__Info__Row">
            {product.price.toFixed(2)}€
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductOverviewItem;
