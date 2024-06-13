import React, { useState } from "react";
import { Text, AccessibilityInfo } from "react-native";
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

// Fonction de validation d'email
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { onLogin } = useAuth();
  const navigation = useNavigation();

  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const login = async () => {
    if (!email || !password) {
      setError("Tous les champs sont obligatoires.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Tous les champs sont obligatoires."
      );
      return;
    }

    if (!validateEmail(email)) {
      setError("Adresse email invalide.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Adresse email invalide."
      );
      return;
    }

    try {
      const result = await onLogin!(email, password);
      if (result.error) {
        if (result.code === "E_INVALID_CREDENTIALS") {
          setError("Identifiants invalides");
          AccessibilityInfo.announceForAccessibility(
            "Erreur: Identifiants invalides"
          );
        } else {
          setError(result.msg || result.error);
          AccessibilityInfo.announceForAccessibility(
            `Erreur: ${result.msg || result.error}`
          );
        }
      } else {
        console.log("Login successful");
        setError("");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
      AccessibilityInfo.announceForAccessibility(
        "Une erreur s'est produite. Veuillez réessayer."
      );
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
            <FormControl isInvalid={!!error}>
              <FormControl.Label ml="2.5">Votre Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Votre Email"
                variant="rounded"
              />
            </FormControl>
            <FormControl isInvalid={!!error}>
              <FormControl.Label ml="2.5">Votre mot de passe</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Mot de passe"
                variant="rounded"
                colorScheme="indigo"
              />
              {error ? (
                <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
              ) : null}
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
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={login}
              isDisabled={!email || !password}
            >
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
};

export default LoginScreen;
