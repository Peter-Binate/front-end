// store.ts
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/Redux/Slices/registerSlice";
import sportSessionReducer from "@/Redux/Slices/sportSessionSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    sportSession: sportSessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
