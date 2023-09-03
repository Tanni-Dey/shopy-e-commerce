import { useUpdatePassword } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [updatePassword, updating, error] = useUpdatePassword(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // sign up form submit function
  const onSubmit = (data) => {
    // if (data.password !== data.confirmPassword) {
    //   setConfirmPassError("Password and Confim Password are not same");
    // } else {
    //   createUserWithEmailAndPassword(data.email, data.password);
    //   setConfirmPassError("");
    //   reset();
    // }
  };

  return (
    <div className="container mx-auto">
      <div className="card w-96 mx-auto bg-slate-300 glass text-black-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Register</h2>

          {/* --------password reset form start--------- */}
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your Password"
              className="input input-bordered input-primary mb-3 w-full max-w-xs"
            />
            {errors.password && <span>Please write your password</span>}

            {/* --firebase error-- */}
            {/* <p className="text-error mb-3">
              {weakPassError || networkError || usedEmailError}
            </p> */}

            {/* {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <input
                className="btn btn-primary w-full"
                type="submit"
                value="Create Account"
              />
            )} */}
          </form>
          {/* --------password reset form end--------- */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
