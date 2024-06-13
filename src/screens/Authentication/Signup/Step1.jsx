import React, { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const Step1 = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector(
    (state) => state.register.registerUserData
  );
  const navigation = useNavigation();
  const { checkEmail } = useAuth();

  const [localEmail, setLocalEmail] = useState(email || "");
  const [localPassword, setLocalPassword] = useState(password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLocalEmail(email || "");
    setLocalPassword(password || "");
  }, [email, password]);

  // Fonction asynchrone pour gérer la soumission du formulaire d'inscription
  const handleNext = async () => {
    if (!localEmail || !localPassword || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Tous les champs sont obligatoires."
      );
      return;
    }

    try {
      const emailExists = await checkEmail(localEmail);
      if (emailExists) {
        setError("Cet email est déjà associé à un autre compte.");
        AccessibilityInfo.announceForAccessibility(
          "Erreur: Cet email est déjà associé à un autre compte."
        );
        return;
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la vérification de l'email.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Une erreur s'est produite lors de la vérification de l'email."
      );
      console.error("CheckMail error:", error);
      return;
    }

    // Si Mot de passe et confirmation de mot de passe sont différents
    if (localPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Les mots de passe ne correspondent pas."
      );
      return;
    }

    setError("");
    dispatch(
      setRegisterUserData({ email: localEmail, password: localPassword })
    );
    navigation.navigate("Step2");
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <NativeBaseProvider>
      <Center w="100%" mt="150">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isInvalid={!!error}>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={localEmail} onChangeText={setLocalEmail} />
              {!!error && !localEmail && (
                <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!error}>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={localPassword}
                onChangeText={setLocalPassword}
                secureTextEntry
                type="password"
              />
            </FormControl>
            <FormControl isInvalid={!!error}>
              <FormControl.Label>
                Confirmation du mot de passe
              </FormControl.Label>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                type="password"
              />
            </FormControl>
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={handleNext}
              isDisabled={!localEmail || !localPassword || !confirmPassword}
            >
              Suivant
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Vous êtes déjà inscrit ?.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
                onPress={navigateToLoginScreen}
              >
                Connectez-vous
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Step1;
