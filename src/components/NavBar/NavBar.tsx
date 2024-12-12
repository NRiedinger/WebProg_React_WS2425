import { IconContext } from "react-icons";
import logoSvg from "../../assets/logo.svg";
import "./NavBar.scss";

import { Badge } from "primereact/badge";
import { Sidebar } from "primereact/sidebar";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import SidebarUserContent from "../SidebarUserContent/SidebarUserContent";

import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { AppState, setCurrentUser } from "../../reducer/reducer";
import { SidebarCartContent } from "../SidebarCartContent/SidebarCartContent";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState<boolean>(false);
  const cartItems = useSelector((state: AppState) => state.cartItems);

  const isUserLoggedIn = !!Cookies.get("token");

  useEffect(() => {
    if (isUserLoggedIn) {
      axios
        .post(
          "/user",
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
  }, []);

  const onUserSidebarToggle = (visible: boolean) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setUserVisible(visible);
  };

  const onCartSidebarToggle = (visible: boolean) => {
    document.body.style.overflow = visible ? "hidden" : "";
    setCartVisible(visible);
  };

  return (
    <>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => onCartSidebarToggle(false)}
        header={<h1>Warenkorb</h1>}
      >
        <SidebarCartContent />
      </Sidebar>

      <Sidebar
        visible={userVisible}
        position="right"
        onHide={() => onUserSidebarToggle(false)}
      >
        {isUserLoggedIn ? <SidebarUserContent /> : <LoginPage />}
      </Sidebar>

      <div className="NavBar">
        <div className="NavBar__Container">
          <div className="NavBar__Container__Left">
            <div className="NavBar__Item">
              {/* <IconContext.Provider value={{ size: "4em" }}>
                <CiHome onClick={() => navigate("/")} />
              </IconContext.Provider> */}
              <img onClick={() => navigate("/")} src={logoSvg} />
            </div>
          </div>
          <div className="NavBar__Container__Right">
            <div className="NavBar__Item">
              <IconContext.Provider value={{ size: "3em" }}>
                <FaRegUser onClick={() => onUserSidebarToggle(true)} />
              </IconContext.Provider>
            </div>
            <div className="NavBar__Item">
              <IconContext.Provider value={{ size: "3em" }}>
                <RiShoppingBag4Line
                  className="p-overlay-badge"
                  onClick={() => onCartSidebarToggle(true)}
                />
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
