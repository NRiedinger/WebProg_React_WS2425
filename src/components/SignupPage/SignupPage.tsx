import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from "primereact/InputMask";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/Toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import { fetchCurrentUser } from "../../reducer/reducer";
import "./SignupPage.scss";

const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState<string | null | undefined>("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toastRef = useRef<Toast>(null);

  const onSignup = () => {
    axios
      .post(
        "/signup",
        {
          firstname,
          lastname,
          street,
          postcode,
          city,
          country,
          phone,
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(fetchCurrentUser());
        toastRef.current?.show({
          severity: "success",
          detail: res.data,
        });
        navigate("/");
        /* document.getElementById("user-sidebar-button")?.click(); */
        window.glToggleUserSidebar(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkCorrectlyFilled = () => {
    return (
      firstname.length > 0 &&
      lastname.length > 0 &&
      street.length > 0 &&
      postcode.length > 0 &&
      city.length > 0 &&
      country.length > 0 &&
      email.length > 0 &&
      email2.length > 0 &&
      email === email2 &&
      password.length > 0 &&
      password2.length > 0 &&
      password === password2
    );
  };

  return (
    <div className="SignupPage">
      <div className="SignupPage__Container">
        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputText id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <label htmlFor="email">Vorname*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <label htmlFor="lastname">Nachname*</label>
          </FloatLabel>
        </div>

        <Divider />

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputText id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
            <label htmlFor="street">Straße + Hausnummer*</label>
          </FloatLabel>
        </div>

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputText id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
            <label htmlFor="postcode">PLZ*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            <label htmlFor="city">Stadt*</label>
          </FloatLabel>
        </div>

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputText id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <label htmlFor="country">Land*</label>
          </FloatLabel>
        </div>

        <Divider />

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputMask
              id="phone"
              value={phone}
              onComplete={(e) => setPhone(e.value)}
              mask="+99 9999 99 99999"
            ></InputMask>
            <label htmlFor="phone">Telefon</label>
          </FloatLabel>
        </div>

        <Divider />

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">E-Mail*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="email2"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              invalid={email !== email2}
            />
            <label htmlFor="email2">E-Mail wiederholen*</label>
          </FloatLabel>
        </div>

        <div className="SignupPage__Container__Row">
          <FloatLabel>
            <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
            <label htmlFor="password">Passwort*</label>
          </FloatLabel>

          <FloatLabel>
            <Password
              inputId="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              toggleMask
              invalid={password !== password2}
              feedback={false}
            />
            <label htmlFor="password2">Passwort*</label>
          </FloatLabel>
        </div>

        <Divider />

        <div className="SignupPage__Container__Row">
          <Button raised disabled={!checkCorrectlyFilled()} onClick={onSignup} label="Registrieren" />
        </div>
      </div>

      <Toast ref={toastRef} position="top-left" />
    </div>
  );
};
export default SignupPage;
