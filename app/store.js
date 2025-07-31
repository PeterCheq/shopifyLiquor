const { configureStore } = require("@reduxjs/toolkit");
import productReducer from "../redux/productSlice";

const store = configureStore({
  reducer: productReducer,
});

export default store;
