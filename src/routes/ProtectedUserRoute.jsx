import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import useSeller from "../hooks/useSeller";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  const [seller, sellerLoading] = useSeller(user);
  const location = useLocation();
  if (sellerLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }
  if (seller) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedUserRoute;
