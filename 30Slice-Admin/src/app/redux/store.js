import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/auth/auth";
import messageReducer from "./slices/auth/message";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { productReducer } from "./slices/product";
import { categoriesReducer } from "./slices/categories";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: userReducer,
  message: messageReducer,
  product : productReducer,
  categories : categoriesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);

