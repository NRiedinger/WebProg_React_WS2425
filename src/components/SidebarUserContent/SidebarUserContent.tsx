import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import "./SidebarUserContent.scss";

const SidebarUserContent = () => {
  const navigate = useNavigate();

  return (
    <div className="SidebarUserContent">
      <div className="SidebarUserContent__Container">
        <Button
          raised
          label="Meine Daten"
          onClick={() => {
            document.getElementById("user-sidebar-button")?.click();
            navigate("/account/edit");
          }}
        />

        <Button
          raised
          label="Meine Bestellungen"
          onClick={() => {
            document.getElementById("user-sidebar-button")?.click();
            navigate("/account/orders");
          }}
        />

        <Divider />

        <Button
          raised
          severity="danger"
          label="Ausloggen"
          onClick={() => {
            Cookies.remove("token");
            navigate(0);
          }}
        />
      </div>
    </div>
  );
};
export default SidebarUserContent;
