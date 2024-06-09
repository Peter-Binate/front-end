import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Authentication/Login";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginPage" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;
