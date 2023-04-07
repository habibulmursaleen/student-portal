import { Navigate } from "react-router-dom";
import { useAuthAdmin } from "../../hooks/useAuth";

export default function PublicRouteAdmin({ children }) {
  const isLoggedIn = useAuthAdmin();

  return !isLoggedIn ? children : <Navigate to="/admin/dashboard" />;
}
