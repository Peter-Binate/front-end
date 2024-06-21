import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Switch,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setSportSessionData } from "@/Redux/Slices/sportSessionSlice";
import Header from "@/components/Header/Header";
import CustomButton from "@/components/Button";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const SecondStepScreen = ({
  sportSessionData = {
    maxParticipants: "",
    onlyBlindOrVisuallyImpaired: false,
    difficultyLevel: "aucun",
  },
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [maxParticipants, setMaxParticipants] = useState(
    sportSessionData.maxParticipants?.toString() || ""
  );

  const [onlyBlindOrVisuallyImpaired, setOnlyBlindOrVisuallyImpaired] =
    useState(sportSessionData.onlyBlindOrVisuallyImpaired || false);
  const [error, setError] = useState("");

  const [difficultyLevel, setDifficultyLevel] = useState(
    sportSessionData.difficultyLevel || "aucun"
  );
  const data = ["Aucun", "Débutant", "Intermédiaire", "Haut Niveau"].map(
    (level) => ({
      label: level,
      value: level,
    })
  );

  useEffect(() => {
    if (sportSessionData.maxParticipants) {
      setMaxParticipants(sportSessionData.maxParticipants.toString());
    }
    if (sportSessionData.difficultyLevel) {
      setDifficultyLevel(sportSessionData.difficultyLevel);
    }
    if (sportSessionData.onlyBlindOrVisuallyImpaired !== undefined) {
      setOnlyBlindOrVisuallyImpaired(
        sportSessionData.onlyBlindOrVisuallyImpaired
      );
    }
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
    <SafeAreaView style={styles.container}>
      <Header
        title="Critères"
        accessibilityLabel="Caractéristiques de la session de sport"
        accessibilityHint="Choisissez les critères pour entrer dans votre session de sport"
      />
      <View style={styles.formContainer}>
        <Text
          nativeID="NumberMaxOfMembers"
          aria-labelledby="NumberMaxOfMembers"
          style={{
            fontSize: 14,
            fontFamily: "LucioleRegular",
            color: "#737373",
            marginLeft: 5,
            marginBottom: 2,
          }}
        >
          Nombre maximum de participants
        </Text>
        <TextInput
          value={maxParticipants}
          placeholder="Entrez le nombre de participants"
          onChangeText={setMaxParticipants}
          keyboardType="numeric"
          style={styles.input}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View style={styles.difficultyLevelGrid}>
          <Text
            nativeID="difficultyLevel"
            aria-labelledby="difficultyLevel"
            style={{
              fontSize: 14,
              color: "#737373",
              marginLeft: 5,
              marginBottom: 2,
              fontFamily: "LucioleRegular",
            }}
          >
            Niveau de difficulté
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Sélectionnez le niveau de difficulté"
            searchPlaceholder="Recherche..."
            value={difficultyLevel}
            onChange={(item) => {
              setDifficultyLevel(item.value);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.switchLabel}>
            Seulement pour aveugles ou malvoyants
          </Text>
          <Switch
            value={onlyBlindOrVisuallyImpaired}
            onValueChange={setOnlyBlindOrVisuallyImpaired}
            style={styles.switchStyle}
          />
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            text="Suivant"
            onPress={handleNext}
            disabled={!maxParticipants}
            accessibilityLabel="Bouton Suivant"
            accessibilityHint="Cliquez ici pour accéder à l'étape suivante du formulaire d'inscription"
            backgroundColor="#FFFFFF"
            borderColor="#FF5C00"
            textColor="#FF5C00"
            width={250}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "LucioleRegular",
    color: "#737373",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchStyle: {},
  switchLabel: {
    marginLeft: 10,
    fontFamily: "LucioleRegular",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  buttonView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    fontFamily: "LucioleRegular",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "LucioleRegular",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "LucioleRegular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SecondStepScreen;
