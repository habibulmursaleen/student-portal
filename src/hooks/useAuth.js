import { useSelector } from "react-redux";

export function useAuthAdmin() {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user.role === "admin") {
    return true;
  } else {
    return false;
  }
}

export function useAuthStudent() {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user.role === "student") {
    return true;
  } else {
    return false;
  }
}
