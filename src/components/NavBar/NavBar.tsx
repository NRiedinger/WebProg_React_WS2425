import { IconContext } from "react-icons";
import logoSvg from "../../assets/logo.svg";
import "./NavBar.scss";

import { Badge } from "primereact/badge";
import { Sidebar } from "primereact/sidebar";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import SidebarUserContent from "../SidebarUserContent/SidebarUserContent";

import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { AppState, loadCart, setCurrentUser } from "../../reducer/reducer";
import { SidebarCartContent } from "../SidebarCartContent/SidebarCartContent";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState<boolean>(false);
  const cartItems = useSelector((state: AppState) => state.cartItems);
  const currentUser = useSelector((state: AppState) => state.currentUser);

  const isUserLoggedIn = !!Cookies.get("token");

  const sidebarCartRef = useRef(null);

  useEffect(() => {
    if (isUserLoggedIn) {
      axios
        .post(
          "/getUser",
          { token: Cookies.get("token") },
          { withCredentials: true }
        )
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

  const onUserSidebarToggle = (visible: boolean = !userVisible) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setUserVisible(!userVisible);
  };

  const onCartSidebarToggle = (visible: boolean = !cartVisible) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setCartVisible(!cartVisible);
  };

  return (
    <>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => onCartSidebarToggle(false)}
        header={<h1>Warenkorb</h1>}
        ref={sidebarCartRef}
      >
        <SidebarCartContent />
      </Sidebar>

      <Sidebar
        visible={userVisible}
        position="right"
        onHide={() => onUserSidebarToggle(false)}
        header={
          <h1>
            {isUserLoggedIn
              ? `${currentUser?.firstname} ${currentUser?.lastname}`
              : "Anmelden"}
          </h1>
        }
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
                  navigate(0);
                }}
                src={logoSvg}
              />
            </div>
          </div>
          <div className="NavBar__Container__Right">
            <div
              className="NavBar__Item"
              id="user-sidebar-button"
              onClick={() => onUserSidebarToggle()}
            >
              <IconContext.Provider value={{ size: "3em" }}>
                <FaRegUser />
              </IconContext.Provider>
            </div>
            <div
              className="NavBar__Item"
              id="cart-sidebar-button"
              onClick={() => onCartSidebarToggle()}
            >
              <IconContext.Provider value={{ size: "3em" }}>
                <RiShoppingBag4Line className="p-overlay-badge" />
                {cartItems.length > 0 ? (
                  <Badge
                    value={cartItems
                      .map((item) => item.amount)
                      .reduce((a, b) => a + b, 0)}
                  ></Badge>
                ) : null}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
