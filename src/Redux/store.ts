// store.ts
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "@/Redux/Slices/registerSlice";

const store = configureStore({
  reducer: {
    register: registerReducer, // Assurez-vous que le nom ici correspond à ce que vous utilisez dans useAppSelector
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
