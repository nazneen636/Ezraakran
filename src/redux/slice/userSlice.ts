// create slice to store data and remove data of user

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface UserState {
  user: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const initialState: UserState = {
  user: null, // Default value
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Directly store the user object
      const accessToken = action.payload.accessToken;

      // Save accessToken to localStorage (client-side only)
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        Cookies.set("accessToken", accessToken);
      }
    },
    removeUser: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        Cookies.remove("accessToken");
      }
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => (state as any).user;
export const selectIsLoggedIn = (state: RootState) =>
  !!(state as any).user.user;

export default userSlice.reducer;
