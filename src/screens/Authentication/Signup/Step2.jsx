import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  AccessibilityInfo,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

const Step2 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.register.registerUserData);
  const [error, setError] = useState("");

  const handleStatusChange = (newStatus) => {
    dispatch(setRegisterUserData({ status: newStatus }));
    AccessibilityInfo.announceForAccessibility(`Status set to ${newStatus}`);
  };

  const handleNext = () => {
    if (!status) {
      setError("Vous devez renseigner le statut de votre compte");
      AccessibilityInfo.announceForAccessibility(
        "Vous devez renseigner le statut de votre compte"
      );
    } else {
      navigation.navigate("Step3");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profil"
        accessibilityLabel="Statut compte"
        accessibilityHint="Choisissez le statut de votre compte"
      />
      <View style={styles.gridContainer}>
        {["aveugle", "malvoyant", "voyant", "parent"].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.statusButton,
              status === item && {
                backgroundColor: "#0f0edd",
                borderColor: "#0f0edd",
              },
            ]}
            onPress={() => handleStatusChange(item)}
            accessibilityLabel={`Choisir statut ${item}`}
            accessibilityHint={`Touchez le bouton ${item} pour le choisir comme statut.`}
          >
            <Text
              style={[
                styles.statusText,
                status === item && { color: "#ffffff" },
              ]}
            >{`Je suis ${item}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <CustomButton
        text="Suivant"
        onPress={handleNext}
        disabled={!status}
        accessibilityLabel="Bouton Suivant"
        accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
        backgroundColor="#FFFFFF"
        borderColor="#FF5C00"
        textColor="#FF5C00"
        width={250}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  statusButton: {
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 20,
    width: "40%",
    height: 225,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontFamily: "LucioleRegular",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Step2;
