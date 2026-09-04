import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../userStore";

type Props = {
  roles?: Array<"user" | "admin" | "brand">;
};

/** Requires login; optional role allow-list for brand/admin portals. */
const ProtectedRoute = ({ roles }: Props) => {
  const { isLoggedIn, user, token } = useUserStore();
  const location = useLocation();
  const authed = isLoggedIn && !!token;

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && user.role && !roles.includes(user.role as "user" | "admin" | "brand")) {
    const fallback = user.role === "admin" ? "/admin" : user.role === "brand" ? "/brand" : "/";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
