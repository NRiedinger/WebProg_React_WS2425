import "./App.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import NavBar from "./components/NavBar/NavBar";
import ProductOverview from "./components/ProductOverview/ProductOverview";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <ProductOverview />
    </div>
  );
}

export default App;
