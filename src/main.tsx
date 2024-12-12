import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage.tsx";
import ProductOverviewPage from "./components/ProductOverviewPage/ProductOverviewPage.tsx";
import SignupPage from "./components/SignupPage/SignupPage.tsx";
import "./index.scss";
import reducer from "./reducer/reducer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: "/products",
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
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
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
