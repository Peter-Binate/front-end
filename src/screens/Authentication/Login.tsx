import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import {
  NativeBaseProvider,
  extendTheme,
  Center,
  Box,
  Heading,
  Image,
  FormControl,
  HStack,
  VStack,
  Link,
  Button,
  Input,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/Button";

// Fonction de validation d'email
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
const localLogo = require("../../assets/images/logo.png");
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

    const emailLowercase = email.toLowerCase();
    if (!validateEmail(emailLowercase)) {
      setError("Adresse email invalide.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Adresse email invalide."
      );
      return;
    }

    try {
      const result = await onLogin!(emailLowercase, password);
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
        AccessibilityInfo.announceForAccessibility("Connexion réussie");
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
        <Image
          style={styles.logo}
          source={localLogo}
          alt="Logo BlinkSport"
          size="2xl"
          mb="1"
          w="70%"
          h="22%"
        />
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <VStack space={3} mt="5">
            <FormControl isInvalid={!!error} accessibilityLabel="Votre Email">
              <FormControl.Label ml="2.5">Votre Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Votre Email"
                variant="rounded"
                accessibilityHint="Tapez votre adresse email ici"
              />
            </FormControl>
            <FormControl
              isInvalid={!!error}
              accessibilityLabel="Votre Mot de passe"
            >
              <FormControl.Label ml="2.5">Votre mot de passe</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Votre mot de passe"
                accessibilityHint="Tapez votre mot de passe ici"
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
                  color: "#0f0edd",
                }}
                accessibilityLabel="Accéder à la page de récupération de mot de passe"
                alignSelf="center"
                mt="3"
              >
                Mot de passe / identifiant oublié ?
              </Link>
            </FormControl>

            <CustomButton
              text="Connexion"
              onPress={login}
              disabled={!email || !password}
              accessibilityLabel="Bouton de connexion"
              accessibilityHint="Cliquez ici pour vous connecter à votre compte"
              backgroundColor="#FFFFFF"
              borderColor="#FF5C00"
              textColor="#FF5C00"
            />

            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="darkText"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Je n'ai pas encore de compte{" "}
              </Text>
              <Link
                _text={{
                  color: "#0f0edd",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                accessibilityLabel="Accéder à la page d'inscription"
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#FF5C00",
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    height: 55,
  },
  text: {
    color: "#FF5C00",
    fontFamily: "LucioleRegular",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButton: {
    // Bordure plus claire
    opacity: 0.5, // Rend le bouton semi-transparent
  },
});
export default LoginScreen;
