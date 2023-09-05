import { useGetUserCartProductQuery } from "../redux/api/ApiSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

const Cart = () => {
  const [user] = useAuthState(auth);
  const { data: userCart } = useGetUserCartProductQuery(user?.email, {
    refetchOnFocus: true,
    pollingInterval: 30000,
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-3">
        {userCart?.cartProducts?.map((product) => (
          <div
            key={product._id}
            className="card card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img src={product?.image} alt="product_img" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product?.title}</h2>
              <p>{product?.description}</p>
              <h6 className="text-success text-xl font-semibold">
                Price : ${product?.price}
              </h6>
              <span>Color : {product?.color}</span>
              <span>Size : {product?.size}</span>
              <span>Product Quantity : {product?.quantity}</span>
              <p className="capitalize">Category : {product?.category}</p>
              {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
