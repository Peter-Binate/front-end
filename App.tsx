import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Connected from "./src/Navigation/Connected";
import Disconnected from "./src/Navigation/Disconnected";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import { useFonts } from "expo-font";
import { View, Text, ActivityIndicator } from "react-native";
import { LogBox } from "react-native";

const AppContent = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  const [fontsLoaded] = useFonts({
    LucioleRegular: require("./src/assets/fonts/Luciole-Regular.ttf"),
    LucioleBold: require("./src/assets/fonts/Luciole-Bold.ttf"), // Importation de la nouvelle police
  });

  const { authState } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      const result = await SecureStore.getItemAsync("my-jwt");
      console.log("Stored Token:", result);
    };
    checkToken();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log("authState: ", authState);

  return (
    <NavigationContainer theme={MyTheme}>
      {authState?.authenticated ? <Connected /> : <Disconnected />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}
