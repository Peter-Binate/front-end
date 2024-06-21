import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "@/screens/Profil/User";
import UserProfilScreen from "@/screens/Profil/UserProfil";
import UserSessionsScreen from "@/screens/Profil/UserSessions";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profil" component={UserScreen} />
      <Stack.Screen name="UserProfilPage" component={UserProfilScreen} />
      <Stack.Screen name="UserSessionsPage" component={UserSessionsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
