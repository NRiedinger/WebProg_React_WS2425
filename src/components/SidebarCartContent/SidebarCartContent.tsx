import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/Toast";
import { RefObject } from "react";
import { IconContext } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { ICartItem } from "../../interfaces/CartItemInterface";
import { addItemToCart, AppState, removeItemFromCart } from "../../reducer/reducer";
import "./SidebarCartContent.scss";

export const SidebarCartContent = ({ toastRef }: { toastRef: RefObject<Toast> }) => {
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAmountChange = (e: any, item: ICartItem) => {
    if (!item) {
      return;
    }

    dispatch(addItemToCart({ ...item, quantity: e.value - item.quantity }));
  };

  const onRemoveItem = (item: ICartItem) => {
    dispatch(removeItemFromCart(item.articleId));
  };

  const getSumItemPrice = () => {
    return cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
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
              navigate(`/product/${item.articleId}`);
              /* document.getElementById("cart-sidebar-button")?.click(); */
              window.glToggleCartSidebar(false);
            }}
          >
            <div className="SidebarCartContent__Item__Image">
              <img src={axios.defaults.baseURL + item.href} />
            </div>
            <div className="SidebarCartContent__Item__Info">
              <div>{item.name}</div>
              <div>{item.price.toFixed(2)}€</div>
            </div>
          </div>

          <div className="SidebarCartContent__Item right">
            <InputNumber
              className="SidebarCartContent__Item__Amount"
              value={item.quantity}
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
              /* document.getElementById("cart-sidebar-button")?.click(); */
              window.glToggleCartSidebar(false);
              navigate("/checkout");
            } else {
              /* document.getElementById("cart-sidebar-button")?.click();
              document.getElementById("user-sidebar-button")?.click(); */
              window.glToggleCartSidebar(false);
              window.glToggleUserSidebar(true);
            }
          }}
        />
      </div>
    </div>
  );
};
