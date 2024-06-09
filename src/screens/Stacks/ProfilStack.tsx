import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../Profil/Login";
import SignUp from "../Profil/SignUp";
import Profil from "../Profil/Profil";
import UpdateProfilForm from "../Profil/UpdateProfilForm";

const Stack = createNativeStackNavigator();

const ProfilStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="LoginPage" component={LoginScreen} /> */}
      <Stack.Screen name="SignUpPage" component={SignUp} />
      <Stack.Screen name="UpdateProfilPage" component={UpdateProfilForm} />
      <Stack.Screen name="ProfilPage" component={Profil} />
    </Stack.Navigator>
  );
};

export default ProfilStack;
