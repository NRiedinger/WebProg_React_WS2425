import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../reducer/reducer";
import "./SidebarUserContent.scss";

const SidebarUserContent = () => {
  const currentUser = useSelector((state: AppState) => state.currentUser);
  const navigate = useNavigate();

  return (
    <div className="SidebarUserContent">
      <div>
        Name: {currentUser?.firstname} {currentUser?.lastname}
      </div>
      <div>
        <Button
          onClick={() => {
            Cookies.remove("token");
            navigate(0);
          }}
        >
          Ausloggen
        </Button>
      </div>
    </div>
  );
};
export default SidebarUserContent;