import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { resetRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const Step4 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { onRegister } = useAuth();
  const userData = useAppSelector((state) => state.register.registerUserData);

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSportSelect = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter((s) => s !== sport));
    } else {
      if (selectedSports.length < 5) {
        setSelectedSports([...selectedSports, sport]);
      }
    }
  };

  const handleSubmit = async () => {
    console.log("Step4: handleSubmit");
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/user/lovedsports/add`;
    console.log("API URL:", apiUrl);

    try {
      const result = await onRegister!(userData);
      console.log("Sign Up result:", result); // Debugging log
      if (result?.error) {
        console.error(result);
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
      } else {
        // // Enregistrement réussi, ajout des sports aimés
        // if (selectedSports.length > 0) {
        //   await axios.post(apiUrl, {
        //     email: userData.email,
        //     sports: selectedSports,
        //   });
        // }

        // Reset the registration data after successful registration
        dispatch(resetRegisterUserData());
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Select your favorite sports</Text>
        <TouchableOpacity onPress={() => handleSportSelect("Football")}>
          <Text
            style={{
              backgroundColor: selectedSports.includes("Football")
                ? "blue"
                : "gray",
            }}
          >
            Football
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSportSelect("Basketball")}>
          <Text
            style={{
              backgroundColor: selectedSports.includes("Basketball")
                ? "blue"
                : "gray",
            }}
          >
            Basketball
          </Text>
        </TouchableOpacity>
        {/* Add more sports as needed */}
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={selectedSports.length === 0}
        >
          <Text
            style={{
              backgroundColor: selectedSports.length === 0 ? "gray" : "blue",
              color: selectedSports.length === 0 ? "darkgray" : "white",
              textAlign: "center",
              padding: 10,
              borderRadius: 5,
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step4;
