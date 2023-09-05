import { Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  usePutApporedProductMutation,
} from "../../../redux/api/ApiSlice";

const ManageProduct = () => {
  //data fetch by redux api
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //product approved redux api
  const [putApporedProduct] = usePutApporedProductMutation();

  // product approved function
  const handleProductApproved = async (id) => {
    await putApporedProduct(id);
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Color</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
              <th>Approped</th>
            </tr>
          </thead>
          {products?.map((product) => (
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
                <td>
                  <button className="btn btn-primary btn-xs mr-3">
                    <Link to={`/dashboard/edit-product/${product?._id}`}>
                      Edit
                    </Link>
                  </button>
                  <button className="btn btn-error btn-xs">delete</button>
                </td>
                <td>
                  {product.approved ? (
                    <button className="btn btn-success btn-xs" disabled>
                      approved
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-xs"
                      onClick={() => handleProductApproved(product._id)}
                    >
                      yes
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
