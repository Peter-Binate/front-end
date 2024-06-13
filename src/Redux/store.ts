// store.ts
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/Redux/Slices/registerSlice";
import chatReducer from "@/Redux/Slices/chatSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
