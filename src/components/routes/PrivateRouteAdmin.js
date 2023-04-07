import { Navigate } from "react-router-dom";
import { useAuthAdmin } from "../../hooks/useAuth";

export default function PrivateRouteAdmin({ children }) {
  const isLoggedIn = useAuthAdmin();

  return isLoggedIn ? children : <Navigate to="/admin" />;
}
