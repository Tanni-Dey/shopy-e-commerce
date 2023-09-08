import { auth } from "../lib/firebase";
import useSeller from "../hooks/useSeller";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedSellerRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  const [seller, sellerLoading] = useSeller(user);
  let location = useLocation();

  if (sellerLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (!seller) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedSellerRoute;
