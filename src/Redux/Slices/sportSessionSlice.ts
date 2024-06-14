import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SportSessionState {
  sportSessionData: {
    sportId?: number;
    maxParticipants?: number;
    difficultyLevel?: string;
    description?: string;
    location?: string;
    startDate?: Date;
    onlyBlindOrVisuallyImpaired?: boolean;
  };
}

const initialState: SportSessionState = {
  sportSessionData: {},
};

const sportSessionSlice = createSlice({
  name: "sportSession",
  initialState,
  reducers: {
    // Action pour envoyer les données dans notre store et stocker les données dans notre initialState
    setSportSessionData(state, action: PayloadAction<object>) {
      // Ici on concatène les anciennes données avec les nouvelles données (évite d'écraser les données)
      state.sportSessionData = { ...state.sportSessionData, ...action.payload };
      console.log("State updated:", state.sportSessionData);

      // Pour fetch toutes les données de l'user faire ceci:
      // state.sportSessionData = action.payload;
    },
    resetSportSessionData(state) {
      state.sportSessionData = {};
      console.log("State reset");
    },
  },
});

export const { setSportSessionData, resetSportSessionData } =
  sportSessionSlice.actions;
export default sportSessionSlice.reducer;
