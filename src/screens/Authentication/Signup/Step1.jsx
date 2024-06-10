import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";

const Step1 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector(
    (state) => state.register.registerUserData
  );

  const [localEmail, setLocalEmail] = useState(email || "");
  const [localPassword, setLocalPassword] = useState(password || "");

  const handleNext = () => {
    console.log("Step1: handleNext");
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
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={localEmail} onChangeText={setLocalEmail} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={localPassword}
                onChangeText={setLocalPassword}
                secureTextEntry
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                Confirmation du mot de passe
              </FormControl.Label>
              <Input
                value={localPassword}
                onChangeText={setLocalPassword}
                secureTextEntry
                type="password"
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleNext}>
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
