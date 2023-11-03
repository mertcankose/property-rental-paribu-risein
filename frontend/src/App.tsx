import "./App.css";
import { Helmet } from "react-helmet";
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, rainbowWallet, trustWallet } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import PrivateRoute from "./utils/PrivateRoute";
import RootLayout from "./layouts/RootLayout";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import ConnectWallet from "./pages/ConnectWallet/ConnectWallet";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import PersistConnectWallet from "./pages/PersistConnectWallet/PersistConnectWallet";

let thirdwebClientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
let goerliRpc = import.meta.env.VITE_GOERLI_RPC;

const pageVariants = {
  initial: {
    opacity: 0.5,
    x: "100vw",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.23, // Adjust the duration value to control the speed of the animation
    },
  },
  exit: {
    opacity: 0.5,
    x: "-100vw",
    transition: {
      duration: 0.23, // Adjust the duration value to control the speed of the animation
    },
  },
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
        <Routes location={location}>
          <Route path="/" element={<RootLayout />}>
            <Route element={<PersistConnectWallet />}>
              <Route
                element={
                  <PrivateRoute
                  // if connected and have profile
                  />
                }
              >
                <Route path="/showcase" element={<Home />} />
                <Route path="/showcase/:propertyId" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
              </Route>

              <Route
                element={
                  <PrivateRoute
                  // if connected and doesnt have profile
                  />
                }
              >
                <Route path="/create-profile" element={<UserProfile />} />
              </Route>
            </Route>

            {/* PUBLIC ROUTES */}
            <Route index path="/" element={<ConnectWallet />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/yetki-yok" element={<Unauthorized />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <>
      <Helmet>
        <title>Property Rental</title>
        <meta name="description" content="Property Rental" />
      </Helmet>

      <ThirdwebProvider
        supportedWallets={[metamaskWallet(), rainbowWallet(), coinbaseWallet(), walletConnect(), trustWallet()]}
        activeChain={{ ...Goerli, rpc: [goerliRpc] }}
        supportedChains={[Goerli]}
        clientId={thirdwebClientId}
        // authConfig={{
        //   domain: "https://mertcankose.com",
        // }}
        dAppMeta={{
          name: "Property Rental",
          description: "Rent the property!",
          logoUrl: "https://mertcankose.com/cipherlog/cipherlog-icon.png",
          url: "https://mertcankose.com",
          // isDarkMode: true,
        }}
      >
        <ThemeProvider>
          <WalletProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </ThirdwebProvider>
    </>
  );
}

export default App;
