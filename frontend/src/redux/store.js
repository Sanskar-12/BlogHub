import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"

export const server=import.meta.env.VITE_BACKEND_URL

export const store = configureStore({
  reducer: {
    user:userReducer
  },
})