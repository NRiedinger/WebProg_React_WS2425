import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../axiosURL";
import { IProduct } from "../../interfaces/ProductInterface";
import { addItemToCart } from "../../reducer/reducer";
import "./ProductDetailPage.scss";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/shop/article/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onAddItemToCart = () => {
    if (!product) {
      return;
    }
    dispatch(
      addItemToCart({
        articleId: product._id,
        name: product.name,
        price: product.price,
        href: product.href,
        quantity: 1,
      })
    );
  };

  const renderStockAmountText = () => {
    if (!product) {
      return;
    }

    if (product.quantity <= 5) {
      return (
        <span className="stock-low">Nur noch {product.quantity} verfügbar</span>
      );
    }

    return <span className="stock-normal">Auf Lager</span>;
  };

  const renderItem = () => {
    if (!product) {
      // Todo: add skeleton
      return <></>;
    }

    return (
      <>
        <div className="ProductDetailPage">
          <div className="ProductDetailPage__Container">
            <div className="ProductDetailPage__Container__Row Overview">
              <div className="ProductDetailPage__Container__Row__Image">
                <img
                  src={axios.defaults.baseURL + product.href}
                  alt={product.href}
                />
              </div>
              <div className="ProductDetailPage__Container__Row__Info">
                <div>
                  <Rating value={product.rating} readOnly cancel={false} />
                </div>
                <div>
                  <h1>{product.name}</h1>
                </div>
                <div>{product.shortdescription}</div>
                <div>
                  <h2>{product.price.toFixed(2)}€</h2>
                </div>
                <div>{renderStockAmountText()}</div>
                <div>
                  <Button
                    raised
                    onClick={onAddItemToCart}
                    label="In den Warenkorb"
                  />
                </div>
              </div>
            </div>
            <div className="ProductDetailPage__Container__Row Description">
              <h2>Beschreibung</h2>
              <span>{product.description}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{renderItem()}</>;
};
export default ProductDetailPage;
