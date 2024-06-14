import React, { useState } from "react";
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
  const userData = useAppSelector((state) => state.sportSession);
  const [maxParticipants, setMaxParticipants] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("none");
  const [onlyBlindOrVisuallyImpaired, setOnlyBlindOrVisuallyImpaired] =
    useState(false);

  const handleNext = () => {
    if (maxParticipants) {
      dispatch(
        setSportSessionData({
          maxParticipants: parseInt(maxParticipants, 10), // ensure it's a number
          difficultyLevel,
          onlyBlindOrVisuallyImpaired,
        })
      );
      console.log(setSportSessionData());
      console.log("userData:", userData);
      navigation.navigate("ThirdStepSportSessionPage");
    }
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
        <Text>Difficulty Level</Text>
        <TouchableOpacity
          onPress={() => setDifficultyLevel("aucun")}
          style={{
            backgroundColor: difficultyLevel === "aucun" ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDifficultyLevel("débutant")}
          style={{
            backgroundColor: difficultyLevel === "débutant" ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Débutant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDifficultyLevel("intermédiaire")}
          style={{
            backgroundColor:
              difficultyLevel === "intermédiaire" ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Intermédiate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDifficultyLevel("haut_niveau")}
          style={{
            backgroundColor:
              difficultyLevel === "haut_niveau" ? "blue" : "gray",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Haut Niveau</Text>
        </TouchableOpacity>
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
