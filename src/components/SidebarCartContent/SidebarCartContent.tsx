import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { IconContext } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { ICartItem } from "../../interfaces/CartItemInterface";
import {
  addItemToCart,
  AppState,
  removeItemFromCart,
} from "../../reducer/reducer";
import "./SidebarCartContent.scss";

export const SidebarCartContent = () => {
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAmountChange = (e: any, item: ICartItem) => {
    if (!item) {
      return;
    }

    dispatch(addItemToCart({ ...item, amount: e.value - item.amount }));
  };

  const onRemoveItem = (item: ICartItem) => {
    dispatch(removeItemFromCart(item.productId));
  };

  const getSumItemPrice = () => {
    return cartItems
      .map((item) => item.price * item.amount)
      .reduce((a, b) => a + b, 0);
  };

  const renderedEmptyCartInfo = (
    <div className="SidebarCartContent__Container__EmptyInfo">
      <span>Dein Warenkorb ist leer.</span>
    </div>
  );

  const renderedCartItems = cartItems.map((item, idx) => {
    return (
      <div key={idx}>
        <div className="SidebarCartContent__Item">
          <div
            className="SidebarCartContent__Item left"
            onClick={() => {
              navigate(`/product/${item.productId}`);
            }}
          >
            <div className="SidebarCartContent__Item__Image">
              <img src={axios.defaults.baseURL + item.href} />
            </div>
            <div className="SidebarCartContent__Item__Info">
              <h2>{item.name}</h2>
              <div>{item.price.toFixed(2)}€</div>
            </div>
          </div>

          <div className="SidebarCartContent__Item right">
            <InputNumber
              className="SidebarCartContent__Item__Amount"
              value={item.amount}
              mode="decimal"
              showButtons
              min={1}
              onValueChange={(e) => onAmountChange(e, item)}
            />
            <Button raised severity="danger" onClick={() => onRemoveItem(item)}>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <FaRegTrashAlt></FaRegTrashAlt>
              </IconContext.Provider>
            </Button>
          </div>
        </div>

        <Divider />
      </div>
    );
  });

  return (
    <div className="SidebarCartContent">
      <div className="SidebarCartContent__Container">
        {cartItems.length > 0 ? renderedCartItems : renderedEmptyCartInfo}
      </div>

      <div className="SidebarCartContent__Footer">
        <Button
          className="SidebarCartContent__Button"
          label={`Zur Kasse - ${getSumItemPrice().toFixed(2)}€`}
          rounded
          disabled={cartItems?.length === 0}
          onClick={() => {
            const isUserLoggedIn = !!Cookies.get("token");
            if (isUserLoggedIn) {
              document.getElementById("cart-sidebar-button")?.click();
              navigate("/checkout");
            } else {
              document.getElementById("cart-sidebar-button")?.click();
              document.getElementById("user-sidebar-button")?.click();
            }
          }}
        />
      </div>
    </div>
  );
};
