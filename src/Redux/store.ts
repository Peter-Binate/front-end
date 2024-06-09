// Stocker les données de register
import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./Slices/registerSlice";

const store = configureStore({
  reducer: {
    // Ajout des reducers / slices
    registerSlice: registerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
