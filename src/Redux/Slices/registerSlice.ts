import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialeStateProps {
  registerUserData: {
    firstname?: string;
    lastname?: string;
    birthDate?: string;
    email?: string;
    password?: string;
    profilImage?: File;
  };
}

// Va contenir les infos qui seront contenue dans mon slice (un peu comme des constantes ou  usestate)
const initialState: initialeStateProps = {
  registerUserData: { firstname: "Amiiiiiirrrr" },
};

const registerSlice = createSlice({
  name: "registerUserData",
  initialState,
  reducers: {
    // Action pour envoyer les données dans notre store et stocker les données dans notre initialState
    setRegisterUserData(state, action: PayloadAction<object>) {
      // Ici on concatène les anciennes données avec les nouvelles données (évite d'écraser les données)
      state.registerUserData = { ...state.registerUserData, ...action.payload };
      // Pour fetch toutes les données de l'user faire ceci:
      // state.registerUserData = action.payload;
    },
  },
});

export const { setRegisterUserData } = registerSlice.actions;
export default registerSlice.reducer;
