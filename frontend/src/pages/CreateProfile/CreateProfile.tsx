// src/components/ProfileCreation.tsx
import React, { FC, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const CreateProfile: FC = () => {
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const address = useAddress();

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleSubmit = () => {
    // Profil oluşturma işlemleri burada yapılabilir.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Profil Oluşturma</h2>

      <label className="mb-4 w-64">
        Kullanıcı Adresi
        <input type="text" value={address} disabled className="border border-gray-300 px-2 py-1 rounded-md w-full" />
      </label>
      <label className="mb-4 w-64">
        Kullanıcı Açıklama:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded-md w-full"
        />
      </label>
      <div className="mb-4">
        Rolünü Seç:
        <div className="ml-2">
          <label className="mr-4">
            Mülk Sahibi
            <input
              type="radio"
              value="Mülk Sahibi"
              checked={role === "Mülk Sahibi"}
              onChange={() => handleRoleChange("Mülk Sahibi")}
              className="ml-2"
            />
          </label>
          <label>
            Kiracı
            <input
              type="radio"
              value="Kiracı"
              checked={role === "Kiracı"}
              onChange={() => handleRoleChange("Kiracı")}
              className="ml-2"
            />
          </label>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
        Oluştur
      </button>
    </div>
  );
};

export default CreateProfile;
