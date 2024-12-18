import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { RefObject, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/Toast";
import { useDispatch } from "react-redux";
import axios from "../../axiosURL";
import { fetchCurrentUser } from "../../reducer/reducer";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onLoginClick = () => {
    axios
      .post("/login", { email, password }, { withCredentials: true })
      .then((res) => {
        dispatch(fetchCurrentUser());
        window.glToastRef.current?.show({
          severity: "success",
          detail: res.data,
        });
        /* document.getElementById("user-sidebar-button")?.click(); */
        window.glToggleUserSidebar(false);
      })
      .catch((err) => {
        console.error(err);
        setPassword("");
        window.glToastRef.current?.show({
          severity: "error",
          detail: err.response.data,
        });
      });
  };

  const onRegisterClick = () => {
    navigate("/signup");
    window.glToggleUserSidebar(false);
    /* document.getElementById("user-sidebar-button")?.click(); */
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__Container">
        <FloatLabel>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">E-Mail</label>
        </FloatLabel>

        <FloatLabel>
          <Password
            style={{ width: "100%" }}
            inputId="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            invalid={!password.length}
          />
          <label htmlFor="password">Passwort</label>
        </FloatLabel>

        <Button raised onClick={onLoginClick} label="Anmelden" />

        <Divider />

        <Button raised onClick={onRegisterClick} label="Registrieren" />
      </div>
    </div>
  );
};
export default LoginPage;
