import Swal from "sweetalert2";
import {
  useDeleteCartMutation,
  useGetUserCartProductQuery,
  usePutCartQuantityMutation,
  usePutDeleteCartProductMutation,
} from "../redux/api/ApiSlice";
import { auth } from "../lib/firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Cart = () => {
  const [user] = useAuthState(auth);

  //put api cart data by user
  const [putCartQuantity] = usePutCartQuantityMutation();

  //cart product delete data by user
  const [putDeleteCartProduct] = usePutDeleteCartProductMutation();

  //cart delete by user
  const [deleteCart] = useDeleteCartMutation();

  //fetch cart data by user
  const { data: userCart } = useGetUserCartProductQuery(user?.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  // quantity increase function
  const handleIncreaseQuantity = async (product) => {
    if (product.quantity > product.cartQuantity) {
      const copyProduct = { ...product };
      copyProduct.cartQuantity = copyProduct.cartQuantity + 1;
      copyProduct.productTotal =
        Number(copyProduct.price) * Number(copyProduct.cartQuantity);
      const total = Number(userCart.total) + Number(copyProduct.price);

      await putCartQuantity({
        data: { product: copyProduct, total: total },
        email: user.email,
      });
    } else {
      Swal.fire({
        title: "Product is not available now",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  // quantity decrease function
  const handleDecreaseQuantity = async (product) => {
    if (product.cartQuantity > 1) {
      const copyProduct = { ...product };
      copyProduct.cartQuantity = copyProduct.cartQuantity - 1;
      copyProduct.productTotal =
        Number(copyProduct.price) * Number(copyProduct.cartQuantity);
      const total = Number(userCart.total) - Number(copyProduct.price);

      await putCartQuantity({
        data: { product: copyProduct, total: total },
        email: user.email,
      });
    } else {
      if (userCart?.cartProducts?.length === 1) {
        await deleteCart(user.email);
      } else {
        const total =
          Number(userCart.total) -
          Number(Number(product.price * product.cartQuantity));
        await putDeleteCartProduct({
          email: user.email,
          data: { id: product._id, total: total },
        });
      }
    }
  };

  //delete cart product
  const handleDeleteCartProduct = async (product) => {
    if (userCart?.cartProducts?.length === 1) {
      await deleteCart(user.email);
    } else {
      const total =
        Number(userCart.total) -
        Number(Number(product.price * product.cartQuantity));
      await putDeleteCartProduct({
        email: user.email,
        data: { id: product._id, total: total },
      });
    }
  };

  return (
    <div className="container mx-auto">
      {userCart ? (
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
                <span>Product Available : {product?.quantity}</span>
                <p className="capitalize">Category : {product?.category}</p>
                <div className="flex justify-between items-center">
                  <div className="mt-2">
                    <button
                      className="btn btn-xs text-[20px] font-bold"
                      onClick={() => handleDecreaseQuantity(product)}
                    >
                      -
                    </button>
                    <span className="inline-block w-[40px] text-center">
                      {product?.cartQuantity}
                    </span>
                    <button
                      className="btn btn-xs text-[20px] font-bold"
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDeleteCartProduct(product)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div>
            <h2 className="text-2xl text-primary font-bold mb-5">
              Total Amount : $
              {(Math.round(userCart?.total * 100) / 100).toFixed(2)}
            </h2>
            <Link to="/dashboard/purchase">
              <button className="btn btn-primary">Order Now</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2 className="text-center text-primary font-bold text-2xl">
          Haven't Any Product in Cart
        </h2>
      )}
    </div>
  );
};

export default Cart;
