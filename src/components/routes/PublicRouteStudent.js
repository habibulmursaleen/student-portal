import { Navigate } from "react-router-dom";
import { useAuthStudent } from "../../hooks/useAuth";

export default function PublicRouteStudent({ children }) {
  const isLoggedIn = useAuthStudent();

  return !isLoggedIn ? children : <Navigate to="/videos/1" />;
}
