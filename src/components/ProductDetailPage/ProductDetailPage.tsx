import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosURL";
import { IProduct } from "../../interfaces/ProductInterface";
import "./ProductDetailPage.scss";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    axios
      .get(`/shop/article/${id}`)
      .then((res) => {
        setTimeout(() => {
          setProduct(res.data);
        }, 1000);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderItem = () => {
    if (!product) {
      // Todo: add skeleton
      return <>Nix</>;
    }

    return (
      <>
        <div className="ProductDetailPage">
          <div className="ProductDetailPage__Container">
            <div className="ProductDetailPage__Container__Row Overview">
              <div className="ProductDetailPage__Container__Row__Image">
                <img src={axios.defaults.baseURL + product.href}></img>
              </div>
              <div className="ProductDetailPage__Container__Row__Info">
                <div>
                  <Rating value={product.rating} readOnly cancel={false} />
                </div>
                <div>
                  <h1>{product.name}</h1>
                </div>
                <div>
                  <h2>{product.price.toFixed(2)}€</h2>
                </div>
                <div>
                  <h4>noch {product.quantity} verfügbar</h4>
                </div>
                <div>
                  <Button label="In den Warenkorb" />
                </div>
                <div>{product.shortdescription}</div>
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
