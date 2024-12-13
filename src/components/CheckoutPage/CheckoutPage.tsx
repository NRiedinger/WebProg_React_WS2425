import Cookies from "js-cookie";
import { Badge } from "primereact/badge";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { ICartItem } from "../../interfaces/CartItemInterface";
import { AppState } from "../../reducer/reducer";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const user = useSelector((state: AppState) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = !!Cookies.get("token");
    if (!isUserLoggedIn) {
      document.getElementById("user-sidebar-button")?.click();
      navigate("/");
    }
  }, []);

  const listItems = cartItems.map((item: ICartItem, index: number) => {
    return (
      <div key={index} className="CheckoutPage__Container__Item">
        <div className="CheckoutPage__Container__Item__Image">
          <img src={axios.defaults.baseURL + item.href} />
          <Badge value={item.amount}></Badge>
        </div>

        <div className="CheckoutPage__Container__Item__Name">
          <h2>{item.name}</h2>
        </div>
      </div>
    );
  });

  return (
    <div className="CheckoutPage">
      <div className="CheckoutPage__Container">
        <div className="CheckoutPage__Container__Left">
          <span>
            {user?.firstname} {user?.lastname}
          </span>
          <span>{user?.street}</span>
          <span>
            {user?.postcode} {user?.city}
          </span>
          <span>{user?.country}</span>
        </div>

        <div className="CheckoutPage__Container__Right">{listItems}</div>
      </div>
    </div>
  );
};
export default CheckoutPage;
