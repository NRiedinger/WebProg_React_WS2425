import { IconContext } from "react-icons";
import "./NavBar.scss";

import { CiHome } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const NavBar = () => {
  const navigate = useNavigate();

  const renderLoginStateButtons = () => {
    if (!!Cookies.get("token")) {
      return (
        <>
          <div className="NavBar__Item">
            <button
              onClick={() => {
                Cookies.remove("token");
                navigate("/");
              }}
            >
              Ausloggen
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="NavBar__Item">
          <Link to={"/login"}>Log in</Link>
        </div>

        <div className="NavBar__Item">
          <Link to={"/signup"}>Sign up</Link>
        </div>
      </>
    );
  };

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
      <div className="NavBar__Container__Right">{renderLoginStateButtons()}</div>
    </div>
  );
};
export default NavBar;
