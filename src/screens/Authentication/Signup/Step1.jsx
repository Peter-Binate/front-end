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
  const { onRegister } = useAuth();

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

    // Si Mot de passe et confirmation de mot de passe sont différents
    if (localPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Les mots de passe ne correspondent pas."
      );
      return;
    }

    try {
      const response = await onRegister({
        email: localEmail,
        password: localPassword,
      });

      // Vérification si une erreur est renvoyée
      if (response.error) {
        // Mise à jour de l'état de l'erreur avec le message d'erreur
        if (response.code === "E_EMAIL_EXISTS") {
          setError("Cet email existe déjà. Veuillez en utiliser un autre.");
        } else {
          setError(response.msg);
        }

        // Annonce de l'erreur pour les utilisateurs ayant activé l'accessibilité vocale
        AccessibilityInfo.announceForAccessibility(`Erreur: ${response.msg}`);
      } else {
        // Si aucune erreur n'est détectée
        setError(""); // Réinitialisation de l'état de l'erreur

        // Dispatch de l'action pour mettre à jour les données utilisateur enregistrées
        dispatch(
          setRegisterUserData({ email: localEmail, password: localPassword })
        );

        navigation.navigate("Step2");
      }
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      AccessibilityInfo.announceForAccessibility(
        "Une erreur s'est produite. Veuillez réessayer."
      );
    }
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
