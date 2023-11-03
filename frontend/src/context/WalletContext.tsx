import { createContext, ReactNode, FC, useContext } from "react";

interface WalletContextType {}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <WalletContext.Provider value={{}}>{children}</WalletContext.Provider>;
};

export const useContextWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
