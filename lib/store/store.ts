import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/slice/authSlice'
import menuReducer from '@/lib/slice/menuSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:authReducer,
      menu:menuReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']