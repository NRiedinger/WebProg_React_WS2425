import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosURL";
import "./SignupPage.scss";

const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="SignupPage">
      <div className="SignupPage__Container">
        <div>
          <FloatLabel>
            <InputText
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="email">Vorname</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="lastname">Nachname</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="street">Straße + Hausnummer</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
            <label htmlFor="postcode">PLZ</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="city">Stadt</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="country">Land</label>
          </FloatLabel>
        </div>

        <div>
          <FloatLabel>
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Telefon</label>
          </FloatLabel>
        </div>

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
            />
            <label htmlFor="password">Passwort</label>
          </FloatLabel>
        </div>

        <div>
          <button onClick={onSignup}>Anmelden</button>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
