import { IconContext } from "react-icons";
import "./NavBar.scss";

import { Sidebar } from "primereact/sidebar";
import { CiHome } from "react-icons/ci";
import { FaShoppingBag, FaUser } from "react-icons/fa";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import SidebarUserContent from "../SidebarUserContent/SidebarUserContent";

import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { setCurrentUser } from "../../reducer/reducer";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState<boolean>(false);

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
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = visible ? scrollBarWidth + "px" : "0";
    document.body.style.overflow = visible ? "hidden" : "";
    setUserVisible(visible);
  };

  const onCartSidebarToggle = (visible: boolean) => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = visible ? scrollBarWidth + "px" : "0";
    document.body.style.overflow = visible ? "hidden" : "";
    setCartVisible(visible);
  };

  return (
    <>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => onCartSidebarToggle(false)}
      ></Sidebar>

      <Sidebar
        visible={userVisible}
        position="right"
        onHide={() => onUserSidebarToggle(false)}
      >
        {isUserLoggedIn ? <SidebarUserContent /> : <LoginPage />}
      </Sidebar>

      <div className="NavBar">
        <div className="NavBar__Container__Left">
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "3em" }}>
              <CiHome onClick={() => navigate("/")} />
            </IconContext.Provider>
          </div>
        </div>
        <div className="NavBar__Container__Right">
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "3em" }}>
              <FaUser onClick={() => onUserSidebarToggle(true)} />
            </IconContext.Provider>
          </div>
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "3em" }}>
              <FaShoppingBag onClick={() => onCartSidebarToggle(true)} />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
