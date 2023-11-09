import { createContext, ReactNode, FC, useContext } from "react";
import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react";
import CONTRACT_ABI from "../assets/sources/propertyRentalAbi.json";

interface WalletContextType {
  CONTRACT_ADDRESS: string;
  address: string | undefined;
  isLoadingContract: boolean;
  errorContract: any;
  // is user address empty
  isUserAddressEmptyData: boolean;
  isUserAddressEmptyIsLoading: boolean;
  isUserAddressEmptyError: any;
  // user
  userData: any;
  userIsLoading: boolean;
  userError: any;
  // sisteme kayıt ol
  registerMutateAsync: any;
  registerIsLoading: boolean;
  registerError: any;
  registerIsSuccess: boolean;
  // mülk yarat
  createPropertyMutateAsync: any;
  createPropertyIsLaoding: boolean;
  createPropertyError: any;
  createPropertyIsSuccess: boolean;
  // mülk sahibinin mülkleri
  holderPropertiesData: any;
  holderPropertiesIsLoading: boolean;
  holderPropertiesError: any;
  // mülk sahibinin ilandaki mülkleri
  holderPropertiesInTheAdData: any;
  holderPropertiesInTheAdIsLoading: boolean;
  holderPropertiesInTheAdError: any;
  // ilandaki mülkler
  allPropertiesInTheAdData: any;
  allPropertiesInTheAdIsLoading: boolean;
  allPropertiesInTheAdError: any;
  // kiracının kiraladığı mülkler
  tenantPropertiesData: any;
  tenantPropertiesIsLoading: boolean;
  tenantPropertiesError: any;
  // mülkü ilana koy
  putPropertyMutateAsync: any;
  putPropertyIsLoading: boolean;
  putPropertyError: any;
  // kiracı olma talebinde bulun
  requestToBecomeTenantMutateAsync: any;
  requestToBecomeTenantIsLoading: boolean;
  requestToBecomeTenantError: any;
  // mülk contractını başlat
  startRentalContractMutateAsync: any;
  startRentalContractIsLoading: boolean;
  startRentalContractError: any;
  // mülk contractını sonlandır
  finishRentalContractMutateAsync: any;
  finishRentalContractIsLoading: boolean;
  finishRentalContractError: any;
  // şikayet et
  makeComplaintMutateAsync: any;
  makeComplaintIsLoading: boolean;
  makeComplaintError: any;
  // şikayeti kontrol et (only admin)
  controlComplaintMutateAsync: any;
  controlComplaintIsLoading: boolean;
  controlComplaintError: any;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const address = useAddress();

  let CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

