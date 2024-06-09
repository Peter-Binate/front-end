import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FriendScreen from "../Friend/Friend"

const Stack = createNativeStackNavigator()

const FriendStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Friend" component={FriendScreen} />
    </Stack.Navigator>
  );
};

export default FriendStack