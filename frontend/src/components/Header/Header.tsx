import { FC } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContextTheme } from "../../context/ThemeContext";
import { useContextWallet } from "../../context/WalletContext";
import { Link } from "react-router-dom";

interface IHeader {
  className?: string;
}

const Header: FC<IHeader> = ({ className, ...props }) => {
  const { theme } = useContextTheme();

  const { address, isUserAddressEmptyData, userData } = useContextWallet();

  const showProfile = () => {
    if (address && !isUserAddressEmptyData) {
      return true;
    }
    return false;
  };

  return (
    <div className={["flex flex-row justify-between items-center", className].join(" ")} {...props}>
      <span>Rent</span>
      <div className="flex items-center gap-4">
        {showProfile() && (
          <Link to="/profile" className="bg-blue-400 text-white rounded-md px-4 py-2">
            Profile
            {userData.userType == 0 ? " (Holder)" : " (Tenant)"}
          </Link>
        )}
        <ConnectWallet switchToActiveChain={true} theme={theme} />
      </div>
    </div>
  );
};

export default Header;