  const { contract, isLoading: isLoadingContract, error: errorContract } = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);

  // isUserAddressEmpty | args: (address)
  const {
    data: isUserAddressEmptyData,
    isLoading: isUserAddressEmptyIsLoading,
    error: isUserAddressEmptyError,
  } = useContractRead(contract, "isUserAddressEmpty", [address]);

  // getUser | args: (address)
  const { data: userData, isLoading: userIsLoading, error: userError } = useContractRead(contract, "getUser", [address]);

  // holderProperties | args: (address)
  const {
    data: holderPropertiesData,
    isLoading: holderPropertiesIsLoading,
    error: holderPropertiesError,
  } = useContractRead(contract, "getHolderProperties", [address]);

  // holderPropertiesInTheAd | args: (address)
  const {
    data: holderPropertiesInTheAdData,
    isLoading: holderPropertiesInTheAdIsLoading,
    error: holderPropertiesInTheAdError,
  } = useContractRead(contract, "getHolderPropertiesInTheAd", [address]);

  // tenantProperties | args: (address)
  const {
    data: tenantPropertiesData,
    isLoading: tenantPropertiesIsLoading,
    error: tenantPropertiesError,
  } = useContractRead(contract, "getTenantProperties", [address]);

  // allPropertiesInTheAd | args: ()
  const {
    data: allPropertiesInTheAdData,
    isLoading: allPropertiesInTheAdIsLoading,
    error: allPropertiesInTheAdError,
  } = useContractRead(contract, "getAllPropertiesInTheAd");

  // registerSystem | args: (description, userType(0,1))
  const {
    mutateAsync: registerMutateAsync,
    isLoading: registerIsLoading,
    error: registerError,
    isSuccess: registerIsSuccess,
  } = useContractWrite(contract, "registerSystem");

  // createProperty | args: (name, price, propertyType, isInAd, createdAt)
  const {
    mutateAsync: createPropertyMutateAsync,
    isLoading: createPropertyIsLaoding,
    error: createPropertyError,
    isSuccess: createPropertyIsSuccess,
  } = useContractWrite(contract, "createProperty");

  // putPropertyInTheAd | args: (propertyId, createdAt)
  const {
    mutateAsync: putPropertyMutateAsync,
    isLoading: putPropertyIsLoading,
    error: putPropertyError,
  } = useContractWrite(contract, "putPropertyInTheAd");

  // requestToBecomeTenant | args: (propertyId)
  const {
    mutateAsync: requestToBecomeTenantMutateAsync,
    isLoading: requestToBecomeTenantIsLoading,
    error: requestToBecomeTenantError,
  } = useContractWrite(contract, "requestToBecomeTenant");

  // startRentalContract | args: (propertyId, propertyType, startDate, endDate, tenantAddress, createdAt)
  const {
    mutateAsync: startRentalContractMutateAsync,
    isLoading: startRentalContractIsLoading,
    error: startRentalContractError,
  } = useContractWrite(contract, "startRentalContract");

  // finishRentalContract | args: (rentalContractId, date)
  const {
    mutateAsync: finishRentalContractMutateAsync,
    isLoading: finishRentalContractIsLoading,
    error: finishRentalContractError,
  } = useContractWrite(contract, "finishRentalContract");

  // makeComplaint | args: (propertyId, reason, createdAt)
  const {
    mutateAsync: makeComplaintMutateAsync,
    isLoading: makeComplaintIsLoading,
    error: makeComplaintError,
  } = useContractWrite(contract, "makeComplaint");

  // controlComplaint | args: (complaintId, isValid(true,false))
  const {
    mutateAsync: controlComplaintMutateAsync,
    isLoading: controlComplaintIsLoading,
    error: controlComplaintError,
  } = useContractWrite(contract, "controlComplaint");

  return (
    <WalletContext.Provider
      value={{
        CONTRACT_ADDRESS,
        address,
        isLoadingContract,
        errorContract,
        // user address empty
        isUserAddressEmptyData,
        isUserAddressEmptyIsLoading,
        isUserAddressEmptyError,
        // user
        userData,
        userIsLoading,
        userError,
        // sisteme kayıt ol
        registerMutateAsync,
        registerIsLoading,
        registerError,
        registerIsSuccess,
        // mülk yarat
        createPropertyMutateAsync,
        createPropertyIsLaoding,
        createPropertyError,
        createPropertyIsSuccess,
        // mülk sahibinin mülkleri
        holderPropertiesData,
        holderPropertiesIsLoading,
        holderPropertiesError,
        // mülk sahibinin ilandaki mülkleri
        holderPropertiesInTheAdData,
        holderPropertiesInTheAdIsLoading,
        holderPropertiesInTheAdError,
        // kiracıların kiraladığı mülkler
        tenantPropertiesData,
        tenantPropertiesIsLoading,
        tenantPropertiesError,
        // ilandaki mülkler,
        allPropertiesInTheAdData,
        allPropertiesInTheAdIsLoading,
        allPropertiesInTheAdError,
        // mülkü ilana koy
        putPropertyMutateAsync,
        putPropertyIsLoading,
        putPropertyError,
        // kiracı olma talebinde bulun
        requestToBecomeTenantMutateAsync,
        requestToBecomeTenantIsLoading,
        requestToBecomeTenantError,
        // mülk contractını başlat
        startRentalContractMutateAsync,
        startRentalContractIsLoading,
        startRentalContractError,
        // mülk contractını sonlandır
        finishRentalContractMutateAsync,
        finishRentalContractIsLoading,
        finishRentalContractError,
        // şikayet et
        makeComplaintMutateAsync,
        makeComplaintIsLoading,
        makeComplaintError,
        // şikayeti kontrol et (only admin)
        controlComplaintMutateAsync,
        controlComplaintIsLoading,
        controlComplaintError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useContextWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
