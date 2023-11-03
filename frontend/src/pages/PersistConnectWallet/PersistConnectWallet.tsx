import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const PersistConnectWallet = () => {
  const [isLoading, setIsLoading] = useState(false);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistConnectWallet;
