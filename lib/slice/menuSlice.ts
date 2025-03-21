import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  isMenuActive: number;
}

const initialState: MenuState = {
  isMenuActive: 1, 
};

const authSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    handleMenu: (state, action: PayloadAction<number>) => {
      state.isMenuActive = action.payload;  
    },
    
  },
});

export const { handleMenu } = authSlice.actions;
export default authSlice.reducer;
