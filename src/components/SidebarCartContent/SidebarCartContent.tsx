import { Button } from "primereact/button";
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

  const renderedEmptyCartInfo = (
    <div className="SidebarCartContent__Container__EmptyInfo">
      <span>Dein Warenkorb ist leer.</span>
    </div>
  );

  const renderedCartItems = cartItems.map((item, idx) => {
    return (
      <div key={idx} className="SidebarCartContent__Item">
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
            <div>{item.name}</div>
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
          <Button severity="danger" onClick={() => onRemoveItem(item)}>
            <IconContext.Provider value={{ size: "1.5em" }}>
              <FaRegTrashAlt></FaRegTrashAlt>
            </IconContext.Provider>
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="SidebarCartContent">
      <div>
        <div className="SidebarCartContent__Container">
          {cartItems.length > 0 ? renderedCartItems : renderedEmptyCartInfo}
        </div>
      </div>

      {cartItems.length > 0 ? (
        <Button
          label={`Zur Kasse - ${cartItems
            .map((item) => item.amount * item.price)
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}€`}
          rounded
        />
      ) : null}
    </div>
  );
};
