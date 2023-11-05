import { FC } from "react";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContextTheme } from "../../context/ThemeContext";
import { useContextWallet } from "../../context/WalletContext";
import homeImage from "../../assets/images/home-image.png";

const ConnectWalletHome: FC = () => {
  const { theme } = useContextTheme();
  const { address, isUserAddressEmptyData } = useContextWallet();

  const dynamicPath = () => {
    console.log("isUserAddressEmptyData: ", isUserAddressEmptyData);
    if (address && !isUserAddressEmptyData) {
      return "/showcase";
    } else {
      return "/create-profile";
    }
  };

  return (
    <div
      className="flex flex-col py-8 gap-8 items-center min-h-screen"
      style={{
        background: "linear-gradient(45deg, #3498db, #fff, #1abc9c)",
      }}
    >
      <div className="md:block w-1/4">
        <img src={homeImage} alt="Home" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 text-center text-white z-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Property Rental</h1>
        <p className="text-xl mt-4 mb-8 text-gray-700 w-full lg:w-1/2 text-center mx-auto">
          Welcome to the Property Rental dApp. Connect your wallet to get started.
        </p>

        <div className="mb-8">
          <ConnectWallet switchToActiveChain={true} theme={theme} />
        </div>
        {address && (
          <Link to={dynamicPath()} className="text-xl underline text-black hover:text-blue-700">
            Go to Homepage
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConnectWalletHome;
