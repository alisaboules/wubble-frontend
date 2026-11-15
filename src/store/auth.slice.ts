
import { TUser } from "@/types/user.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TAuthState {
  user: TUser | null;
  isLoggedIn: boolean | null;
}

const initialState: TAuthState = {
  user: null,
  isLoggedIn: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    clearAuthData(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { setAuthData, clearAuthData } = authSlice.actions;