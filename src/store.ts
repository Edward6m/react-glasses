// import { configureStore } from "@reduxjs/toolkit";
// // import userReducer from "./slice/userSlice";
// import toastReducer from "./slice/toastSlice.js";
// // import cartReducer from "./slice/cartSlice";

// export const store = configureStore({
//   reducer: {
//     // user: userReducer,
//     toast: toastReducer,
//     // cart: cartReducer,
//   },
// });


// store.ts
import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice.js";
export const store = configureStore({
  reducer: {
    // 你的 reducers
     toast: toastReducer,
  },
});

// 匯出常用型別（整個專案都會用到）
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;