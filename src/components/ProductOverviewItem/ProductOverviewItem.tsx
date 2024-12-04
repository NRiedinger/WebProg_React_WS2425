import "./ProductOverviewItem.scss";
import axios from "../../axiosURL";
import { IProduct } from "../../interfaces/ProductInterface";

const ProductOverviewItem = ({ product }: { product: IProduct }) => {
  return (
    <>
      <div className="ProductOverviewItem Grid">
        <div className="ProductOverviewItem__Image">
          <img src={axios.defaults.baseURL + product.href}></img>
        </div>
        <div className="ProductOverviewItem__Info">
          <div className="ProductOverviewItem__Info__Row">{product.name}</div>
          <div className="ProductOverviewItem__Info__Row">{product.price}€</div>
        </div>
      </div>
    </>
  );
};
export default ProductOverviewItem;
