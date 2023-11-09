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
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import ConnectWalletHome from "./pages/ConnectWalletHome/ConnectWalletHome";
import CreateProfile from "./pages/CreateProfile/CreateProfile";

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
      duration: 0.23,
    },
  },
  exit: {
    opacity: 0.5,
    x: "-100vw",
    transition: {
      duration: 0.23,
    },
  },
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
        <Routes location={location}>
          <Route index element={<ConnectWalletHome />} />
          <Route path="/">
            <Route path="/create-profile" element={<CreateProfile />} />
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

            {/* PUBLIC ROUTES */}
            <Route path="*" element={<NotFound />} />
            <Route path="/yetki-yok" element={<Unauthorized />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
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
};

export default App;
