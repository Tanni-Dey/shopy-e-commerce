import App from "../App";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddNewProduct from "../pages/Dashboard/SellerDashboard/AddNewProduct";
import ManageProduct from "../pages/Dashboard/SellerDashboard/ManageProduct";
import EditProduct from "../pages/Dashboard/SellerDashboard/EditProduct";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// All Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <AddNewProduct />,
              </ProtectedRoute>
            ),
          },
          {
            path: "manage-product",
            element: (
              <ProtectedRoute>
                <ManageProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit-product/:id",
            element: (
              <ProtectedRoute>
                <EditProduct />,
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
