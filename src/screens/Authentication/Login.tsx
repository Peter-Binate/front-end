import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const navigation = useNavigation();

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      Alert.alert(
        "Login Error",
        result.msg.map((err: any) => err.message).join("\n")
      );
    } else {
      console.log("Login successful");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View className="m-5">
        <Text className="text-2xl font-bold border-2 border-red-300">
          Login
        </Text>
        <View>
          <TextInput
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="Email"
          />
          <TextInput
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity onPress={login} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex-row items-center m-4"
          onPress={navigateToSignUpScreen}
        >
          <Text className="text-primaryRed underline mx-3">S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginScreen;
