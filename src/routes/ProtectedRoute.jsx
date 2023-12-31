import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
