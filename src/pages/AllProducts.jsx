import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../redux/api/ApiSlice";

const AllProducts = () => {
  //data fetch by redux api
  const { data: products } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3">
        {products?.map((product) => (
          <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
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
                <button className="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
