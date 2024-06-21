import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1 from "@/screens/Authentication/Signup/Step1";
import Step2 from "@/screens/Authentication/Signup/Step2";
import Step3 from "@/screens/Authentication/Signup/Step3";
import Step4 from "@/screens/Authentication/Signup/Step4";

const Stack = createNativeStackNavigator();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Step1"
        component={Step1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step2"
        component={Step2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step3"
        component={Step3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Step4"
        component={Step4}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
