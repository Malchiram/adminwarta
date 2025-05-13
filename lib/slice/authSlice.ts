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
      localStorage.setItem("authenticated", JSON.stringify(true));
    },
    logout: (state) => {

      state.isAuthenticated = false; 
      localStorage.setItem("authenticated", JSON.stringify(false));
       // Mengubah status menjadi false saat logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
