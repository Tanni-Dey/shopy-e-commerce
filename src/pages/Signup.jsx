import { auth } from "../lib/firebase";
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  //custom error state
  const [confirmPassError, setConfirmPassError] = useState("");
  const [weakPassError, setWeakPassError] = useState("");
  const [usedEmailError, setUsedEmailError] = useState("");
  const [networkError, setNetworkError] = useState("");

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //signup with email function
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // after signup navigation
  if (user) {
    navigate("/");
  }

  //firebase error handling
  useEffect(() => {
    if (error) {
      if (error.message.includes("weak-password")) {
        setWeakPassError("Give 6 character for password");
        setNetworkError("");
        setUsedEmailError("");
      } else if (error.message.includes("email-already-in-use")) {
        setUsedEmailError("This email already used");
        setWeakPassError("");
        setNetworkError("");
      } else if (error.message.includes("network-request-failed")) {
        setNetworkError("Check your network");
        setWeakPassError("");
        setUsedEmailError("");
      } else {
        setNetworkError("");
        setWeakPassError("");
        setUsedEmailError("");
      }
    }
  }, [error]);

  // sign up form submit function
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setConfirmPassError("Password and Confim Password are not same");
    } else {
      await createUserWithEmailAndPassword(data.email, data.password);
      setConfirmPassError("");
      reset();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="card w-96 mx-auto bg-slate-300 glass text-black-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Register</h2>

          {/* --------sign up form start--------- */}
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Enter your First Name"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />
            {errors.firstName && (
              <span className="text-error">Please write your first name</span>
            )}

            <input
              type="text"
              {...register("lastName")}
              placeholder="Enter your Last Name"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />

            <input
              type="number"
              {...register("phone")}
              placeholder="Enter your Phone Number"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />

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

            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Enter Confirm Password"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />
            {errors.password && (
              <span className="text-error">
                Please write your password again
              </span>
            )}
            <span className="text-error">
              {confirmPassError !== "" ? confirmPassError : ""}
            </span>

            {/* --firebase error-- */}
            <p className="text-error mb-3">
              {weakPassError || networkError || usedEmailError}
            </p>

            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <input
                className="btn btn-primary w-full"
                type="submit"
                value="Create Account"
              />
            )}
          </form>
          {/* --------sign up form end--------- */}

          <div>
            <p>Forget Password ?</p>
            <p className="mt-3">
              Already Have an account? Please{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
