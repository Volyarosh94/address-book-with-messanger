import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./Redux/hooks";
import SideNavbar from "./SideNavbar";

export const ProtectedRoute = () => {
  const { user } = useAppSelector((store) => store.user);

  if (!user._id) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <SideNavbar />
      <Outlet />
    </div>
  );
};
