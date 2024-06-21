import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  setSportSessionData,
  setIsEditing,
} from "@/Redux/Slices/sportSessionSlice";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";

const sportsData = [
  {
    id: 1,
    name: "Football",
    defaultIcon: require("@/assets/images/football-bleu.png"),
    selectedIcon: require("@/assets/images/football-blanc.png"),
  },
  {
    id: 2,
    name: "Course",
    defaultIcon: require("@/assets/images/course-bleu.png"),
    selectedIcon: require("@/assets/images/course-blanc.png"),
  },
  {
    id: 3,
    name: "Vélo",
    defaultIcon: require("@/assets/images/velo-bleu.png"),
    selectedIcon: require("@/assets/images/velo-blanc.png"),
  },
  {
    id: 4,
    name: "Randonnée",
    defaultIcon: require("@/assets/images/rando-bleu.png"),
    selectedIcon: require("@/assets/images/rando-blanc.png"),
  },
  {
    id: 5,
    name: "Yoga",
    defaultIcon: require("@/assets/images/yoga-bleu.png"),
    selectedIcon: require("@/assets/images/yoga-blanc.png"),
  },
  {
    id: 6,
    name: "Musculation",
    defaultIcon: require("@/assets/images/musculation-bleu.png"),
    selectedIcon: require("@/assets/images/musculation-blanc.png"),
  },
  {
    id: 7,
    name: "Natation",
    defaultIcon: require("@/assets/images/natation-bleu.png"),
    selectedIcon: require("@/assets/images/natation-blanc.png"),
  },
  {
    id: 8,
    name: "Combat",
    defaultIcon: require("@/assets/images/combat-bleu.png"),
    selectedIcon: require("@/assets/images/combat-blanc.png"),
  },
  {
    id: 9,
    name: "Voile",
    defaultIcon: require("@/assets/images/voile-bleu.png"),
    selectedIcon: require("@/assets/images/voile-blanc.png"),
  },
  {
    id: 10,
    name: "Ping Pong",
    defaultIcon: require("@/assets/images/pingpong-bleu.png"),
    selectedIcon: require("@/assets/images/pingpong-blanc.png"),
  },
  {
    id: 11,
    name: "Salle de sport",
    defaultIcon: require("@/assets/images/salledesport-bleu.png"),
    selectedIcon: require("@/assets/images/salledesport-blanc.png"),
  },
  {
    id: 12,
    name: "Autre",
    defaultIcon: require("@/assets/images/autre-bleu.png"),
    selectedIcon: require("@/assets/images/autre-blanc.png"),
  },
];

const FirstStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { sportSessionData, isEditing } = useAppSelector(
    (state) => state.sportSession
  );
  const [selectedSportId, setSelectedSportId] = useState(
    sportSessionData.sportId || null
  );

  useEffect(() => {
    if (isEditing && sportSessionData.sportId) {
      setSelectedSportId(sportSessionData.sportId);
    }
  }, [isEditing, sportSessionData.sportId]);

  const handleSportSelect = (id) => {
    setSelectedSportId(id);
    console.log(selectedSportId);
    dispatch(setSportSessionData({ sportId: id }));
  };

  const handleNext = () => {
    if (selectedSportId !== null) {
      console.log("Selected sport:", selectedSportId);
      navigation.navigate("SecondStepSportSessionPage");
    } else {
      console.error("Please select a sport before proceeding.");
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
        {sportsData.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.button,
              selectedSportId === sport.id ? styles.selected : {},
            ]}
            onPress={() => handleSportSelect(sport.id)}
          >
            <Image
              source={
                selectedSportId === sport.id
                  ? sport.selectedIcon
                  : sport.defaultIcon
              }
              style={styles.icon}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.buttonText,
                selectedSportId === sport.id ? styles.selectedText : {},
              ]}
            >
              {sport.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomButton
        text="Suivant"
        onPress={handleNext}
        disabled={selectedSportId === null}
        accessibilityLabel="Bouton Suivant"
        accessibilityHint="Cliquez ici pour valider votre inscription"
        backgroundColor="#FFFFFF"
        borderColor="#FF5C00"
        textColor="#FF5C00"
        width={250}
        style={{ marginBottom: 20 }}
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

export default FirstStepScreen;
