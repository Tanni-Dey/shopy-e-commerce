import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "../pages/AllProducts";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductDetails from "../pages/ProductDetails";
import ProtectedUserRoute from "./ProtectedUserRoute";
import { createBrowserRouter } from "react-router-dom";
import ProtectedSellerRoute from "./ProtectedSellerRoute";
import Payment from "../pages/Dashboard/UserDashboard/Payment";
import Wishlist from "../pages/Dashboard/UserDashboard/Wishlist";
import Purchase from "../pages/Dashboard/UserDashboard/Purchase";
import OrderList from "../pages/Dashboard/UserDashboard/orderList";
import EditProduct from "../pages/Dashboard/SellerDashboard/EditProduct";
import AddNewProduct from "../pages/Dashboard/SellerDashboard/AddNewProduct";
import ManageProduct from "../pages/Dashboard/SellerDashboard/ManageProduct";

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
              <ProtectedSellerRoute>
                <AddNewProduct />,
              </ProtectedSellerRoute>
            ),
          },
          {
            path: "manage-product",
            element: (
              <ProtectedSellerRoute>
                <ManageProduct />
              </ProtectedSellerRoute>
            ),
          },
          {
            path: "edit-product/:id",
            element: (
              <ProtectedSellerRoute>
                <EditProduct />,
              </ProtectedSellerRoute>
            ),
          },
          {
            path: "wishlist",
            element: (
              <ProtectedUserRoute>
                <Wishlist />,
              </ProtectedUserRoute>
            ),
          },
          {
            path: "order",
            element: (
              <ProtectedUserRoute>
                <OrderList />,
              </ProtectedUserRoute>
            ),
          },
          {
            path: "purchase",
            element: (
              <ProtectedUserRoute>
                <Purchase />
              </ProtectedUserRoute>
            ),
          },
          {
            path: "payment/:id",
            element: (
              <ProtectedUserRoute>
                <Payment />
              </ProtectedUserRoute>
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
          <ProtectedUserRoute>
            <Cart />
          </ProtectedUserRoute>
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
