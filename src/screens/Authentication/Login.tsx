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
import {
  NativeBaseProvider,
  Center,
  Box,
  Heading,
  FormControl,
  HStack,
  VStack,
  Link,
  Button,
  Input,
} from "native-base";
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
    <NativeBaseProvider>
      <Center w="100%" mt="150">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label ml="2.5">Votre Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={(text: string) => setEmail(text)}
                placeholder="Votre Email"
                variant="rounded"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label ml="2.5">Votre mot de passe</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                placeholder="Mot de passe"
                variant="rounded"
                colorScheme="indigo"
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "#FF5C00",
                }}
                alignSelf="center"
                mt="3"
              >
                Mot de passe / identifiant oublié ?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={login}>
              Connexion
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Je n'ai pas encore de compte{" "}
              </Text>
              <Link
                _text={{
                  color: "#FF5C00",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={navigateToSignUpScreen}
              >
                S'inscrire
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
  // <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
  //   <View className="m-5">
  //     <Text className="text-2xl font-bold border-2 border-red-300">
  //       Login
  //     </Text>
  //     <View>
  //       <TextInput
  //         value={email}
  //         onChangeText={(text: string) => setEmail(text)}
  //         placeholder="Email"
  //       />
  //       <TextInput
  //         value={password}
  //         onChangeText={(text: string) => setPassword(text)}
  //         placeholder="Password"
  //         secureTextEntry
  //       />
  //       <TouchableOpacity onPress={login} style={styles.loginButton}>
  //         <Text style={styles.loginButtonText}>Se connecter</Text>
  //       </TouchableOpacity>
  //     </View>
  //     <TouchableOpacity
  //       className="flex-row items-center m-4"
  //       onPress={navigateToSignUpScreen}
  //     >
  //       <Text className="text-primaryRed underline mx-3">S'inscrire</Text>
  //     </TouchableOpacity>
  //   </View>
  // </SafeAreaView>
  //);
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
