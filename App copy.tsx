import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Connected from "./src/Navigation/Connected";
import Disconnected from "./src/Navigation/Disconnected";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
// import { Provider } from "react-redux";
import store from "./src/Redux/store";

const AppContent = () => {
  const { authState } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      const result = await SecureStore.getItemAsync("my-jwt");
      console.log("Stored Token:", result);
    };
    checkToken();
  }, []);

  console.log("authState: ", authState);

  return (
    <NavigationContainer>
      {authState?.authenticated ? <Connected /> : <Disconnected />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    // <Provider store={store}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    // </Provider>
  );
}
