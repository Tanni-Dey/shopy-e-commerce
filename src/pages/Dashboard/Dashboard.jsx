import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet } from "react-router-dom";
import { auth } from "../../lib/firebase";
import useSeller from "../../hooks/useSeller";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [seller] = useSeller(user);
  const [signOut] = useSignOut(auth);

  return (
    <div className="container">
      <h2 className="text-primary font-semibold text-2xl text-center">
        Dashboard
      </h2>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}

          <div className="ml-10">
            <Outlet />
          </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open menu
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {seller && (
              <li>
                <Link to="/dashboard">Add New Product</Link>
              </li>
            )}

            {seller && (
              <li>
                <NavLink to="/dashboard/manage-product">
                  Product Management
                </NavLink>
              </li>
            )}
            {!seller && (
              <li>
                <Link to="/dashboard/wishlist">Wishlist</Link>
              </li>
            )}
            {!seller && (
              <li>
                <Link to="/dashboard/order">My Order</Link>
              </li>
            )}

            {user && (
              <a className="btn btn-primary w-1/2">
                <NavLink onClick={async () => await signOut()} to="/login">
                  Log out
                </NavLink>
              </a>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
