import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const UserScreen = () => {
  const navigation = useNavigation();
  const navigateToSignUpScreen = () => {
    navigation.navigate("UserProfilPage");
  };

  return (
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.topButton}>
        <TouchableOpacity
          style={styles.activityButton}
          onPress={() => navigation.navigate("UserProfilPage")}
        >
          <Text style={[styles.buttonText, { color: "black" }]}>
            mon <Text style={{ color: "#ff5c00" }}>profil</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={styles.activityButton}
          onPress={() => navigation.navigate("UserSessionsPage")}
        >
          <Text style={[styles.buttonText, { color: "black" }]}>
            mes <Text style={{ color: "#0f0edd" }}>annonces</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityButton: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#343434",
    width: 300,
    height: 200,
    padding: 10,
  },
  topButton: {
    marginTop: 70,
  },
  bottomButton: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 35,
    fontWeight: "800",
    fontFamily: "LucioleRegular",
    textTransform: "uppercase",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});
