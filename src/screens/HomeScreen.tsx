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

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View>
        <Text className="text-2xl font-bold border-2 border-red-300">
          Home Screen
        </Text>
      </View>
      <View>
        <Text>Welcome, you are logged in!</Text>
        <TouchableOpacity>
          <Text>Loggout</Text>
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
