import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  // wallet ve profile oluşumuna bakılacak

  return true ? (
    <Outlet />
  ) : false ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/yetki-yok" state={{ from: location }} replace />
  ) : (
    <Navigate to="/giris" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
