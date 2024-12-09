import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.scss";

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App__Content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
