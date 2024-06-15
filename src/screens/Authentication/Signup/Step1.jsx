import React, { useEffect } from "react";
import { Text, AccessibilityInfo } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
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
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <FormControl.ErrorMessage>
                  {formik.errors.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
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
            >
              <FormControl.Label>
                Confirmation du mot de passe
              </FormControl.Label>
              <Input
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange("confirmPassword")}
                onBlur={formik.handleBlur("confirmPassword")}
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
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={formik.handleSubmit}
              isDisabled={!formik.isValid || !formik.dirty}
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
