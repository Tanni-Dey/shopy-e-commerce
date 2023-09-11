import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/api/ApiSlice";

const ProductDetails = () => {
  const { id } = useParams();

  //single data fetch by id with redux way
  const { data: product } = useGetSingleProductQuery(id, {
    refetchOnFocus: true,
    pollingInterval: 30000,
  });

  return (
    <div className="container mx-auto">
      <div className="card card-side bg-base-100 shadow-xl">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
