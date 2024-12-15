import { Rating } from "primereact/rating";
import { IconContext } from "react-icons";
import { BiCartAdd } from "react-icons/bi";
import { useDispatch } from "react-redux";
import axios from "../../axiosURL";
import { IProduct } from "../../interfaces/ProductInterface";
import { addItemToCart } from "../../reducer/reducer";
import "./ProductOverviewItem.scss";

const ProductOverviewItem = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const onAddItemToCart = (e: React.MouseEvent) => {
    if (!product) {
      return;
    }

    dispatch(
      addItemToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        href: product.href,
        amount: 1,
      })
    );

    e.stopPropagation();
  };

  return (
    <>
      <div className="ProductOverviewItem">
        <div className="ProductOverviewItem__Image">
          <img src={axios.defaults.baseURL + product.href} />
        </div>
        <div className="ProductOverviewItem__Info">
          <div className="ProductOverviewItem__Info__Row name">
            {product.name}
          </div>
          <div className="ProductOverviewItem__Info__Row rating">
            <Rating value={product.rating} readOnly cancel={false} />
          </div>
          <div className="ProductOverviewItem__Info__Row price">
            {product.price.toFixed(2)}€
          </div>
        </div>
        <div
          className="ProductOverviewItem__AddToBasket"
          onClick={(e) => {
            onAddItemToCart(e);
          }}
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <BiCartAdd />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};
export default ProductOverviewItem;
