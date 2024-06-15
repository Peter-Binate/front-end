import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SportSessionState {
  sportSessionData: {
    sportId?: number;
    maxParticipants?: number;
    difficultyLevel?: string;
    description?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    startDate?: Date;
    onlyBlindOrVisuallyImpaired?: boolean;
  };
  isEditing: boolean;
}

const initialState: SportSessionState = {
  sportSessionData: {},
  isEditing: false,
};

const sportSessionSlice = createSlice({
  name: "sportSession",
  initialState,
  reducers: {
    setSportSessionData(state, action: PayloadAction<object>) {
      state.sportSessionData = { ...state.sportSessionData, ...action.payload };
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    resetSportSessionData(state) {
      state.sportSessionData = {};
      state.isEditing = false;
    },
  },
});

export const { setSportSessionData, setIsEditing, resetSportSessionData } =
  sportSessionSlice.actions;
export default sportSessionSlice.reducer;
