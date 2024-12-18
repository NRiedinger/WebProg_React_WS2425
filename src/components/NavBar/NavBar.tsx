import { IconContext } from "react-icons";
import logoSvg from "../../assets/logo.svg";
import "./NavBar.scss";

import { Badge } from "primereact/badge";
import { Sidebar } from "primereact/sidebar";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";

import Cookies from "js-cookie";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import SidebarUserContent from "../SidebarUserContent/SidebarUserContent";

import { Toast } from "primereact/Toast";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { AppState, loadCart, setCurrentUser } from "../../reducer/reducer";
import { SidebarCartContent } from "../SidebarCartContent/SidebarCartContent";

declare global {
  interface Window {
    glToastRef: RefObject<Toast>;
    glToggleUserSidebar: (visible: boolean) => void;
    glToggleCartSidebar: (visible: boolean) => void;
  }
}

window.glToastRef = window.glToastRef || {};

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState<boolean>(false);
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const currentUser = useSelector((state: AppState) => state.currentUser);

  const isUserLoggedIn = !!Cookies.get("token");

  window.glToastRef = useRef<Toast>(null);

  useEffect(() => {
    if (isUserLoggedIn) {
      axios
        .post("/getUser", { token: Cookies.get("token") }, { withCredentials: true })
        .then((res) => {
          dispatch(setCurrentUser(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      dispatch(loadCart(JSON.parse(storageCart)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  window.glToggleUserSidebar = (visible: boolean) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setUserVisible(visible);
  };

  window.glToggleCartSidebar = (visible: boolean) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setCartVisible(visible);
  };

  return (
    <>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => window.glToggleCartSidebar(false)}
        header={<h1>Warenkorb</h1>}
      >
        <SidebarCartContent toastRef={window.glToastRef} />
      </Sidebar>

      <Sidebar
        visible={userVisible}
        position="right"
        onHide={() => window.glToggleUserSidebar(false)}
        header={<h1>{isUserLoggedIn ? `${currentUser?.firstname} ${currentUser?.lastname}` : "Anmelden"}</h1>}
      >
        {isUserLoggedIn ? <SidebarUserContent /> : <LoginPage />}
      </Sidebar>

      <div className="NavBar">
        <div className="NavBar__Container">
          <div className="NavBar__Container__Left">
            <div className="NavBar__Item">
              <img
                onClick={() => {
                  navigate("/products");
                }}
                src={logoSvg}
              />
            </div>
          </div>
          <div className="NavBar__Container__Right">
            <div
              className="NavBar__Item"
              id="user-sidebar-button"
              onClick={() => window.glToggleUserSidebar(!userVisible)}
            >
              <IconContext.Provider value={{ size: "3em" }}>
                <FaRegUser />
              </IconContext.Provider>
            </div>
            <div
              className="NavBar__Item"
              id="cart-sidebar-button"
              onClick={() => window.glToggleCartSidebar(!cartVisible)}
            >
              <IconContext.Provider value={{ size: "3em" }}>
                <RiShoppingBag4Line className="p-overlay-badge" />
                {cartItems.length > 0 ? (
                  <Badge value={cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0)}></Badge>
                ) : null}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>

      <Toast ref={window.glToastRef} position="top-left" />
    </>
  );
};
export default NavBar;
