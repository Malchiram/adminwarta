// lib/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  name:string
}

const initialState: AuthState = {
  isAuthenticated: false,
  name:''
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state , action: PayloadAction<{token: string }>) => {
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {

      state.isAuthenticated = false;  // Mengubah status menjadi false saat logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
