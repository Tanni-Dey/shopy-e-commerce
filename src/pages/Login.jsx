import { auth } from "../lib/firebase";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
  let location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";

  //custom error state
  const [networkError, setNetworkError] = useState("");
  const [wrongPassError, setWrongPassError] = useState("");
  const [notFoundUserError, setNotFoundUserError] = useState("");

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //signin with email function
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // after login navigation
  if (user) {
    navigate(from, { replace: true });
  }

  //firebase error handling
  useEffect(() => {
    if (error) {
      if (error.message.includes("wrong-password")) {
        setWrongPassError("Password is wrong");
        setNetworkError("");
        setNotFoundUserError("");
      } else if (error.message.includes("user-not-found")) {
        setNotFoundUserError("Invalid User, enter your valid email");
        setWrongPassError("");
        setNetworkError("");
      } else if (error.message.includes("network-request-failed")) {
        setNetworkError("Check your network");
        setWrongPassError("");
        setNotFoundUserError("");
      } else {
        setNetworkError("");
        setWrongPassError("");
        setNotFoundUserError("");
      }
    }
  }, [error]);

  // login form submit function
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    reset();
  };

  return (
    <div className="container mx-auto">
      <div className="card w-96 mx-auto bg-slate-300 glass text-black-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>

          {/* --------login form start--------- */}
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your Email"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />
            {errors.email && (
              <span className="text-error">Please write your email</span>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your Password"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />
            {errors.password && (
              <span className="text-error">Please write your password</span>
            )}

            {/* --firebase error-- */}
            <p className="text-error mb-3">
              {wrongPassError || networkError || notFoundUserError}
            </p>

            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <input
                className="btn btn-primary w-full"
                type="submit"
                value="Login"
              />
            )}
          </form>
          {/* --------login form end--------- */}

          <div>
            <p>Forget Password ?</p>
            <p className="mt-3">
              Don't have any Account ? Please{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
