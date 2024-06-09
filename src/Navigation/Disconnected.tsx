import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "@/screens/Authentication/Login";
import SignUpScreen from "@/screens/Authentication/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Diconnected() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
