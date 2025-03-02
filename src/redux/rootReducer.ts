import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userReducer from "./slice/userSlice";

// Combine all reducers
export const rootReducer = combineReducers({
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;