import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

import { Divider } from "primereact/divider";
import axios from "../../axiosURL";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("max@mail.de");
  const [password, setPassword] = useState<string>("passwort");

  const navigate = useNavigate();

  const onLoginClick = () => {
    axios
      .post("/login", { email, password }, { withCredentials: true })
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onRegisterClick = () => {
    navigate("/signup");
    navigate(0);
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__Container">
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          />
          <label htmlFor="password">Passwort</label>
        </FloatLabel>

        <Button raised onClick={onLoginClick}>
          Login
        </Button>

        <Divider />

        <Button raised onClick={onRegisterClick}>
          Registrieren
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
