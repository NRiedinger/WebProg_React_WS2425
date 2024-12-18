import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/Toast";
import { RefObject } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
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
            /* document.getElementById("user-sidebar-button")?.click(); */
            window.glToggleUserSidebar(false);
            navigate("/account/edit");
          }}
        />

        <Button
          raised
          label="Meine Bestellungen"
          onClick={() => {
            /* document.getElementById("user-sidebar-button")?.click(); */
            window.glToggleUserSidebar(false);
            navigate("/account/orders");
          }}
        />

        <Divider />

        <Button
          raised
          severity="danger"
          label="Abmelden"
          onClick={() => {
            axios
              .post("/logout", {}, { withCredentials: true })
              .then((res) => {
                console.log(res);
                window.glToastRef.current?.show({
                  severity: "success",
                  detail: res.data,
                });
                navigate("/");
              })
              .catch((err) => {
                console.error(err);
                window.glToastRef.current?.show({
                  severity: "error",
                  detail: err.response.data,
                });
                navigate("/");
              });
            /* document.getElementById("user-sidebar-button")?.click(); */
            window.glToggleUserSidebar(false);
          }}
        />
      </div>
    </div>
  );
};
export default SidebarUserContent;
