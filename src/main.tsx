import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import ProductOverviewPage from "./components/ProductOverviewPage/ProductOverviewPage.tsx";
import SignupPage from "./components/SignupPage/SignupPage.tsx";
import "./index.scss";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer.tsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductOverviewPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const store = configureStore({ reducer });

createRoot(document.getElementById("root")!).render(
  /*<StrictMode>*/
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  /*</StrictMode>*/
);
