import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl text-gray-600">Unauthorized</p>
      <Link to="/" className="underline text-3xl font-semibold text-primary mt-3">
        ANA SAYFA
      </Link>
    </div>
  );
};

export default Unauthorized;
