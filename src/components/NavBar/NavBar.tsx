import { IconContext } from "react-icons";
import "./NavBar.scss";

import { CiShoppingCart, CiHome } from "react-icons/ci";

const NavBar = () => {
  return (
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
          <IconContext.Provider value={{ size: "4em" }}>
            <CiShoppingCart />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
