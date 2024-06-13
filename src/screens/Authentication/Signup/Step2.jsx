import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  AccessibilityInfo,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
//import { useAuth } from "@/context/AuthContext";

const Step2 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.register.registerUserData);
  //const { onRegister } = useAuth();
  const [error, setError] = useState("");

  const handleStatusChange = (newStatus) => {
    console.log("Step2: handleStatusChange", newStatus);
    dispatch(setRegisterUserData({ status: newStatus }));
  };

  const handleNext = async () => {
    if (!status) {
      setError("Vous devez renseigner le statut de votre compte");
      AccessibilityInfo.announceForAccessibility(
        "Erreur: Vous devez renseigner le statut de votre compte"
      );
    }
    navigation.navigate("Step3");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Choose your status</Text>
        <TouchableOpacity onPress={() => handleStatusChange("aveugle")}>
          <Text
            style={{ backgroundColor: status === "aveugle" ? "blue" : "gray" }}
          >
            Aveugle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange("malvoyant")}>
          <Text
            style={{
              backgroundColor: status === "malvoyant" ? "blue" : "gray",
            }}
          >
            Malvoyant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange("voyant")}>
          <Text
            style={{ backgroundColor: status === "voyant" ? "blue" : "gray" }}
          >
            Voyant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange("parent")}>
          <Text
            style={{ backgroundColor: status === "parent" ? "blue" : "gray" }}
          >
            Parent
          </Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TouchableOpacity
          mt="2"
          colorScheme="indigo"
          disabled={!status}
          onPress={handleNext}
        >
          <Text>Suivant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
