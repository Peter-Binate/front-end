// src/Redux/slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatStateProps {
  chatUserData: {
    chatApiKey?: string;
    chatUserId?: string;
    chatUserName?: string;
    chatUserToken?: string;
  };
}
// Va contenir les infos qui seront contenue dans mon slice (un peu comme des constantes ou  usestate)
const initialState: ChatStateProps = {
  chatUserData: {},
};

const chatSlice = createSlice({
  name: "chatUserData",
  initialState,
  reducers: {
    setChatUserData: (state, action: PayloadAction<string>) => {
      // Ici on concatène les anciennes données avec les nouvelles données (évite d'écraser les données)
      state.chatUserData = { ...state.chatUserData, ...action.payload };
      console.log("State updated:", state.chatUserData);
    },
    resetChatUserData(state) {
      state.chatUserData = {};
      console.log("State reset");
    },
  },
});

export const { setChatUserData, resetChatUserData } = chatSlice.actions;
export default chatSlice.reducer;
