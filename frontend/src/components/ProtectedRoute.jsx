import { Navigate } from "react-router-dom";
import UserService from "../services/userService";

export default function ProtectedRoute({ children }) {
  const token = UserService.getToken();
  const user = UserService.getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.is_admin !== true) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
