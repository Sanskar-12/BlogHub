import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import themeReducer from "./theme/themeSlice"
import {persistReducer,persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage';

export const server=import.meta.env.VITE_BACKEND_URL

const rootReducer=combineReducers({
  user:userReducer,
  theme:themeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export const persistor=persistStore(store)