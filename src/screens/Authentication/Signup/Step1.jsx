import React, { useEffect } from "react";
import { Text, StyleSheet, AccessibilityInfo } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  NativeBaseProvider,
  Center,
  Image,
  Box,
  Heading,
  FormControl,
  HStack,
  VStack,
  Link,
  Input,
} from "native-base";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/Button";

const localLogo = require("../../../assets/images/logo.png");

// Schéma de validation avec yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Le format de l'email est invalide.")
    .required("L'email est obligatoire.")
    .transform((value) => value.toLowerCase()), // Forcer les emails en minuscules
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/[a-z]/, "Le mot de passe doit contenir une minuscule.")
    .matches(/[A-Z]/, "Le mot de passe doit contenir une majuscule.")
    .matches(/[0-9]/, "Le mot de passe doit contenir un chiffre.")
    .matches(
      /[@$!%*?/+-.&]/,
      "Le mot de passe doit contenir un caractère spécial."
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    ),
});

const Step1 = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector(
    (state) => state.register.registerUserData
  );
  const navigation = useNavigation();
  const { checkEmail } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
      confirmPassword: "",
    },
    validationSchema: schema,
    // Fonction asynchrone pour gérer la soumission du formulaire d'inscription
    onSubmit: async (values) => {
      console.log("Submitting values:", values.email.toLocaleLowerCase());

      try {
        // Forcer l'email en minuscules avant de vérifier
        const emailToCheck = values.email.toLowerCase();
        console.log("emailToCheck: ", emailToCheck);

        // On vérifie que l'email n'est pas déjà associé à un compte utilisateur
        const emailExists = await checkEmail(emailToCheck);
        console.log("emailExists: ", emailExists);
        if (emailExists) {
          formik.setFieldError(
            "email",
            "Cet email est déjà associé à un autre compte."
          );
          AccessibilityInfo.announceForAccessibility(
            "Erreur: Cet email est déjà associé à un autre compte."
          );
          return;
        }
        dispatch(
          setRegisterUserData({
            email: emailToCheck,
            password: values.password,
          })
        );
        navigation.navigate("Step2");
      } catch (error) {
        formik.setFieldError(
          "email",
          "Une erreur s'est produite lors de la vérification de l'email."
        );
        AccessibilityInfo.announceForAccessibility(
          "Erreur: Une erreur s'est produite lors de la vérification de l'email."
        );
        console.error("CheckMail error:", error);
        console.log("email: ", email);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      email: email || "",
      password: password || "",
      confirmPassword: formik.values.confirmPassword,
    });
  }, [email, password]);

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <NativeBaseProvider>
      <Center w="100%" mt="140">
        <Image
          style={styles.logo}
          source={localLogo}
          alt="Logo BlinkSport"
          size="2xl"
          mb="1"
          w="66%"
          h="20%"
        />
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3} mt="5">
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
              accessibilityLabel="Votre Email"
            >
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="Votre Email"
                accessibilityHint="Tapez votre adresse email ici"
                variant="rounded"
              />
              {formik.errors.email && formik.touched.email && (
                <FormControl.ErrorMessage>
                  {formik.errors.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
              accessibilityLabel="Votre Mot de passe"
            >
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                placeholder="Votre mot de passe"
                accessibilityHint="Tapez votre mot de passe ici"
                variant="rounded"
                secureTextEntry
                type="password"
              />
              {formik.errors.password && formik.touched.password && (
                <FormControl.ErrorMessage>
                  {formik.errors.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.confirmPassword &&
                formik.touched.confirmPassword
              }
              accessibilityLabel="Confirmation de votre mot de passe"
            >
              <FormControl.Label>
                Confirmation du mot de passe
              </FormControl.Label>
              <Input
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange("confirmPassword")}
                onBlur={formik.handleBlur("confirmPassword")}
                placeholder="Confirmez votre mot de passe"
                accessibilityHint="Confirmez votre mot de passe ici"
                variant="rounded"
                secureTextEntry
                type="password"
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <FormControl.ErrorMessage>
                    {formik.errors.confirmPassword}
                  </FormControl.ErrorMessage>
                )}
            </FormControl>

            <CustomButton
              text="Suivant"
              onPress={formik.handleSubmit}
              disabled={!formik.isValid || !formik.dirty}
              accessibilityLabel="Bouton Suivant"
              accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
              backgroundColor="#FFFFFF"
              borderColor="#FF5C00"
              textColor="#FF5C00"
            />

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
                accessibilityLabel="Accéder à la page de connexion"
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

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
  },
});

export default Step1;
