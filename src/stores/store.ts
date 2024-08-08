import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

import { api } from "@/services/api";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null as string | null },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
