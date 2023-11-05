import { FC, useState, useEffect } from "react";
import { useContextWallet } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { errorMessage, successMessage } from "../../helpers/toast";
import MiniLoading from "../../components/Loading/MiniLoading";

const CreateProfile: FC = () => {
  const { address, registerMutateAsync, registerIsLoading, registerError, registerIsSuccess } = useContextWallet();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    address: address,
    description: "",
    userType: 0,
  });

  useEffect(() => {
    if (!address) {
      // redirect to home page
      navigate("/");
    }
  }, [address]);

  useEffect(() => {
    if (registerError) {
      errorMessage(registerError.reason.toUpperCase());
    }
  }, [registerError]);

  useEffect(() => {
    if (registerIsSuccess) {
      successMessage("Successfully created");
      navigate("/showcase");
    }
  }, [registerIsSuccess]);

  const handleRoleChange = (selectedRole: number) => {
    setUser({
      ...user,
      userType: selectedRole,
    });
  };

  const handleSubmit = async () => {
    // Profil oluşturma işlemleri burada yapılabilir.
    console.log("user: ", user);

    let response = await registerMutateAsync({
      args: [user.description, user.userType],
    });

    console.log("mutate response: ", response);
  };

  return (
    <div className="py-8 px-6 bg-gradient-to-r from-blue-500 via-white to-green-500">
      <Header className="mb-6" />
      <div className="flex flex-col gap-8 items-center min-h-screen max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-black">Profil Oluştur</h2>

        <label className="mb-4 w-full text-black">
          Kullanıcı Adresi
          <input type="text" value={address} disabled className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </label>
        <label className="mb-4 w-full text-black">
          Kullanıcı Açıklama:
          <input
            type="text"
            value={user.description}
            onChange={(e) => setUser({ ...user, description: e.target.value })}
            className="border border-gray-300 px-2 py-1 rounded-md w-full"
          />
        </label>
        <div className="mb-4 text-black text-center">
          Rolünü Seç:
          <div className="ml-2 mt-4">
            <label className="mr-4">
              Mülk Sahibi
              <input
                type="radio"
                value="Mülk Sahibi"
                checked={user.userType === 0}
                onChange={() => handleRoleChange(0)}
                className="ml-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label>
              Kiracı
              <input
                type="radio"
                value="Kiracı"
                checked={user.userType === 1}
                onChange={() => handleRoleChange(1)}
                className="ml-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
        </div>
        <button className="bg-blue-700 text-white px-6 py-2 rounded-md" onClick={handleSubmit}>
          {registerIsLoading ? <MiniLoading /> : <span>Oluştur</span>}
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;
