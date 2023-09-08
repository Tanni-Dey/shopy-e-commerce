import { auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetUserWishlistQuery } from "../../../redux/api/ApiSlice";

const Wishlist = () => {
  const [user] = useAuthState(auth);

  //wishlist data fetch by redux api
  const { data: wishlistProducts } = useGetUserWishlistQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  return (
    <div className="container mx-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Color</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        {wishlistProducts?.map((product) => (
          <tbody key={product._id}>
            <tr>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={product?.image} alt="product-image" />
                  </div>
                </div>
              </td>
              <td>{product?.title}</td>
              <td>{product?.color}</td>
              <td>{product?.category}</td>
              <td>${product?.price}</td>
              <td>{product?.stockStatus === "stock-in" ? "in" : "out"}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Wishlist;
