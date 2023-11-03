import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContextTheme } from "../../context/ThemeContext";
import { useAddress } from "@thirdweb-dev/react";

const ConnectWalletHome: FC = () => {
  const navigate = useNavigate();
  const { theme } = useContextTheme();
  const address = useAddress();

  useEffect(() => {
    if (address) {
      navigate("/create-profile");
    }
  }, [address]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">DApp Title</h1>
      <p className="text-lg mb-8">Uygulamayı Tanıtan Açıklama</p>
      <ConnectWallet switchToActiveChain={true} theme={theme} />
    </div>
  );
};

export default ConnectWalletHome;
