import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  usePutApporedProductMutation,
} from "../../../redux/api/ApiSlice";
import Swal from "sweetalert2";

const ManageProduct = () => {
  //data fetch by redux api
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  //product approved redux api
  const [putApporedProduct] = usePutApporedProductMutation();
  //product delete redux api
  const [deleteProduct] = useDeleteProductMutation();

  // product approved function
  const handleProductApproved = async (id) => {
    await putApporedProduct(id);
  };

  // product delete function
  const handleProductDelete = async (id) => {
    Swal.fire({
      title: "Do you want Delete the product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteData = await deleteProduct(id);

        if (deleteData?.data?.deletedCount === 1) {
          Swal.fire({
            title: "Product Deleted",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Product Not deleted",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    });
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
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleProductDelete(product._id)}
                  >
                    delete
                  </button>
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
