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
    //cart
    // postAddToCart: builder.mutation({
    //   query: (data) => ({
    //     url: "/add-product-to-cart",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: [],
    // }),
    getUserCartProduct: builder.query({
      query: (email) => `/user-cart?email=${email}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  usePostAddProductMutation,
  usePutApporedProductMutation,
  // usePostAddToCartMutation,
  useGetUserCartProductQuery,
} = ApiSlice;
