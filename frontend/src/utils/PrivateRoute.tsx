import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContextWallet } from "../context/WalletContext";

const PrivateRoute = () => {
  const location = useLocation();

  const { address, isUserAddressEmptyData } = useContextWallet();

  const isConnected = !!address;
  const isRegistered = !isUserAddressEmptyData;

  console.log("isConnected: ", isConnected);
  console.log("isRegistered: ", isRegistered);

  if (isConnected && isRegistered) {
    return <Outlet />;
  }

  const redirectTo = isConnected ? "/create-profile" : "/";

  return <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default PrivateRoute;
