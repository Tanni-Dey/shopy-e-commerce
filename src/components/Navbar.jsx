import { auth } from "../lib/firebase";
import { NavLink } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  return (
    <div className="navbar bg-base-100 container max-auto mb-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="all-products">All Products</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Shofy</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="all-products">All Products</NavLink>
          </li>
          {!user && (
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink to="signup">Signup</NavLink>
            </li>
          )}
          <li>
            <NavLink to="dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user && (
          <a className="btn">
            <NavLink onClick={async () => await signOut()} to="login">
              Log out
            </NavLink>
          </a>
        )}
        {user && <NavLink to="/cart">cart</NavLink>}
      </div>
    </div>
  );
};

export default Navbar;
