import { FC, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useContextWallet } from "../../context/WalletContext";
import Modal from "react-modal";
import moment from "moment";
import { errorMessage, successMessage } from "../../helpers/toast";
import MiniLoading from "../../components/Loading/MiniLoading";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "2rem",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};
Modal.setAppElement("#root");

interface IHome {
  className?: string;
}

const Home: FC<IHome> = ({ className, ...props }) => {
  const { userData, createPropertyMutateAsync, createPropertyIsLaoding, createPropertyError, createPropertyIsSuccess } =
    useContextWallet();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [propertyValues, setPropertyValues] = useState({
    name: "",
    price: 0,
    propertyType: 0,
    isInAd: false,
  });

  useEffect(() => {
    if (createPropertyError) {
      errorMessage(createPropertyError.reason.toUpperCase());
    }
  }, [createPropertyError]);

  useEffect(() => {
    if (createPropertyIsSuccess) {
      successMessage("Successfully created");
      closeModal();
      setPropertyValues({
        name: "",
        price: 0,
        propertyType: 0,
        isInAd: false,
      });
    }
  }, [createPropertyIsSuccess]);

  const isHolder = () => {
    if (userData.userType == 0) {
      return true;
    }
    return false;
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setPropertyValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePropertyTypeChange = (e: any) => {
    const selectedValue = parseInt(e.target.value, 10);

    setPropertyValues((prevValues) => ({
      ...prevValues,
      propertyType: selectedValue,
    }));
  };

  const handleButtonClick = async () => {
    const { name, price, propertyType, isInAd } = propertyValues;

    console.log("name: ", name);
    console.log("price: ", price);
    console.log("propertyType: ", propertyType);
    console.log("isInAd: ", isInAd);
    console.log("createdAt: ", moment().unix());

    await createPropertyMutateAsync({
      args: [name, price, propertyType, isInAd, moment().unix()],
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="py-8 px-6 bg-gradient-to-r from-blue-100 via-white to-green-100" {...props}>
      <Header className="mb-6" />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <button onClick={closeModal} className="absolute top-0 right-0 mt-3 mr-5 text-3xl cursor-pointer">
          &times;
        </button>
        <div className="text-2xl">
          <label className="block mb-2 text-gray-800">
            Mülk İsmi:
            <input
              type="text"
              name="name"
              value={propertyValues.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
            />
          </label>
          <label className="block mb-2 text-gray-800 mt-6">
            Mülk Fiyatı:
            <input
              type="number"
              name="price"
              value={propertyValues.price}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
            />
          </label>
          <label className="block mb-2 text-gray-800 mt-6">
            Mülk Tipi:
            <select
              name="propertyType"
              value={propertyValues.propertyType}
              onChange={handlePropertyTypeChange}
              className="border border-gray-300 px-3 py-2 rounded w-full mt-1"
            >
              <option value={0}>House</option>
              <option value={1}>Shop</option>
              <option value={2}>Land</option>
              <option value={3}>Car</option>
            </select>
          </label>
          <label className="block mb-2 text-gray-800 mt-6">
            Mülkü İlana Koy
            <input type="checkbox" name="isInAd" checked={propertyValues.isInAd} onChange={handleInputChange} className="ml-2" />
          </label>
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xl rounded mt-4"
        >
          {createPropertyIsLaoding ? <MiniLoading /> : <span>Oluştur</span>}
        </button>
      </Modal>

      <div className="flex flex-col gap-8 min-h-screen max-w-5xl mx-auto">
        {isHolder() && (
          <div className="flex flex-col">
            <div className="flex items-center gap-4 text-2xl">
              <h3 className="underline">MÜLKLERİM</h3>
              <button onClick={openModal} className="border border-black justify-center items-center rounded-full w-12 h-12">
                +
              </button>
            </div>
            {/* list */}
          </div>
        )}
        {isHolder() && (
          <div className="flex flex-col">
            <div className="flex items-center gap-4 text-2xl">
              <h3 className="underline">İLANA KOYDUKLARIM</h3>
            </div>
            {/* list */}
          </div>
        )}

        <div className="flex flex-col text-2xl">
          <h3 className="underline">İLANDAKİLER</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
