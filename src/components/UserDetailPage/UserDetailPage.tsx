import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from "primereact/InputMask";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/Toast";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../reducer/reducer";
import "./UserDetailPage.scss";

import axios from "../../axiosURL";

const UserDetailPage = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const currentUser = useSelector((state: AppState) => state.currentUser);
  const [firstname, setFirstname] = useState<string | undefined>("");
  const [lastname, setLastname] = useState<string | undefined>("");
  const [street, setStreet] = useState<string | undefined>("");
  const [postcode, setPostcode] = useState<string | undefined>("");
  const [city, setCity] = useState<string | undefined>("");
  const [country, setCountry] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | null | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [email2, setEmail2] = useState<string | undefined>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [password2, setPassword2] = useState<string | undefined>("");

  useEffect(() => {
    const isUserLoggedIn = !!Cookies.get("token");
    if (!isUserLoggedIn) {
      navigate("/");
    } else {
      setFirstname(currentUser?.firstname);
      setLastname(currentUser?.lastname);
      setStreet(currentUser?.street);
      setPostcode(currentUser?.postcode);
      setCity(currentUser?.city);
      setCountry(currentUser?.country);
      setPhone(currentUser?.phone);
      setEmail(currentUser?.email);
    }
  }, [currentUser]);

  const checkInfoCorrectlyFilled = () => {
    return (
      firstname?.length &&
      lastname?.length &&
      street?.length &&
      postcode?.length &&
      city?.length &&
      country?.length &&
      (currentUser?.firstname !== firstname ||
        currentUser?.lastname !== lastname ||
        currentUser?.street !== street ||
        currentUser?.postcode !== postcode ||
        currentUser?.city !== city ||
        currentUser?.country !== country ||
        currentUser?.phone !== phone)
    );
  };

  const checkEmailCorrectlyFilled = () => {
    return (
      email?.length &&
      email2?.length &&
      email === email2 &&
      currentUser?.email !== email
    );
  };

  const checkPasswordCorrectlyFilled = () => {
    return (
      oldPassword?.length &&
      password?.length &&
      password2?.length &&
      password === password2
    );
  };

  const onEditInfo = () => {
    const newUser = {
      _id: currentUser?._id,
      firstname,
      lastname,
      street,
      postcode,
      city,
      country,
      phone,
    };

    axios
      .post("/setUserData", newUser, { withCredentials: true })
      .then((res) => {
        console.log(res);
        toast.current?.show({
          severity: "success",
          detail: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.current?.show({
          severity: "error",
          detail: err.response.data,
        });
      });
  };

  const onEditEmail = () => {
    axios
      .post(
        "/setUserEmail",
        { _id: currentUser?._id, email },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toast.current?.show({
          severity: "success",
          detail: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.current?.show({
          severity: "error",
          detail: err.response.data,
        });
      })
      .finally(() => {
        setEmail2("");
      });
  };

  const onEditPassword = () => {
    axios
      .post(
        "/setUserPassword",
        { _id: currentUser?._id, oldPassword, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toast.current?.show({
          severity: "success",
          detail: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.current?.show({
          severity: "error",
          detail: err.response.data,
        });
      })
      .finally(() => {
        setOldPassword("");
        setPassword("");
        setPassword2("");
      });
  };

  return (
    <div className="UserDetailPage">
      <h2>Meine Daten</h2>

      <div className="UserDetailPage__Container">
        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <InputText
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="email">Vorname*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="lastname">Nachname*</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <InputText
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="street">Straße + Hausnummer*</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <InputText
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
            <label htmlFor="postcode">PLZ*</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="city">Stadt*</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <InputText
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="country">Land*</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
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

        <div className="UserDetailPage__Container__Row">
          <Button
            raised
            label="Änderungen speichern"
            disabled={!checkInfoCorrectlyFilled()}
            onClick={() => {
              onEditInfo();
            }}
          />
        </div>

        <Divider />

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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

        <div className="UserDetailPage__Container__Row">
          <Button
            raised
            label="Email ändern"
            disabled={!checkEmailCorrectlyFilled()}
            onClick={() => {
              onEditEmail();
            }}
          />
        </div>

        <Divider />

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <Password
              inputId="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
            <label htmlFor="oldPassword">altes Passwort</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
          <FloatLabel>
            <Password
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
            <label htmlFor="password">neues Passwort</label>
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
            <label htmlFor="password2">neues Passwort wiederholen</label>
          </FloatLabel>
        </div>

        <div className="UserDetailPage__Container__Row">
          <Button
            raised
            label="Passwort ändern"
            disabled={!checkPasswordCorrectlyFilled()}
            onClick={() => {
              onEditPassword();
            }}
          />
        </div>
      </div>

      <Toast ref={toast} position="top-left" />
    </div>
  );
};
export default UserDetailPage;
