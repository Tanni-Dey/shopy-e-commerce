import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { usePostAddProductMutation } from "../../../redux/api/ApiSlice";

const AddNewProduct = () => {
  //post data by redux api
  const [postAddProduct] = usePostAddProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // product add form submit function
  const onSubmit = async (data) => {
    if (data.available === "true") {
      data.available = true;
    } else {
      data.available = false;
    }
    if (data.nft === "true") {
      data.nft = true;
    } else {
      data.nft = false;
    }
    if (data.offprint === "true") {
      data.offprint = true;
    } else {
      data.offprint = false;
    }
    data.wishList = [];
    const postData = await postAddProduct(data);

    if (postData?.data?.insertedId) {
      Swal.fire({
        title: "New Product Added",
        icon: "success",
      });
      reset();
    } else {
      Swal.fire({
        title: "Product Not Added",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-5">Upload Product</h2>

      {/* --------Add product form start--------- */}
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Enter product name"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.title && (
          <span className="text-error">Please give product name</span>
        )}

        <input
          type="text"
          {...register("description", { required: true })}
          placeholder="Enter product description"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.description && (
          <span className="text-error">Please give product description</span>
        )}

        <input
          type="text"
          {...register("image", { required: true })}
          placeholder="Enter product image link"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.image && (
          <span className="text-error">Please give product image link</span>
        )}

        <input
          type="text"
          {...register("sellerSku", { required: true })}
          placeholder="Enter your seller SKU"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.sellerSku && (
          <span className="text-error">Please write your seller Sku</span>
        )}

        <select
          name="color"
          id="color"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("color", { required: true })}
        >
          <option value="#" selected disabled>
            Select any color
          </option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        {errors.color && (
          <span className="text-error">Please select any color</span>
        )}

        <select
          name="size"
          id="size"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("size", { required: true })}
        >
          <option value="#" selected disabled>
            Select size
          </option>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
        {errors.size && <span className="text-error">Please select size</span>}

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Enter poduct price"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.price && (
          <span className="text-error">Please product price</span>
        )}

        <input
          type="number"
          {...register("quantity", { required: true })}
          placeholder="Enter product quantity"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.quantity && (
          <span className="text-error">Please write product quantity</span>
        )}

        <select
          name="stockStatus"
          id="stockStatus"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("stockStatus", { required: true })}
        >
          <option value="#" selected disabled>
            Select stock status
          </option>
          <option value="stock-in">Stock In</option>
          <option value="stock-out">Stock Out</option>
        </select>
        {errors.stockStatus && (
          <span className="text-error">Please select stock Status</span>
        )}

        <select
          name="category"
          id="category"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("category", { required: true })}
        >
          <option value="#" selected disabled>
            Select category
          </option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="jewelry">Jewelry</option>
          <option value="all wallets & small leather goods">
            all wallets & small leather goods
          </option>
        </select>
        {errors.category && (
          <span className="text-error">Please select Category</span>
        )}

        <select
          name="subCategory"
          id="subCategory"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("subCategory", { required: true })}
        >
          <option value="#" selected disabled>
            Select Sub Category
          </option>
          <option value="laptop">Laptop</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="all wallets & small leather goods">
            all wallets & small leather goods
          </option>
        </select>
        {errors.subCategory && (
          <span className="text-error">Please select sub Category</span>
        )}

        <select
          name="available"
          id="available"
          placeholder="select one"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
          {...register("available", { required: true })}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.subCategory && (
          <span className="text-error">Please select sub Category</span>
        )}

        <select
          multiple
          name="version"
          id="version"
          placeholder="select version"
          className="input mr-3 input-bordered input-primary w-full max-w-xs"
          {...register("version", { required: true })}
        >
          <option value="nft">nft</option>
          <option value="offprint">offprint</option>
        </select>
        {errors.version && (
          <span className="text-error">Please select version</span>
        )}

        <input
          type="number"
          {...register("packageWeight", { required: true })}
          placeholder="Enter product package weight"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.packageWeight && (
          <span className="text-error">
            Please write product package weight
          </span>
        )}

        <input
          type="text"
          {...register("dimension", { required: true })}
          placeholder="Enter product dimension"
          className="input mr-3 input-bordered input-primary mb-3 w-full max-w-xs"
        />
        {errors.dimension && (
          <span className="text-error">Please write product dimension</span>
        )}

        <span className="mr-3">
          <input
            type="checkbox"
            className="mr-2"
            {...register("nft")}
            name="nft"
            value={true}
          />
          nft
        </span>
        <span className="mr-3">
          <input
            type="checkbox"
            className="mr-2"
            {...register("offprint")}
            name="offprint"
            value={true}
          />
          offprint
        </span>
        {/* {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : ( */}
        <input
          className="btn btn-primary w-full"
          type="submit"
          value="Add Product"
        />
        {/* )} */}
      </form>
      {/* --------Add product form end--------- */}
    </div>
  );
};

export default AddNewProduct;
