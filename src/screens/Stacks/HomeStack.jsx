import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import FirstStepScreen from "@/screens/SportsSession/FirstStep";
import SecondStepScreen from "@/screens/SportsSession/SecondStep";
import ThirdStepScreen from "@/screens/SportsSession/ThirdStep";
import FourthStepScreen from "@/screens/SportsSession/FourthStep";
import FifthStepScreen from "@/screens/SportsSession/FifthStep";
import LastSportSessionScreen from "@/screens/SportsSession/LastSportSession";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="FirstStepSportSessionPage"
        component={FirstStepScreen}
      />
      <Stack.Screen
        name="SecondStepSportSessionPage"
        component={SecondStepScreen}
      />
      <Stack.Screen
        name="ThirdStepSportSessionPage"
        component={ThirdStepScreen}
      />
      <Stack.Screen
        name="FourthStepSportSessionPage"
        component={FourthStepScreen}
      />
      <Stack.Screen
        name="FifthStepSportSessionPage"
        component={FifthStepScreen}
      /> */}
      <Stack.Screen
        name="LastSportSessionPage"
        component={LastSportSessionScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
