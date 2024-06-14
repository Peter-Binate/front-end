import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { onLogout } = useAuth();
  const { authState } = useAuth();
  const handleLogout = async () => {
    const result = await onLogout();
    if (result?.error) {
      console.error("Result: ", result.error);
      setLogoutError(result.error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.topButton}>
        <TouchableOpacity
          style={styles.activityButton}
          onPress={() => navigation.navigate("FirstStepSportSessionPage")}
        >
          <Text style={[styles.buttonText, { color: "black" }]}>
            Je <Text style={{ color: "#0f0edd" }}>propose</Text> une activité
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.activityButton}>
          <Text style={[styles.buttonText, { color: "black" }]}>
            Je <Text style={{ color: "#ff5c00" }}>recherche</Text> une activité
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    width: 294,
    height: 294,
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

export default HomeScreen;
