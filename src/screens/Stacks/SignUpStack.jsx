import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../Authentication/SignUp";

const Stack = createNativeStackNavigator();

const SignUpStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUpPage" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default SignUpStack;
