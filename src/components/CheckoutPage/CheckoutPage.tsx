import Cookies from "js-cookie";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/Toast";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { ICartItem } from "../../interfaces/CartItemInterface";
import { AppState, clearCart } from "../../reducer/reducer";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const user = useSelector((state: AppState) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = !!Cookies.get("token");
    if (!isUserLoggedIn) {
      /* document.getElementById("user-sidebar-button")?.click(); */
      window.glToggleUserSidebar(true);
      navigate("/");
    }
  }, []);

  const getTotalItemCount = () => {
    return cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  };

  const getSumItemPrice = () => {
    return cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
  };

  const onOrder = () => {
    axios
      .post(
        "/shop/order",
        cartItems.map((item) => {
          return {
            articleId: item.articleId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            href: item.href,
          };
        }),
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        window.glToastRef.current?.show({
          severity: "success",
          detail: res.data,
        });
        dispatch(clearCart());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const listItems = cartItems.map((item: ICartItem, index: number) => {
    return (
      <div key={index} className="CheckoutPage__Container__Item">
        <div className="CheckoutPage__Container__Item__Image">
          <img src={axios.defaults.baseURL + item.href} />
          <Badge value={item.quantity}></Badge>
        </div>

        <div className="CheckoutPage__Container__Item__Name">
          <div>{item.name}</div>
        </div>
        <div className="CheckoutPage__Container__Item__Price">
          <div>{(item.price * item.quantity).toFixed(2)}€</div>
        </div>
      </div>
    );
  });

  return (
    <div className="CheckoutPage">
      <div className="CheckoutPage__Container">
        <div className="CheckoutPage__Container__Left">
          <h2>Lieferadresse</h2>
          <div className="CheckoutPage__Container__Left__Address">
            <span>
              {user?.firstname} {user?.lastname}
            </span>
            <span>{user?.street}</span>
            <span>
              {user?.postcode} {user?.city}
            </span>
            <span>{user?.country}</span>
          </div>

          <div>
            <Button
              raised
              label="Bearbeiten"
              onClick={() => {
                navigate("/account/edit");
              }}
            />
          </div>
        </div>

        <div className="CheckoutPage__Container__Right">
          <div className="CheckoutPage__Container__Right__Content">{listItems.length > 0 ? listItems : null}</div>

          <div className="CheckoutPage__Container__Right__Footer">
            <Divider />

            <div className="CheckoutPage__Container__Right__Footer__Row">
              <div>Zwischensumme ({getTotalItemCount()} Artikel)</div>
              <div>{getSumItemPrice().toFixed(2)}€</div>
            </div>

            <div className="CheckoutPage__Container__Right__Footer__Row">
              <div>Versand</div>
              <div>0.00€</div>
            </div>

            <div className="CheckoutPage__Container__Right__Footer__Row Total">
              <h2>Gesamt (inkl. MwSt)</h2>
              <h2>{getSumItemPrice().toFixed(2)}€</h2>
            </div>

            <Button
              raised
              rounded
              label="Kaufen"
              disabled={listItems.length === 0}
              onClick={() => {
                onOrder();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
