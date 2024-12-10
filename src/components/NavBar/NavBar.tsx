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

import axios from "../../axiosURL";
import { setCurrentUser } from "../../reducer/reducer";

const NavBar = () => {
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

  return (
    <>
      <Sidebar
        visible={cartVisible}
        position="right"
        onHide={() => setCartVisible(false)}
      ></Sidebar>

      <Sidebar
        visible={userVisible}
        position="right"
        onHide={() => setUserVisible(false)}
      >
        {isUserLoggedIn ? <SidebarUserContent /> : <LoginPage />}
      </Sidebar>

      <div className="NavBar">
        <div className="NavBar__Container__Left">
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "4em" }}>
              <CiHome />
            </IconContext.Provider>
          </div>
          <div className="NavBar__Item">Shop</div>
        </div>
        <div className="NavBar__Container__Right">
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "2em" }}>
              <FaUser onClick={() => setUserVisible(true)} />
            </IconContext.Provider>
          </div>
          <div className="NavBar__Item">
            <IconContext.Provider value={{ size: "2em" }}>
              <FaShoppingBag onClick={() => setCartVisible(true)} />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
