import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useDispatch, useSelector } from "react-redux";
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

  const onAmountChange = (item: ICartItem) => {
    if (!item) {
      return;
    }

    dispatch(addItemToCart(item));
  };

  const onRemoveItem = (item: ICartItem) => {
    dispatch(removeItemFromCart(item.productId));
  };

  const renderedCartItems = cartItems.map((item, idx) => {
    return (
      <div key={idx} className="SidebarCartContent__Item">
        <div>{item.name}</div>
        <div>
          <InputNumber
            className="SidebarCartContent__Item__Amount"
            value={item.amount}
            mode="decimal"
            showButtons
            min={1}
            onValueChange={() => onAmountChange(item)}
          />
        </div>
        <div>
          <Button
            label="Entfernen"
            severity="danger"
            onClick={() => onRemoveItem(item)}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="SidebarCartContent">
      <h3>Warenkorb:</h3>
      <div className="SidebarCartContent__Container">{renderedCartItems}</div>
    </div>
  );
};
