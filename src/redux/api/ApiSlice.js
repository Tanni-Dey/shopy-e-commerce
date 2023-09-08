import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    //all product get query
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    //single product get query
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    //product add post query
    postAddProduct: builder.mutation({
      query: (data) => ({
        url: "/add-product",
        method: "POST",
        body: data,
      }),
    }),

    //product approved put query
    putApporedProduct: builder.mutation({
      query: (id) => ({
        url: `/product-approved?id=${id}`,
        method: "PUT",
      }),
    }),

    //product delete query
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product-delete?id=${id}`,
        method: "DELETE",
      }),
    }),

    //add to cart product patch query
    patchAddToCart: builder.mutation({
      query: ({ data, email }) => ({
        url: `/add-product-to-cart?email=${email}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //cart quantity put query
    putCartQuantity: builder.mutation({
      query: ({ data, email }) => ({
        url: `/update-cart-product?email=${email}`,
        method: "PUT",
        body: data,
      }),
    }),

    //cart product delete query
    putDeleteCartProduct: builder.mutation({
      query: ({ data, email }) => ({
        url: `/delete-cart-product?email=${email}`,
        method: "PUT",
        body: data,
      }),
    }),

    //cart delete query
    deleteCart: builder.mutation({
      query: (email) => ({
        url: `/cart-delete?email=${email}`,
        method: "DELETE",
      }),
    }),

    //cart product get query
    getUserCartProduct: builder.query({
      query: (email) => `/user-cart?email=${email}`,
    }),

    //add to wishlist query
    addToWishlist: builder.mutation({
      query: ({ id, email }) => ({
        url: `/add-to-wishlist?email=${email}&&id=${id}`,
        method: "PUT",
      }),
    }),

    //wishlist get query
    getUserWishlist: builder.query({
      query: (email) => `/user-wishlist?email=${email}`,
    }),

    //seller check get query
    getCheckSeller: builder.query({
      query: (email) => `/check-seller?email=${email}`,
    }),

    //post order query
    postAddOrder: builder.mutation({
      query: (data) => ({
        url: "/add-order",
        method: "POST",
        body: data,
      }),
    }),

    //user orders get query
    getUserOrders: builder.query({
      query: (email) => `/user-orders?email=${email}`,
    }),

    //get single order query
    getSingleOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  usePostAddProductMutation,
  usePutApporedProductMutation,
  useDeleteProductMutation,
  usePatchAddToCartMutation,
  usePutCartQuantityMutation,
  usePutDeleteCartProductMutation,
  useDeleteCartMutation,
  useGetUserCartProductQuery,
  useAddToWishlistMutation,
  useGetUserWishlistQuery,
  useGetCheckSellerQuery,
  usePostAddOrderMutation,
  useGetUserOrdersQuery,
  useGetSingleOrderQuery,
} = ApiSlice;
