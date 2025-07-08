// store.ts
import { configureStore } from "@reduxjs/toolkit";
import estimateReducer from "./estimateSlice";

export const store = configureStore({
  reducer: {
    estimate: estimateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
