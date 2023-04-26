import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="bg-white px-10 py-10 rounded shadow-md max-w-fit w-11/12">
        <p className="font-bold pb-5">404 Not Found.. 🥺</p>
        <Link to="/" className="text-xs text-blue-600 underline">
          Go to Mytube →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
