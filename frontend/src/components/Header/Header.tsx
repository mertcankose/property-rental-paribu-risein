import { ConnectWallet } from "@thirdweb-dev/react";
import { useContextTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme } = useContextTheme();

  return (
    <div className="flex flex-row justify-between items-center">
      <span>Rent</span>
      <ConnectWallet switchToActiveChain={true} theme={theme} />
    </div>
  );
};

export default Header;
