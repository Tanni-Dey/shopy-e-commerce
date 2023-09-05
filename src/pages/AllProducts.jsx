import { Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  // usePostAddToCartMutation,
} from "../redux/api/ApiSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

const AllProducts = () => {
  const [user] = useAuthState(auth);
  // const [postAddToCart] = usePostAddToCartMutation();

  //data fetch by redux api
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  const handleCart = async (id, price) => {
    const data = { user: user.email, productId: id, quantity: 1, total: price };
    // await postAddToCart(data);
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3">
        {products?.map(
          (product) =>
            product.approved && (
              <div
                key={product._id}
                className="card w-96 bg-base-100 shadow-xl mb-5 mt-5"
              >
                <figure>
                  <img src={product.image} alt="product" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p>{product.description}</p>
                  <h6 className="text-success text-sm font-semibold">
                    Price : ${product.price}
                  </h6>
                  <div className="card-actions justify-between mt-3">
                    <Link to={`/product/${product._id}`}>
                      <button className="btn btn-outline btn-sm">
                        More Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleCart(product?._id, product?.price)}
                      className="btn btn-primary btn-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AllProducts;
