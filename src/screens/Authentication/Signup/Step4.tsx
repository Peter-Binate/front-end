import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useAuth } from "@/context/AuthContext";
import { resetRegisterUserData } from "@/Redux/Slices/registerSlice";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

const sports = [
  {
    name: "Football",
    defaultIcon: require("@/assets/images/football-bleu.png"),
    selectedIcon: require("@/assets/images/football-blanc.png"),
  },
  {
    name: "Course",
    defaultIcon: require("@/assets/images/course-bleu.png"),
    selectedIcon: require("@/assets/images/course-blanc.png"),
  },
  {
    name: "Vélo",
    defaultIcon: require("@/assets/images/velo-bleu.png"),
    selectedIcon: require("@/assets/images/velo-blanc.png"),
  },
  {
    name: "Randonnée",
    defaultIcon: require("@/assets/images/rando-bleu.png"),
    selectedIcon: require("@/assets/images/rando-blanc.png"),
  },
  {
    name: "Yoga",
    defaultIcon: require("@/assets/images/yoga-bleu.png"),
    selectedIcon: require("@/assets/images/yoga-blanc.png"),
  },
  {
    name: "Musculation",
    defaultIcon: require("@/assets/images/musculation-bleu.png"),
    selectedIcon: require("@/assets/images/musculation-blanc.png"),
  },
  {
    name: "Natation",
    defaultIcon: require("@/assets/images/natation-bleu.png"),
    selectedIcon: require("@/assets/images/natation-blanc.png"),
  },
  {
    name: "Combat",
    defaultIcon: require("@/assets/images/combat-bleu.png"),
    selectedIcon: require("@/assets/images/combat-blanc.png"),
  },
  {
    name: "Voile",
    defaultIcon: require("@/assets/images/voile-bleu.png"),
    selectedIcon: require("@/assets/images/voile-blanc.png"),
  },
  {
    name: "Ping Pong",
    defaultIcon: require("@/assets/images/pingpong-bleu.png"),
    selectedIcon: require("@/assets/images/pingpong-blanc.png"),
  },
  {
    name: "Salle de sport",
    defaultIcon: require("@/assets/images/salledesport-bleu.png"),
    selectedIcon: require("@/assets/images/salledesport-blanc.png"),
  },
  {
    name: "Autre",
    defaultIcon: require("@/assets/images/autre-bleu.png"),
    selectedIcon: require("@/assets/images/autre-blanc.png"),
  },
];

const Step4 = () => {
  const navigation = useNavigation();
  const { onRegister } = useAuth();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.register.registerUserData);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSportSelect = (sport) => {
    const sportName = sport.name;
    if (selectedSports.includes(sportName)) {
      setSelectedSports(selectedSports.filter((s) => s !== sportName));
    } else {
      if (selectedSports) {
        setSelectedSports([...selectedSports, sportName]);
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
        Alert.alert(
          "Succès",
          "Inscription réussie ! Vous allez être redirigé vers la page de connexion.",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Je souhaite pratiquer :"
        accessibilityLabel="Choisissez votre sport"
        accessibilityHint="Sélectionnez les sports que vous souhaitez pratiquer"
      />
      <ScrollView contentContainerStyle={styles.grid}>
        {sports.map((sport, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedSports.includes(sport.name) ? styles.selected : {},
            ]}
            onPress={() => handleSportSelect(sport)}
          >
            <Image
              source={
                selectedSports.includes(sport.name)
                  ? sport.selectedIcon
                  : sport.defaultIcon
              }
              style={styles.icon}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.buttonText,
                selectedSports.includes(sport.name) ? styles.selectedText : {},
              ]}
            >
              {sport.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <CustomButton
        text="Suivant"
        onPress={handleSubmit}
        disabled={selectedSports.length === 0}
        accessibilityLabel="Bouton Suivant"
        accessibilityHint="Cliquez ici pour valider votre inscription"
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
    justifyContent: "flex-start",
    marginTop: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: 150,
    height: 150,
    padding: 10,
    margin: 7,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  selectedText: {
    color: "#ffffff",
  },
  selected: {
    backgroundColor: "#FF5C00",
    borderColor: "#FF5C00",
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 16,
    fontFamily: "LucioleRegular",
    fontWeight: "800",
    marginTop: 10,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
});

export default Step4;
