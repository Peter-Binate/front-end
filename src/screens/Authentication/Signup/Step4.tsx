import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  resetRegisterUserData,
  setRegisterUserData,
} from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";

const Step4 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { onRegister } = useAuth();
  const userData = useAppSelector((state) => state.register.registerUserData);

  const [selectedSports, setSelectedSports] = useState<string[]>(
    userData.sports || []
  );

  const handleSportSelect = (sport: string) => {
    console.log("Step4: handleSportSelect", sport);
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
    dispatch(setRegisterUserData({ sports: selectedSports }));
    const result = await onRegister!(userData.email!, userData.password!);
    console.log("Sign Up result:", result); // Debugging log
    if (result?.error) {
      console.error(result);
    } else {
      // Reset the registration data after successful registration
      dispatch(resetRegisterUserData());
      navigation.navigate("Login");
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
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step4;
