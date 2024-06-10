import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialeStateProps {
  registerUserData: {
    lastname?: string;
    firstname?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    birthDate?: string;
    biography?: string;
    location?: string;
    status?: string;
    profilImage?: File;
  };
}

// Va contenir les infos qui seront contenue dans mon slice (un peu comme des constantes ou  usestate)
const initialState: initialeStateProps = {
  registerUserData: {},
};

const registerSlice = createSlice({
  name: "registerUserData",
  initialState,
  reducers: {
    // Action pour envoyer les données dans notre store et stocker les données dans notre initialState
    setRegisterUserData(state, action: PayloadAction<object>) {
      // Ici on concatène les anciennes données avec les nouvelles données (évite d'écraser les données)
      state.registerUserData = { ...state.registerUserData, ...action.payload };
      console.log("State updated:", state.registerUserData);

      // Pour fetch toutes les données de l'user faire ceci:
      // state.registerUserData = action.payload;
    },
    resetRegisterUserData(state) {
      state.registerUserData = {};
      console.log("State reset");
    },
  },
});

export const { setRegisterUserData, resetRegisterUserData } =
  registerSlice.actions;
export default registerSlice.reducer;
