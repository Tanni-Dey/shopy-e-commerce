import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../../../components/Checkout";
import { useGetSingleOrderQuery } from "../../../redux/api/ApiSlice";

const Payment = () => {
  const { id } = useParams();

  //single order load by id with redux api
  const { data: order } = useGetSingleOrderQuery(id, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //paymnent public key
  const stripePromise = loadStripe(
    "pk_test_51L3x8rDiYiTfEltlPemdr6ZZMSpViMGTqGqNiZHntekWzFiOS2oOS9LY5I0moVp5wCMrNsakNh5rKGoMWJGzsscy00XQXRkQ6y"
  );

  return (
    <div className="contrainer mx-auto">
      <div className="card w-96 mx-10 mt-20  bg-primary text-white text-left">
        <div className="card-body">
          <h2 className="text-secondary text-xl font-sans">Hi,</h2>
          <h2 className="card-title">Pay for Order Id : {order?._id}</h2>
          <p>Please Pay ${order?.totalAmount}</p>
          <Elements stripe={stripePromise}>
            {/* <Checkout order={order} /> */}
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
