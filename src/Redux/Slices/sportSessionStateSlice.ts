import { createSlice } from "@reduxjs/toolkit";

export const sportSessionStateSlice = createSlice({
  name: "session",
  initialState: {
    sportSessionStateData: null, // Données de la session en cours de création ou modification
    isEditing: false, // Indique si l'utilisateur modifie une session existante
  },
  reducers: {
    setSportSessionStateData: (state, action) => {
      state.sportSessionStateData = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    resetSession: (state) => {
      state.sportSessionStateData = null;
      state.isEditing = false;
    },
  },
});

export const { setSportSessionStateData, setIsEditing, resetSession } =
  sportSessionStateSlice.actions;
export default sportSessionStateSlice.reducer;
