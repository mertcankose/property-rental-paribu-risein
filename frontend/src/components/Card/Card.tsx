import { FC } from "react";
import { ethers } from "ethers";
import { useContextWallet } from "../../context/WalletContext";
import MiniLoading from "../Loading/MiniLoading";

interface ICard {
  item: any;
  className?: string;
  type: string;
  putAd?: any;
  requestTenant?: any;
}

const Card: FC<ICard> = ({ item, className, type, putAd = () => {}, requestTenant = () => {}, ...props }) => {
  console.log("price: ", item.price);
  const { putPropertyIsLoading, requestToBecomeTenantIsLoading } = useContextWallet();

  const itemPrice = ethers.utils.formatUnits(item.price, 18);

  return (
    <div className={["border flex flex-col gap-6 px-4 py-6 rounded-md", className].join(" ")} {...props}>
      <div className="flex justify-between">
        <span className="font-bold text-xl underline">İsim</span>
        <span>{item?.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl underline">Mülk Sahibi</span>
        <span>{item?.holderAddress}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl underline">İlanda mı?</span>
        <span>{item?.isInAd?.toString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl underline">Kirada mı?</span>
        <span>{item?.isRented?.toString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl underline">Fiyat</span>
        <span>{parseFloat(itemPrice) * Math.pow(10, 18)} ETH</span>
        {/* <span>{ethers.utils.formatUnits(ethers.BigNumber.from(item.price))}</span> */}
      </div>

      {type == "holderProperties" && !item?.isInAd && (
        <button
          onClick={() => {
            putAd(item.id);
          }}
          className="border bg-blue-50 mb-3"
        >
          {putPropertyIsLoading ? <MiniLoading /> : "İlana Koy"}
        </button>
      )}
      {type == "allProperties" && (
        <button
          onClick={() => {
            requestTenant(item.id);
          }}
          className="border bg-blue-50 mb-3"
        >
          {requestToBecomeTenantIsLoading ? <MiniLoading /> : "Kiracılık Talebinde Bulun"}
        </button>
      )}
    </div>
  );
};

export default Card;
