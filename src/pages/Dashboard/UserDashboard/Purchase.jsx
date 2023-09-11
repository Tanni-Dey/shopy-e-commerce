import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { auth } from "../../../lib/firebase";
import {
  useDeleteCartMutation,
  useGetUserCartProductQuery,
  usePostAddOrderMutation,
} from "../../../redux/api/ApiSlice";
import { useAuthState } from "react-firebase-hooks/auth";

const Purchase = () => {
  const [user] = useAuthState(auth);

  //order post by redux api mutation
  const [postAddOrder] = usePostAddOrderMutation();

  //cart delete by user
  const [deleteCart] = useDeleteCartMutation();

  //fetch cart data by user
  const { data: userCart } = useGetUserCartProductQuery(user?.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // order post function
  const onSubmit = async (data) => {
    data.user = user.email;
    data.totalAmount = userCart.total;
    const postOrder = await postAddOrder(data);

    if (postOrder?.data?.insertedId) {
      Swal.fire({
        title: "Thanks for your order. Go to your order page for payment",
        icon: "success",
      });
      await deleteCart(user.email);
      reset();
    } else {
      Swal.fire({
        title: "Order not submitted",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-primary text-2xl font-semibold text-center mb-5">
        Billing Details
      </h2>
      <div className="grid grid-cols-2 justify-between">
        {/* --------billing form start--------- */}

        <form onSubmit={handleSubmit(onSubmit)} action="">
          <input
            type="text"
            {...register("address1", { required: true })}
            placeholder="Address line 1"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.address1 && (
            <span className="text-error">Address line 1 Required</span>
          )}

          <input
            type="text"
            {...register("address2", { required: true })}
            placeholder="Address line 2"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.address2 && (
            <span className="text-error">Address line 2 Required</span>
          )}

          <input
            type="number"
            {...register("phone", { required: true })}
            placeholder="Active phone number"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.phone && (
            <span className="text-error">give your phone number</span>
          )}

          <select
            name="country"
            id="country"
            placeholder="select..."
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
            {...register("country", { required: true })}
          >
            <option>Select Country...</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="india">India</option>
            <option value="nepal">Nepal</option>
          </select>
          {errors.country && (
            <span className="text-error">Select any country</span>
          )}

          <input
            type="text"
            {...register("city", { required: true })}
            placeholder="Your city"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.city && <span className="text-error">give your city</span>}

          <input
            type="text"
            {...register("state", { required: true })}
            placeholder="Your State"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.state && <span className="text-error">give your state</span>}

          <input
            type="text"
            {...register("postalCode", { required: true })}
            placeholder="Postal/Zip Code"
            className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          />
          {errors.postalCode && (
            <span className="text-error">Please write your postal code</span>
          )}

          <span className="mr-3">
            <input
              type="checkbox"
              className="mr-2"
              {...register("diffrentAddress")}
              name="diffrentAddress"
            />
            Ship to a diffrent address
          </span>

          <input
            className="btn btn-primary block"
            type="submit"
            value="submit order"
          />
        </form>
        {/* --------billing form end--------- */}

        <div className="card card-body">
          <h2 className="text-2xl text-primary font-bold mb-5">
            Total Amount : $
            {userCart
              ? (Math.round(userCart?.total * 100) / 100).toFixed(2)
              : 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
