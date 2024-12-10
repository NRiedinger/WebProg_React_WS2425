import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

import { useDispatch } from "react-redux";
import axios from "../../axiosURL";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("max@mail.de");
  const [password, setPassword] = useState<string>("passwort");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = () => {
    axios
      .post("/login", { email, password }, { withCredentials: true })
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__Container">
        <div>
          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">E-Mail</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <Password
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
            <label htmlFor="password">Passwort</label>
          </FloatLabel>
        </div>

        <div>
          <Button onClick={onLogin}>Login</Button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
