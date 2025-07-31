import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeItemFromBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
    },
    resetBasketItem: (state) => {
      state.items = [];
    },
  },
});

// GET TOTAL QUANTITY FOR AN ITEM THAT MATCHES THE ID
export const selectQuantityCountById = (state, id) => {
  const item = state.items.find((item) => item._id === id);
  return item ? item.quantity : 0;
};

// GET TOTAL PRICE FROM ALL ITEMS
export const selectProductsTotal = (state) =>
  state.items.reduce(
    (total, item) =>
      total +
      (item.hasDiscount
        ? item.discountPrice * (item.quantity || 1)
        : item.price * (item.quantity || 1)),
    0
  );

// GET ALL PRODUCT IN THE BASKET
export const selectAllProductsInBasket = (state) => state.items;

// GET TOTAL PRODUCTS BOUGHT
export const selectProductCountById = (state) =>
  state.items.reduce((total, item) => total + (item.quantity || 0), 0);

// EXPORT HELPER FUNCTIONS
export const { addItemToBasket, removeItemFromBasket } = productSlice.actions;
export default productSlice.reducer;
