import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";

const SecondStepScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { sportSessionData } = useAppSelector((state) => state.sportSession);

  const [maxParticipants, setMaxParticipants] = useState(
    sportSessionData.maxParticipants?.toString() || ""
  );
  const [difficultyLevel, setDifficultyLevel] = useState(
    sportSessionData.difficultyLevel || "aucun"
  );
  const [onlyBlindOrVisuallyImpaired, setOnlyBlindOrVisuallyImpaired] =
    useState(sportSessionData.onlyBlindOrVisuallyImpaired || false);
  const [error, setError] = useState("");

  // Écouter les changements dans le Redux store et mettre à jour l'état local
  useEffect(() => {
    setMaxParticipants(sportSessionData.maxParticipants?.toString() || "");
    setDifficultyLevel(sportSessionData.difficultyLevel || "aucun");
    setOnlyBlindOrVisuallyImpaired(
      sportSessionData.onlyBlindOrVisuallyImpaired || false
    );
  }, [sportSessionData]);

  const handleNext = () => {
    const participants = parseInt(maxParticipants, 10);
    if (isNaN(participants) || participants < 1 || participants > 30) {
      setError("Le nombre de participants doit être compris entre 1 et 30.");
      return;
    }

    dispatch(
      setSportSessionData({
        maxParticipants: participants,
        difficultyLevel,
        onlyBlindOrVisuallyImpaired,
      })
    );
    navigation.navigate("ThirdStepSportSessionPage");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View>
        <Text>Maximum Participants</Text>
        <TextInput
          value={maxParticipants}
          onChangeText={setMaxParticipants}
          keyboardType="numeric"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <Text>Difficulty Level</Text>
        {["aucun", "débutant", "intermédiaire", "haut_niveau"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setDifficultyLevel(level)}
            style={{
              backgroundColor: difficultyLevel === level ? "blue" : "gray",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>{level}</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text>Only Blind or Visually Impaired</Text>
          <Switch
            value={onlyBlindOrVisuallyImpaired}
            onValueChange={setOnlyBlindOrVisuallyImpaired}
          />
        </View>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!maxParticipants}
          style={{
            backgroundColor: maxParticipants ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SecondStepScreen;
