import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Aradığınız Sayfa Bulunamadı</p>
      <Link to="/" className="underline text-3xl font-semibold text-primary mt-3">
        ANA SAYFA
      </Link>
    </div>
  );
};

export default NotFound;
