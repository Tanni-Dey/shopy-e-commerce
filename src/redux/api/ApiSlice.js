import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    postAddProduct: builder.mutation({
      query: (data) => ({
        url: "/add-product",
        method: "POST",
        body: data,
      }),
    }),
    putApporedProduct: builder.mutation({
      query: (id) => ({
        url: `/product-approved?id=${id}`,
        method: "PUT",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product-delete?id=${id}`,
        method: "DELETE",
      }),
    }),

    //cart all api
    patchAddToCart: builder.mutation({
      query: ({ data, email }) => ({
        url: `/add-product-to-cart?email=${email}`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: [],
    }),
    putCartQuantity: builder.mutation({
      query: ({ data, email }) => ({
        url: `/update-cart-product?email=${email}`,
        method: "PUT",
        body: data,
      }),
    }),
    putDeleteCartProduct: builder.mutation({
      query: ({ data, email }) => ({
        url: `/delete-cart-product?email=${email}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCart: builder.mutation({
      query: (email) => ({
        url: `/cart-delete?email=${email}`,
        method: "DELETE",
      }),
    }),
    getUserCartProduct: builder.query({
      query: (email) => `/user-cart?email=${email}`,
    }),
    addToWishlist: builder.mutation({
      query: ({ id, email }) => ({
        url: `/add-to-wishlist?email=${email}&&id=${id}`,
        method: "PUT",
      }),
    }),
    getUserWishlist: builder.query({
      query: (email) => `/user-wishlist?email=${email}`,
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
} = ApiSlice;
