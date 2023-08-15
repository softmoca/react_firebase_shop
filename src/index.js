import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import NewProduct from "./pages/NewProduct";
import MyCart from "./pages/MyCart";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 최상위 경로에는 App 컴포 넌트
    errorElement: <NotFound />, // 존재하지 않을 경우 보여줄 컴포넌트
    children: [
      // App이라는 부모 컴포넌트안에 outlet을 사용해
      { index: true, path: "/", element: <Home /> }, // 기본 경로
      { path: "/products", element: <AllProducts /> },
      {
        path: "/products/new", // 로그인한 사용자면서 어드민 유저
        element: (
          <ProtectedRoute requireAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/carts", // 로그인한 사용자만
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
