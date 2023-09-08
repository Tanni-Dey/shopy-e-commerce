import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto flex justify-center ">
      <div>
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-center">
          <Link className="text-primary" to="/">
            Go to Home
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
