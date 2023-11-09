import { useState } from "react";
import { Outlet } from "react-router-dom";

const PersistConnectWallet = () => {
  const [isLoading] = useState(false);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistConnectWallet;
