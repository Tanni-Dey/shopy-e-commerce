import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

//redux cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export default cartSlice;
