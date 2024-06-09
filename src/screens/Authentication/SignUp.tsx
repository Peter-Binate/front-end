import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { onRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async () => {
    console.log("Sign Up button pressed");
    const result = await onRegister!(email, password);
    console.log("Sign Up result:", result); // Debugging log
    if (result?.error) {
      setErrorMessage(result.msg.map((err: any) => err.message).join("\n"));
      console.error(result);
    } else {
      navigateToLoginScreen();
    }
  };

  return (
    <SafeAreaView className="flex flex-col items-center">
      <View className="max-w-sm w-full mt-40 text-gray-600 space-y-8">
        <View className="text-center">
          <Image
            source={{ uri: "https://floatui.com/logo.svg" }}
            className={{ width: 150, height: 150, alignSelf: "center" }}
          />
          <View className="mt-5 space-y-2">
            <Text className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </Text>
          </View>
          <View>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToLoginScreen}>
              <Text className="font-medium text-indigo-600">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        ) : null}
        <View>
          <Text className="font-medium">Email</Text>
          <TextInput
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg"
            placeholder="Entrer votre email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <Text className="font-medium">Mot de passe</Text>
          <TextInput
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg"
            placeholder="Entrer votre mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          className="w-full mt-4 px-4 py-2 bg-indigo-600 rounded-lg"
          onPress={handleSignUp}
        >
          <Text className="text-white font-medium text-center">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full mt-4 px-4 py-2 bg-indigo-600 rounded-lg"
          onPress={navigateToLoginScreen}
        >
          <Text className="text-white font-medium text-center">Sign in</Text>
        </TouchableOpacity>
        <View className="relative my-4">
          <View className="w-full h-px bg-gray-300" />
          <Text className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 left-1/2 transform -translate-x-1/2">
            Or continue with
          </Text>
        </View>
        <View className="space-y-4">
          <TouchableOpacity className="w-full flex flex-row items-center justify-center py-2.5 border rounded-lg">
            <Image
              source={{ uri: "https://floatui.com/icons/google.svg" }}
              className={{ width: 20, height: 20 }}
            />
            <Text className="ml-3">Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="text-center mt-4">
          <Text className="text-indigo-600">Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
