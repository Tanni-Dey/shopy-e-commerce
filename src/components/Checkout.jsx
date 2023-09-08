import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const Checkout = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { _id, user, totalAmount, phone } = order;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [totalAmount]);

  //payment submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user,
            phone: phone,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
      setSuccess("");
    } else {
      console.log(paymentIntent);
      setTransactionId(paymentIntent?.id);
      setCardError("");
      setSuccess("Your Payment is Completed");

      const payment = {
        order: _id,
        transactionid: paymentIntent?.id,
      };

      fetch(`http://localhost:5000/payment/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          // authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="shadow-xl w-full py-5 bg-base-100 rounded-xl px-2"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="mt-5 btn btn-sm btn-secondary text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-error">{cardError}</p>}
      {success && (
        <>
          <p className="text-success">{success}</p>
          <p className="text-success">Your TransactionID : {transactionId}</p>
        </>
      )}
    </>
  );
};

export default Checkout;
