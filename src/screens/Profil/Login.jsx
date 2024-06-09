import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    dispatch(registerUser({ email, password }));
    navigation.navigate("Home");
  };

  const navigation = useNavigation();

  const navigateToLoginScreen = () => {
    navigation.navigate("SignUpPage");
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {/* InputLogin */}
      <View className="m-5">
        <Text className="text-2xl font-bold border-2 border-red-300">
          Login
        </Text>
        <View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <TouchableOpacity title="Se connecter" onPress={handleSubmit}>
            <Text>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex-row items-center m-4"
          onPress={navigateToLoginScreen}
        >
          <Text className="text-primaryRed underline mx-3">S'inscrire</Text>
        </TouchableOpacity>
        {/* {error && <Text>{error}</Text>} */}
      </View>
    </SafeAreaView>
  );
};

export default Login;
