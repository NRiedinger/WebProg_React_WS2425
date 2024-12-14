import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import OrderOverviewPage from "./components/OrderOverviewPage/OrderOverviewPage.tsx";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage.tsx";
import ProductOverviewPage from "./components/ProductOverviewPage/ProductOverviewPage.tsx";
import SignupPage from "./components/SignupPage/SignupPage.tsx";
import UserDetailPage from "./components/UserDetailPage/UserDetailPage.tsx";
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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/products",
        element: <ProductOverviewPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/account/orders",
        element: <OrderOverviewPage />,
      },
      {
        path: "/account/edit",
        element: <UserDetailPage />,
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
