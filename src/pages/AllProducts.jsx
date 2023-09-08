import { Link } from "react-router-dom";
import {
  useAddToWishlistMutation,
  useGetAllProductsQuery,
  useGetUserCartProductQuery,
  useGetUserWishlistQuery,
  usePatchAddToCartMutation,
} from "../redux/api/ApiSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

const AllProducts = () => {
  const [user] = useAuthState(auth);
  const [patchAddToCart] = usePatchAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  //data fetch by redux api
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //userCart dat fetch by redux api
  const { data: userCart } = useGetUserCartProductQuery(user?.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //wishlist data fetch by redux api
  const { data: wishlistProducts } = useGetUserWishlistQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //add to cart function
  const handleCart = async (product) => {
    const newProduct = {
      ...product,
      cartQuantity: 1,
      productTotal: Number(product.price),
    };
    // product.cartQuantity = 1;
    // product.productTotal = Number(product.cartQuantity) * Number(product.price);
    // const data = { user: user.email, productId: id, quantity: 1, total: price };

    const addProduct = await patchAddToCart({
      data: { user: user.email, product: [newProduct] },
      email: user.email,
    });

    console.log(addProduct);
  };

  //add to wishlist function
  const handleAddToWishlist = async (id) => {
    await addToWishlist({ email: user.email, id: id });
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
                  {user ? (
                    wishlistProducts?.find(
                      (singleProduct) => singleProduct._id === product._id
                    )?._id ? (
                      <button className="btn btn-success btn-xs" disabled>
                        Already added in wishlist
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => handleAddToWishlist(product._id)}
                      >
                        Add To Wishlist
                      </button>
                    )
                  ) : (
                    <Link to="/login">
                      <button className="btn btn-primary btn-sm">
                        Add To Wishlist
                      </button>
                    </Link>
                  )}
                  <div className="card-actions justify-between mt-3">
                    <Link to={`/product/${product._id}`}>
                      <button className="btn btn-outline btn-sm">
                        More Details
                      </button>
                    </Link>
                    {user ? (
                      userCart?.cartProducts?.find(
                        (singleCartProduct) =>
                          singleCartProduct._id === product._id
                      )?._id ? (
                        <button disabled className="btn btn-primary btn-sm">
                          Added in cart
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCart(product)}
                          className="btn btn-primary btn-sm"
                        >
                          Add to cart
                        </button>
                      )
                    ) : (
                      <Link to="/login">
                        <button className="btn btn-primary btn-sm">
                          Add to cart
                        </button>
                      </Link>
                    )}
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
